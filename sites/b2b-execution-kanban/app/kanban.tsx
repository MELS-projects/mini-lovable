"use client";
import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Check, GripVertical, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const columns = ["Backlog", "Scoping", "Alignment", "Decision", "Execution", "Test & Learn", "Rollout & Embed", "Done"];
const statuses = ["Not started", "Active", "Waiting", "Blocked"];
type Task = { id: string; task: string; assignedTo: string; dueDate: string; completed: boolean };
type Activity = { id: string; timestamp: string; activityType: string; description: string };
type Item = { id: string; title: string; column: string; assignedTo: string; status: string; dueDate: string | null; objective: string; statusReason: string; successCriteria: string; dependencies: string[]; tasks: Task[]; decisions: string[]; links: string[]; activity: Activity[] };
const blank = (): Item => ({ id: "", title: "", column: "Backlog", assignedTo: "Thomas", status: "Not started", dueDate: null, objective: "", statusReason: "", successCriteria: "", dependencies: [], tasks: [], decisions: [], links: [], activity: [] });
const dateLabel = (value: string | null) => value ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`)) : "—";
const overdueDays = (item: Item) => { if (!item.dueDate || item.column === "Done") return 0; const due = new Date(`${item.dueDate}T00:00:00`); const today = new Date(); today.setHours(0,0,0,0); return Math.max(0, Math.floor((today.getTime()-due.getTime())/86400000)); };

export default function Kanban() {
  const [items, setItems] = useState<Item[]>([]); const [selected, setSelected] = useState<Item | null>(null); const [draft, setDraft] = useState<Item>(blank());
  const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [saving, setSaving] = useState(false); const [note, setNote] = useState("");
  const grouped = useMemo(() => Object.fromEntries(columns.map(c => [c, items.filter(i => i.column === c)])), [items]);
  const load = async () => { try { const r = await fetch("/api/work-items"); if (!r.ok) throw new Error("Could not load Work Items"); const d = await r.json(); setItems(d.items); } catch(e) { setError(e instanceof Error ? e.message : "Could not load"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const open = (item: Item) => { setSelected(item); setDraft(structuredClone(item)); setNote(""); };
  const create = () => { const item = blank(); setSelected(item); setDraft(item); setNote(""); };
  const save = async () => { if (!draft.title.trim()) return; setSaving(true); const r = await fetch("/api/work-items", { method: draft.id ? "PUT" : "POST", headers:{"content-type":"application/json"}, body:JSON.stringify({...draft, historyNote: note}) }); const d = await r.json(); if (r.ok) { setItems(prev => draft.id ? prev.map(i => i.id === d.item.id ? d.item : i) : [...prev, d.item]); setSelected(null); setNote(""); } else setError(d.error || "Could not save"); setSaving(false); };
  const move = async (id: string, column: string) => { const item = items.find(i=>i.id===id); if (!item || item.column===column) return; const r=await fetch("/api/work-items",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({...item,column})}); const d=await r.json(); if(r.ok)setItems(prev=>prev.map(i=>i.id===id?d.item:i)); };
  const remove = async () => { if (!draft.id || !confirm("Delete this Work Item?")) return; const r=await fetch(`/api/work-items?id=${draft.id}`,{method:"DELETE"}); if(r.ok){setItems(p=>p.filter(i=>i.id!==draft.id));setSelected(null);} };
  const updateList = (key: "dependencies"|"decisions"|"links", value: string) => setDraft(d=>({...d,[key]:value.split("\n").map(x=>x.trim()).filter(Boolean)}));
  const addTask = () => setDraft(d=>({...d,tasks:[...d.tasks,{id:crypto.randomUUID(),task:"",assignedTo:"",dueDate:"",completed:false}]}));
  const taskUpdate = (id:string, patch:Partial<Task>) => setDraft(d=>({...d,tasks:d.tasks.map(t=>t.id===id?{...t,...patch}:t)}));
  return <main className="app-shell">
    <header className="topbar"><div><p className="eyebrow">B2B PLAN · EXECUTION</p><h1>B2B Execution Kanban</h1><p className="subhead">Keep implementation moving. See who has the ball and what needs attention.</p></div><button className="primary" onClick={create}><Plus size={16}/> New Work Item</button></header>
    {error && <div className="errorbar">{error}<button onClick={()=>setError("")}><X size={14}/></button></div>}
    <section className="board" aria-label="B2B execution board">
      {columns.map(column=><div className="column" key={column} onDragOver={e=>e.preventDefault()} onDrop={e=>move(e.dataTransfer.getData("text/plain"),column)}>
        <div className="column-head"><h2>{column}</h2><span>{grouped[column]?.length||0}</span></div>
        <div className="card-stack">{loading && column==="Backlog" ? <div className="loading-card">Loading Work Items…</div> : grouped[column]?.map(item=>{const days=overdueDays(item);return <button draggable onDragStart={e=>e.dataTransfer.setData("text/plain",item.id)} onClick={()=>open(item)} className={`work-card ${days?"is-overdue":""}`} key={item.id}>
          <div className="card-title"><GripVertical size={14}/><strong>{item.title}</strong></div><dl><div><dt>Assigned to</dt><dd>{item.assignedTo||"—"}</dd></div><div><dt>Status</dt><dd><span className={`status status-${item.status.toLowerCase().replace(" ","-")}`}>{days?`OVERDUE · ${days}d`:item.status}</span></dd></div><div><dt>Due</dt><dd>{dateLabel(item.dueDate)}</dd></div></dl>
        </button>})}</div></div>)}
    </section>
    <Sheet open={!!selected} onOpenChange={v=>!v&&setSelected(null)}><SheetContent className="detail-sheet sm:max-w-[720px]">
      <SheetHeader className="detail-head"><p className="eyebrow">{draft.id?draft.column:"NEW WORK ITEM"}</p><SheetTitle>{draft.id?draft.title:"Create Work Item"}</SheetTitle><SheetDescription>Only the name, column and status are required.</SheetDescription></SheetHeader>
      <div className="detail-body"><label className="field span-2"><span>Work Item name *</span><input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label>
        <label className="field span-2"><span>Objective</span><textarea rows={3} value={draft.objective||""} onChange={e=>setDraft({...draft,objective:e.target.value})}/></label>
        <div className="field"><span>Column *</span><Select value={draft.column} onValueChange={v=>setDraft({...draft,column:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{columns.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
        <label className="field"><span>Assigned to</span><input value={draft.assignedTo||""} onChange={e=>setDraft({...draft,assignedTo:e.target.value})}/></label>
        <div className="field"><span>Status *</span><Select value={draft.status} onValueChange={v=>setDraft({...draft,status:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{statuses.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
        <label className="field"><span>Due date</span><input type="date" value={draft.dueDate||""} onChange={e=>setDraft({...draft,dueDate:e.target.value||null})}/></label>
        <label className="field span-2"><span>Status reason / waiting for / blocking</span><textarea rows={2} value={draft.statusReason||""} onChange={e=>setDraft({...draft,statusReason:e.target.value})}/></label>
        <label className="field span-2"><span>Dependencies <small>one per line</small></span><textarea rows={2} value={draft.dependencies.join("\n")} onChange={e=>updateList("dependencies",e.target.value)}/></label>
        <section className="detail-section span-2"><div className="section-title"><h3>Actions / Tasks</h3><button className="text-button" onClick={addTask}><Plus size={14}/> Add task</button></div>{draft.tasks.map(t=><div className="task-row" key={t.id}><button className={`check ${t.completed?"checked":""}`} onClick={()=>taskUpdate(t.id,{completed:!t.completed})}>{t.completed&&<Check size={13}/>}</button><input placeholder="Task" value={t.task} onChange={e=>taskUpdate(t.id,{task:e.target.value})}/><input placeholder="Assigned to" value={t.assignedTo} onChange={e=>taskUpdate(t.id,{assignedTo:e.target.value})}/><input type="date" value={t.dueDate} onChange={e=>taskUpdate(t.id,{dueDate:e.target.value})}/><button className="icon-button" onClick={()=>setDraft(d=>({...d,tasks:d.tasks.filter(x=>x.id!==t.id)}))}><X size={14}/></button></div>)}</section>
        <label className="field span-2"><span>Success criteria / KPI</span><textarea rows={2} value={draft.successCriteria||""} onChange={e=>setDraft({...draft,successCriteria:e.target.value})}/></label>
        <label className="field"><span>Decisions <small>one per line</small></span><textarea rows={3} value={draft.decisions.join("\n")} onChange={e=>updateList("decisions",e.target.value)}/></label><label className="field"><span>Links / source material <small>one per line</small></span><textarea rows={3} value={draft.links.join("\n")} onChange={e=>updateList("links",e.target.value)}/></label>
        {draft.id&&<><label className="field span-2"><span>Add meaningful history note</span><input placeholder="e.g. Spoke with Manish; review expected Tuesday." value={note} onChange={e=>setNote(e.target.value)}/></label><section className="detail-section span-2"><h3>Activity History</h3><div className="timeline">{[...draft.activity].reverse().map(a=><div className="history" key={a.id}><time>{new Intl.DateTimeFormat("en",{day:"numeric",month:"short",year:"numeric"}).format(new Date(a.timestamp))}</time><div><strong>{a.activityType}</strong><p>{a.description}</p></div></div>)}</div></section></>}
      </div><footer className="detail-footer">{draft.id?<button className="danger-link" onClick={remove}><Trash2 size={15}/> Delete</button>:<span/>}<div><button className="secondary" onClick={()=>setSelected(null)}>Cancel</button><button className="primary" disabled={saving||!draft.title.trim()} onClick={save}>{saving?"Saving…":"Save Work Item"}</button></div></footer>
    </SheetContent></Sheet>
  </main>;
}
