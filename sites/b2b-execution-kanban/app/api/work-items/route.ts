import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { workItems } from "../../../db/schema";

const seedTitles = ["Convert more qualified B2B demand", "Activate and reactivate B2B customers", "Remove recurring B2B blockers — then scale the fix"];
const jsonFields = ["dependencies", "tasks", "decisions", "links", "activity"] as const;
const parse = (row: typeof workItems.$inferSelect) => ({ ...row, ...Object.fromEntries(jsonFields.map((key) => [key, JSON.parse(row[key] || "[]")])) });

export async function GET() {
  const db = getDb();
  let rows = await db.select().from(workItems).orderBy(asc(workItems.createdAt));
  if (!rows.length) {
    const now = new Date();
    await db.insert(workItems).values(seedTitles.map((title, index) => ({
      id: crypto.randomUUID(), title, column: "Backlog", assignedTo: "Thomas", status: "Not started",
      createdAt: new Date(now.getTime() + index), updatedAt: now,
      activity: JSON.stringify([{ id: crypto.randomUUID(), timestamp: now.toISOString(), activityType: "Created", description: "Work Item created in Backlog." }]),
    })));
    rows = await db.select().from(workItems).orderBy(asc(workItems.createdAt));
  }
  return Response.json({ items: rows.map(parse) });
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>; const title = String(body.title || "").trim();
  if (!title) return Response.json({ error: "Work Item name is required" }, { status: 400 });
  const now = new Date();
  const item = { id: crypto.randomUUID(), title, column: String(body.column || "Backlog"), assignedTo: String(body.assignedTo || ""), status: String(body.status || "Not started"), dueDate: body.dueDate ? String(body.dueDate) : null,
    objective: String(body.objective || ""), statusReason: String(body.statusReason || ""), successCriteria: String(body.successCriteria || ""), dependencies: JSON.stringify(body.dependencies || []), tasks: JSON.stringify(body.tasks || []), decisions: JSON.stringify(body.decisions || []), links: JSON.stringify(body.links || []),
    activity: JSON.stringify([{ id: crypto.randomUUID(), timestamp: now.toISOString(), activityType: "Created", description: `Work Item created in ${String(body.column || "Backlog")}.` }]), createdAt: now, updatedAt: now };
  await getDb().insert(workItems).values(item); return Response.json({ item: parse(item) }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json() as Record<string, unknown>; const id = String(body.id || "");
  const [existing] = await getDb().select().from(workItems).where(eq(workItems.id, id));
  if (!existing) return Response.json({ error: "Work Item not found" }, { status: 404 });
  const before = parse(existing); const activity = Array.isArray(body.activity) ? [...body.activity] : [...before.activity];
  const labels: Record<string, string> = { column: "Stage", assignedTo: "Assigned to", status: "Status", dueDate: "Due date" };
  for (const key of Object.keys(labels)) if (body[key] !== undefined && String(body[key] || "") !== String((before as unknown as Record<string, unknown>)[key] || "")) activity.push({ id: crypto.randomUUID(), timestamp: new Date().toISOString(), activityType: labels[key], description: key === "column" ? `Moved from ${before.column} to ${body.column}.` : `${labels[key]} changed from ${String((before as unknown as Record<string, unknown>)[key] || "None")} to ${String(body[key] || "None")}.` });
  if (body.historyNote) activity.push({ id: crypto.randomUUID(), timestamp: new Date().toISOString(), activityType: "Update", description: String(body.historyNote) });
  const values = { title: String(body.title ?? existing.title), column: String(body.column ?? existing.column), assignedTo: String(body.assignedTo ?? existing.assignedTo ?? ""), status: String(body.status ?? existing.status), dueDate: body.dueDate ? String(body.dueDate) : null,
    objective: String(body.objective ?? existing.objective ?? ""), statusReason: String(body.statusReason ?? existing.statusReason ?? ""), successCriteria: String(body.successCriteria ?? existing.successCriteria ?? ""), dependencies: JSON.stringify(body.dependencies ?? before.dependencies), tasks: JSON.stringify(body.tasks ?? before.tasks), decisions: JSON.stringify(body.decisions ?? before.decisions), links: JSON.stringify(body.links ?? before.links), activity: JSON.stringify(activity), updatedAt: new Date() };
  await getDb().update(workItems).set(values).where(eq(workItems.id, id)); return Response.json({ item: parse({ ...existing, ...values }) });
}

export async function DELETE(request: Request) { const id = new URL(request.url).searchParams.get("id"); if (!id) return Response.json({ error: "id is required" }, { status: 400 }); await getDb().delete(workItems).where(eq(workItems.id, id)); return Response.json({ ok: true }); }
