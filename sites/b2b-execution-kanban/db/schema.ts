import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const workItems = sqliteTable("work_items", {
  id: text("id").primaryKey(), title: text("title").notNull(), column: text("column").notNull(),
  assignedTo: text("assigned_to"), status: text("status").notNull().default("Not started"), dueDate: text("due_date"),
  objective: text("objective"), statusReason: text("status_reason"), successCriteria: text("success_criteria"),
  dependencies: text("dependencies").notNull().default("[]"), tasks: text("tasks").notNull().default("[]"),
  decisions: text("decisions").notNull().default("[]"), links: text("links").notNull().default("[]"), activity: text("activity").notNull().default("[]"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(), updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
