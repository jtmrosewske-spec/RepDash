import { useState, useEffect } from "react";

const SNAP_TEAL = "#00B5AD";
const SNAP_DARK = "#0A1628";
const SNAP_NAVY = "#0D2137";
const SNAP_CARD = "#112240";
const SNAP_BORDER = "#1A3A5C";
const SNAP_TEXT = "#E2E8F0";
const SNAP_MUTED = "#64748B";
const SNAP_LIGHT = "#94A3B8";

const DEFAULT_REPS = [
  { name:"Darius Redrick", tier:"C", freq:"Weekly", tsrQ2:98244, goalQ2:76894, newSales:118.8, launch:64.7, relaunch:41.7, otk:85, appUsage:48, reSign:0, afp:8, tipping:100, washington:false, colorado:false, constraint:"accountability", notes:"AFP strong. Tech enablement and re-signs weak. Inconsistent history — Q4 was 31%. Needs systems not motivation.", coachFocus:["Re-Sign pipeline","App usage conversations","OTK on every campaign"] },
  { name:"Garrett Streufert", tier:"C", freq:"Weekly", tsrQ2:28800, goalQ2:79969, newSales:200, launch:87.5, relaunch:0, otk:7.4, appUsage:86, reSign:31.6, afp:4, tipping:100, washington:true, colorado:false, constraint:"accountability", notes:"Gaming easy metrics. New sales look good but zero re-launch, near-zero OTK. WA policy blocks OTK/Incentive.", coachFocus:["Re-launch rate — why is it zero?","AFP meetings below target","OTK blocked by WA policy — flag only"] },
  { name:"Grace Flynn", tier:"A", freq:"As needed", tsrQ2:170163, goalQ2:200876, newSales:208.7, launch:74.2, relaunch:60, otk:96.6, appUsage:51.7, reSign:1.5, afp:6, tipping:88.9, washington:false, colorado:true, constraint:"growth", notes:"Colorado crew — joined April. Best overall FFP profile. Don't undercoach assuming she's fine.", coachFocus:["What does her next level look like?","Incentive conversation — CO objection is real","App usage below average for an A player"] },
  { name:"Jake Dosen", tier:"B", freq:"Weekly", tsrQ2:156583, goalQ2:251095, newSales:152.7, launch:84.9, relaunch:61.3, otk:83.8, appUsage:52.5, reSign:3.9, afp:0, tipping:100, washington:false, colorado:true, constraint:"accountability", notes:"Second most raised on team. Complains about territory despite strong numbers. Zero AFP is non-negotiable. CO crew — joined April.", coachFocus:["Direct territory attitude conversation","AFP at zero — non-negotiable","His ceiling vs his complaints"] },
  { name:"Joe Rosenstein", tier:"B+", freq:"As needed", tsrQ2:101335, goalQ2:145077, newSales:142.5, launch:72.9, relaunch:39, otk:67.2, appUsage:70.5, reSign:0, afp:7, tipping:100, washington:false, colorado:true, constraint:"growth", notes:"CO crew — joined April. Reliable but not elite. What's holding the ceiling down?", coachFocus:["Re-launch at 39% — room to grow","OTK below average","What would it take to be an A?"] },
  { name:"Kellen Willis", tier:"C", freq:"As needed", tsrQ2:35920, goalQ2:103345, newSales:137.5, launch:66.7, relaunch:35.1, otk:96.9, appUsage:29.1, reSign:0, afp:3, tipping:93.8, washington:false, colorado:false, constraint:"accountability", notes:"9-year veteran, plateaued under $1M annually. Re-sign at 0% is damning. Idaho solo territory — ISR opportunity.", coachFocus:["Re-sign at zero — direct conversation","AFP below target","ISR territory expansion conversation"] },
  { name:"Royal Prendergast", tier:"D", freq:"Weekly", tsrQ2:15519, goalQ2:48057, newSales:100, launch:83.3, relaunch:16.7, otk:45.5, appUsage:55.6, reSign:0, afp:3, tipping:100, washington:true, colorado:false, constraint:"knowledge", notes:"New rep Q4 start. WA policy blocks OTK/Incentive — don't penalize. Launch rate and tipping are positives.", coachFocus:["Foundation building — what does good look like?","Re-launch process — does he know it?","AFP — skill or priority gap?"] },
  { name:"Samuel Akem", tier:"C", freq:"Weekly", tsrQ2:128007, goalQ2:161208, newSales:46.7, launch:52.8, relaunch:15.8, otk:97, appUsage:40.7, reSign:10.5, afp:3, tipping:97, washington:false, colorado:false, constraint:"knowledge", notes:"Boom/bust pattern. OTK and Tipping bright spots. New Sales at 46.7% is the real problem.", coachFocus:["New sales gap — what's blocking the pipeline?","Launch rate below target","Re-launch nearly zero — awareness or priority?"] },
  { name:"Samuel Bathurst", tier:"C+", freq:"As needed", tsrQ2:115443, goalQ2:110727, newSales:67.7, launch:45.8, relaunch:39.5, otk:97.4, appUsage:51, reSign:7.7, afp:2, tipping:92.1, washington:false, colorado:false, constraint:"accountability", notes:"Underrated — 104% Q2. Natural ability leaving upside on table. Re-sign structural issue (AM overload).", coachFocus:["Re-sign blocker — structural, not his fault","AFP at 2 — growth opportunity","What would unlocking his process look like?"] },
  { name:"Sean Marable", tier:"A", freq:"As needed", tsrQ2:214860, goalQ2:317417, newSales:85.1, launch:70.7, relaunch:58.1, otk:92.9, appUsage:61.3, reSign:2.7, afp:9, tipping:100, washington:false, colorado:false, constraint:"growth", notes:"Team anchor. Best overall FFP profile. Re-sign structural (AM capacity). AFP at 9 is strong.", coachFocus:["What does breaking his ceiling look like?","Re-sign blocker — structural issue","Incentive enablement gap"] },
  { name:"Shay Adams", tier:"C", freq:"Weekly", tsrQ2:68025, goalQ2:73817, newSales:37.5, launch:52.6, relaunch:28.1, otk:90.9, appUsage:71.1, reSign:3.3, afp:0, tipping:100, washington:true, colorado:false, constraint:"knowledge", notes:"Improving — 92% Q2 is positive trajectory. Zero AFP is the single biggest gap. WA blocks OTK/Incentive.", coachFocus:["Zero AFP — fear, skill, or priority?","New sales at 37.5% — pipeline conversation","Re-launch process — does she know it?"] },
  { name:"Tashon Brown", tier:"C", freq:"Weekly", tsrQ2:38740, goalQ2:73817, newSales:137.5, launch:65.4, relaunch:0, otk:59.1, appUsage:63.8, reSign:30, afp:2, tipping:100, washington:true, colorado:false, constraint:"accountability", notes:"Re-sign at 30% is his standout — use it. Re-launch at zero is the gap. WA blocks OTK/Incentive.", coachFocus:["Re-launch at zero — process or priority?","AFP at 2 — needs to double","Build on re-sign strength"] },
  { name:"Taylor Boone", tier:"A-", freq:"As needed", tsrQ2:207164, goalQ2:209151, newSales:102.4, launch:80.3, relaunch:45.3, otk:45.2, appUsage:48.5, reSign:7.9, afp:2, tipping:96.8, washington:true, colorado:false, constraint:"growth", notes:"Inherited Cameron's book. Strong producer. WA blocks OTK/Incentive. AFP at 2 and re-launch are the gaps.", coachFocus:["AFP at 2 — specific and coachable","Re-launch below average","Corporate confidence — Hormozi growth challenge"] },
];

const TIER_CONFIG = {
  "A":  { color:"#10B981", bg:"rgba(16,185,129,0.12)", label:"A — Growth Challenge",  approach:"Hormozi",      icon:"🚀" },
  "A+": { color:"#10B981", bg:"rgba(16,185,129,0.12)", label:"A+ — Elite",             approach:"Hormozi",      icon:"🚀" },
  "A-": { color:"#34D399", bg:"rgba(52,211,153,0.12)", label:"A- — Growth Challenge",  approach:"Hormozi",      icon:"🚀" },
  "B":  { color:"#F59E0B", bg:"rgba(245,158,11,0.12)", label:"B — Diagnostic",         approach:"Brad Lea",     icon:"⚡" },
  "B+": { color:"#FBBF24", bg:"rgba(251,191,36,0.12)", label:"B+ — Diagnostic",        approach:"Brad Lea",     icon:"⚡" },
  "C":  { color:"#F87171", bg:"rgba(248,113,113,0.12)",label:"C — One Thing",          approach:"Chet Holmes",  icon:"🎯" },
  "C+": { color:"#FCA5A5", bg:"rgba(252,165,165,0.12)",label:"C+ — One Thing",         approach:"Chet Holmes",  icon:"🎯" },
  "D":  { color:"#A78BFA", bg:"rgba(167,139,250,0.12)",label:"D — Foundation",         approach:"Chris Voss",   icon:"🔑" },
};

const QUESTION_BANKS = {
  "Hormozi":     ["What number would make this quarter feel like a win for you personally?","If you removed your biggest constraint right now, what would you do differently tomorrow?","Where are you leaving money on the table that you already know about?","What would it take for you to be the top rep in the company?"],
  "Brad Lea":    ["Do you know what to do here, or do you need more training on it?","What's the actual reason this hasn't happened yet?","If I held you accountable to this every week, would that change anything?","Is this a priority problem or a skill problem — be honest."],
  "Chet Holmes": ["What's the one thing, if you did it consistently, that would change your numbers?","What does your system look like for re-launches right now?","If you had to do this every single week without exception, what would it look like?","What's getting in the way of doing the fundamentals?"],
  "Chris Voss":  ["It sounds like things feel unfair right now — what would fair look like?","What's the biggest challenge you're facing right now?","What would need to be true for you to feel set up to win here?","What does support from me actually look like to you?"],
};

const COACHING_HABIT = [
  { name:"Kickstart",  q:"What's on your mind?" },
  { name:"AWE",        q:"And what else?" },
  { name:"Focus",      q:"What's the real challenge here for YOU?" },
  { name:"Foundation", q:"What do you want?" },
  { name:"Lazy",       q:"How can I help?" },
  { name:"Strategic",  q:"If you're saying yes to this, what are you saying no to?" },
  { name:"Learning",   q:"What was most useful for you?" },
];

const STORAGE_KEY = "stampede_coaching_v2";
function loadState() { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function saveState(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} }

function MetricRow({ label, value, target, blocked, editable, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const pct = Math.min((value / target) * 100, 100);
  const hit = value >= target;
  const commit = () => { const n = parseFloat(draft); if (!isNaN(n)) onEdit(n); setEditing(false); };

  return (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <span style={{ fontSize:12, color: blocked ? SNAP_MUTED : SNAP_LIGHT }}>
          {label}
          {blocked && <span style={{ fontSize:10, color:"#F59E0B", marginLeft:8, background:"rgba(245,158,11,0.1)", padding:"1px 6px", borderRadius:3 }}>WA POLICY</span>}
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {editable && !editing && (
            <button onClick={() => { setDraft(String(value)); setEditing(true); }}
              style={{ fontSize:10, color:SNAP_TEAL, background:"none", border:"none", cursor:"pointer", padding:0 }}>edit</button>
          )}
          {editing ? (
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              <input value={draft} onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if(e.key==="Enter") commit(); if(e.key==="Escape") setEditing(false); }}
                style={{ width:60, background:SNAP_NAVY, border:`1px solid ${SNAP_BORDER}`, color:SNAP_TEXT, borderRadius:4, padding:"2px 6px", fontSize:11 }} autoFocus />
              <button onClick={commit} style={{ color:"#10B981", background:"none", border:"none", cursor:"pointer", fontSize:13 }}>✓</button>
              <button onClick={() => setEditing(false)} style={{ color:"#F87171", background:"none", border:"none", cursor:"pointer", fontSize:13 }}>✕</button>
            </div>
          ) : (
            <span style={{ fontSize:12, fontWeight:600, color: blocked ? SNAP_MUTED : hit ? "#10B981" : "#F87171" }}>
              {value}% <span style={{ color:SNAP_MUTED, fontWeight:400 }}>/ {target}%</span>
            </span>
          )}
        </div>
      </div>
      <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:6, height:6, overflow:"hidden" }}>
        <div style={{
          width:`${blocked ? 0 : pct}%`, height:"100%", borderRadius:6,
          background: blocked ? "transparent" : hit ? "linear-gradient(90deg,#059669,#10B981)" : pct > 70 ? "linear-gradient(90deg,#D97706,#F59E0B)" : "linear-gradient(90deg,#DC2626,#F87171)",
          transition:"width 0.6s ease"
        }} />
      </div>
    </div>
  );
}

export default function SnapCoachingOS() {
  const [reps, setReps] = useState(() => loadState()?.reps || DEFAULT_REPS);
  const [actions, setActions] = useState(() => loadState()?.actions || {});
  const [notes, setNotes] = useState(() => loadState()?.notes || {});
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState("prep");
  const [filter, setFilter] = useState("All");
  const [newAction, setNewAction] = useState("");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    saveState({ reps, actions, notes });
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [reps, actions, notes]);

  const rep = sel !== null ? reps[sel] : null;
  const tc = rep ? TIER_CONFIG[rep.tier] : null;
  const ptg = rep ? Math.round((rep.tsrQ2 / rep.goalQ2) * 100) : 0;
  const gap = rep ? rep.tsrQ2 - rep.goalQ2 : 0;

  const updateMetric = (field, val) => setReps(p => p.map((r,i) => i===sel ? {...r,[field]:val} : r));
  const addAction = () => {
    if (!newAction.trim() || !rep) return;
    setActions(p => ({ ...p, [rep.name]: [...(p[rep.name]||[]), { text:newAction.trim(), done:false, date:new Date().toLocaleDateString() }] }));
    setNewAction("");
  };
  const toggleAction = idx => setActions(p => ({ ...p, [rep.name]: p[rep.name].map((a,i) => i===idx ? {...a,done:!a.done} : a) }));
  const deleteAction = idx => setActions(p => ({ ...p, [rep.name]: p[rep.name].filter((_,i) => i!==idx) }));
  const openCount = name => (actions[name]||[]).filter(a=>!a.done).length;

  const filtered = filter==="All" ? reps : reps.filter(r=>r.tier[0]===filter);

  const ptgColor = p => p >= 100 ? "#10B981" : p >= 80 ? "#F59E0B" : "#F87171";
  const TABS = ["prep","metrics","questions","notes","actions"];

  return (
    <div style={{ minHeight:"100vh", background:SNAP_DARK, color:SNAP_TEXT, fontFamily:"system-ui,sans-serif", display:"flex", flexDirection:"column" }}>
      <style>{`
  * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:${SNAP_BORDER}; border-radius:2px; }
        .rep-row:hover { background:rgba(0,181,173,0.05) !important; }
        .snap-tab:hover { color:${SNAP_TEXT} !important; }
        input,textarea { font-family:inherit; }
        textarea { resize:vertical; }
        .filter-btn:hover { border-color:${SNAP_TEAL} !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background:SNAP_NAVY, borderBottom:`1px solid ${SNAP_BORDER}`, padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <img src="https://www.snapraise.com/wp-content/uploads/Logo.svg" alt="Snap! Mobile" style={{ height:28, filter:"brightness(0) invert(1)" }} />
          <div style={{ width:1, height:24, background:SNAP_BORDER }} />
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:SNAP_TEXT }}>Stampede Region</div>
            <div style={{ fontSize:11, color:SNAP_MUTED }}>Coaching OS · Q2 2026</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:11, color: saved ? SNAP_TEAL : "transparent", transition:"color 0.4s" }}>✓ Saved</span>
          <div style={{ display:"flex", gap:4 }}>
            {["All","A","B","C","D"].map(f => (
              <button key={f} className="filter-btn" onClick={() => setFilter(f)} style={{
                padding:"4px 10px", borderRadius:6, border:`1px solid ${filter===f ? SNAP_TEAL : SNAP_BORDER}`,
                background: filter===f ? "rgba(0,181,173,0.1)" : "transparent",
                color: filter===f ? SNAP_TEAL : SNAP_MUTED,
                fontSize:11, fontWeight:500, cursor:"pointer"
              }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* SIDEBAR */}
        <div style={{ width:210, background:SNAP_NAVY, borderRight:`1px solid ${SNAP_BORDER}`, overflowY:"auto", flexShrink:0 }}>
          <div style={{ padding:"10px 14px", fontSize:10, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", borderBottom:`1px solid ${SNAP_BORDER}` }}>
            {filtered.length} Reps
          </div>
          {filtered.map(r => {
            const idx = reps.indexOf(r);
            const tc2 = TIER_CONFIG[r.tier];
            const rptg = Math.round((r.tsrQ2/r.goalQ2)*100);
            const open = openCount(r.name);
            return (
              <div key={r.name} className="rep-row" onClick={() => { setSel(idx); setTab("prep"); setEditing(false); }}
                style={{ padding:"12px 14px", cursor:"pointer", borderBottom:`1px solid rgba(26,58,92,0.5)`, background: sel===idx ? "rgba(0,181,173,0.08)" : "transparent", borderLeft: sel===idx ? `3px solid ${SNAP_TEAL}` : "3px solid transparent", transition:"all 0.15s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:500, color: sel===idx ? SNAP_TEXT : SNAP_LIGHT, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {r.name}
                    </div>
                    <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, fontWeight:600, color:ptgColor(rptg) }}>{rptg}%</span>
                      {open > 0 && <span style={{ fontSize:10, color:"#F59E0B", background:"rgba(245,158,11,0.1)", padding:"1px 5px", borderRadius:3 }}>{open}</span>}
                    </div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, color:tc2.color, background:tc2.bg, padding:"3px 6px", borderRadius:4, marginLeft:6, flexShrink:0 }}>{r.tier}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN PANEL */}
        {!rep ? (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16 }}>
            <img src="https://www.snapraise.com/wp-content/uploads/Logo.svg" alt="" style={{ height:40, opacity:0.1, filter:"brightness(0) invert(1)" }} />
            <div style={{ fontSize:14, color:SNAP_MUTED }}>Select a rep to begin</div>
          </div>
        ) : (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

            {/* REP HEADER */}
            <div style={{ background:SNAP_NAVY, borderBottom:`1px solid ${SNAP_BORDER}`, padding:"16px 24px 0", flexShrink:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                    <h2 style={{ fontSize:20, fontWeight:700, color:SNAP_TEXT }}>{rep.name}</h2>
                    <span style={{ fontSize:11, fontWeight:600, color:tc.color, background:tc.bg, padding:"3px 10px", borderRadius:20 }}>
                      {tc.icon} {rep.tier}
                    </span>
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, color:SNAP_MUTED, background:"rgba(255,255,255,0.04)", padding:"2px 8px", borderRadius:4 }}>{tc.approach} Method</span>
                    <span style={{ fontSize:11, color:SNAP_MUTED, background:"rgba(255,255,255,0.04)", padding:"2px 8px", borderRadius:4 }}>{rep.freq}</span>
                    {rep.washington && <span style={{ fontSize:10, color:"#F59E0B", background:"rgba(245,158,11,0.1)", padding:"2px 8px", borderRadius:4 }}>WA Territory</span>}
                    {rep.colorado && <span style={{ fontSize:10, color:"#60A5FA", background:"rgba(96,165,250,0.1)", padding:"2px 8px", borderRadius:4 }}>CO — Joined Apr</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:28, fontWeight:700, color:ptgColor(ptg), lineHeight:1 }}>{ptg}%</div>
                    <div style={{ fontSize:10, color:SNAP_MUTED, marginTop:2 }}>Q2 PTG</div>
                  </div>
                  <button onClick={() => setEditing(!editing)} style={{
                    padding:"6px 12px", borderRadius:6, border:`1px solid ${editing ? SNAP_TEAL : SNAP_BORDER}`,
                    background: editing ? "rgba(0,181,173,0.1)" : "transparent",
                    color: editing ? SNAP_TEAL : SNAP_MUTED, fontSize:11, cursor:"pointer", fontWeight:500
                  }}>{editing ? "Done" : "Edit"}</button>
                </div>
              </div>

              {editing && (
                <div style={{ display:"flex", gap:12, marginBottom:14, flexWrap:"wrap" }}>
                  {[{label:"Q2 Raised",field:"tsrQ2"},{label:"Q2 Goal",field:"goalQ2"}].map(({label,field}) => (
                    <div key={field} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:11, color:SNAP_MUTED }}>{label}</span>
                      <input type="number" value={rep[field]} onChange={e => updateMetric(field, parseFloat(e.target.value)||0)}
                        style={{ width:120, background:SNAP_DARK, border:`1px solid ${SNAP_BORDER}`, color:SNAP_TEXT, borderRadius:6, padding:"4px 10px", fontSize:12 }} />
                    </div>
                  ))}
                </div>
              )}

              {/* TABS */}
              <div style={{ display:"flex" }}>
                {TABS.map(t2 => (
                  <button key={t2} className="snap-tab" onClick={() => setTab(t2)} style={{
                    padding:"8px 16px", background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:500,
                    color: tab===t2 ? SNAP_TEAL : SNAP_MUTED,
                    borderBottom: tab===t2 ? `2px solid ${SNAP_TEAL}` : "2px solid transparent",
                    transition:"all 0.15s", textTransform:"capitalize"
                  }}>{t2}</button>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div style={{ flex:1, overflowY:"auto", padding:"20px 24px 40px" }}>

              {/* PREP */}
              {tab==="prep" && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                    {[{label:"Raised",val:`$${rep.tsrQ2.toLocaleString()}`},{label:"Goal",val:`$${rep.goalQ2.toLocaleString()}`},{label:"Gap",val:`${gap>=0?"+":""}$${gap.toLocaleString()}`,neg:gap<0}].map(s => (
                      <div key={s.label} style={{ background:SNAP_CARD, borderRadius:10, padding:"14px 16px", border:`1px solid ${SNAP_BORDER}` }}>
                        <div style={{ fontSize:11, color:SNAP_MUTED, marginBottom:6 }}>{s.label}</div>
                        <div style={{ fontSize:18, fontWeight:700, color: s.neg ? "#F87171" : SNAP_TEXT }}>{s.val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background:SNAP_CARD, borderRadius:10, padding:18, border:`1px solid ${SNAP_BORDER}`, borderLeft:`3px solid ${tc.color}` }}>
                    <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Constraint</div>
                    <div style={{ fontSize:13, fontWeight:600, color:tc.color, marginBottom:10 }}>
                      {rep.constraint==="accountability" ? "⚡ Accountability Gap" : rep.constraint==="knowledge" ? "📚 Knowledge Gap" : "🚀 Growth Ceiling"}
                    </div>
                    <div style={{ fontSize:13, color:SNAP_LIGHT, lineHeight:1.7 }}>{rep.notes}</div>
                  </div>

                  <div style={{ background:SNAP_CARD, borderRadius:10, padding:18, border:`1px solid ${SNAP_BORDER}` }}>
                    <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Focus This 1:1</div>
                    {rep.coachFocus.map((f,i) => (
                      <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:SNAP_TEAL, marginTop:6, flexShrink:0 }} />
                        <span style={{ fontSize:13, color:SNAP_LIGHT, lineHeight:1.6 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {openCount(rep.name) > 0 && (
                    <div style={{ background:SNAP_CARD, borderRadius:10, padding:18, border:"1px solid rgba(245,158,11,0.3)", borderLeft:"3px solid #F59E0B" }}>
                      <div style={{ fontSize:11, fontWeight:600, color:"#F59E0B", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Open Action Items</div>
                      {(actions[rep.name]||[]).filter(a=>!a.done).slice(0,4).map((a,i) => (
                        <div key={i} style={{ fontSize:13, color:SNAP_LIGHT, marginBottom:6, display:"flex", gap:8 }}>
                          <span style={{ color:"#F59E0B" }}>→</span>{a.text}
                        </div>
                      ))}
                      {openCount(rep.name)>4 && <div style={{ fontSize:11, color:SNAP_MUTED, marginTop:4 }}>+{openCount(rep.name)-4} more in Actions tab</div>}
                    </div>
                  )}
                </div>
              )}

              {/* METRICS */}
              {tab==="metrics" && (
                <div style={{ background:SNAP_CARD, borderRadius:10, padding:20, border:`1px solid ${SNAP_BORDER}` }}>
                  <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:16 }}>
                    FFP Metrics {editing && <span style={{ color:SNAP_TEAL, fontWeight:400 }}>— click edit to update</span>}
                  </div>
                  {[
                    {label:"New Sales % to Goal", field:"newSales", target:100, blocked:false},
                    {label:"Launch Rate %",        field:"launch",   target:65,  blocked:false},
                    {label:"Re-Launch Rate %",     field:"relaunch", target:65,  blocked:false},
                    {label:"OTK Enablement %",     field:"otk",      target:90,  blocked:rep.washington},
                    {label:"App Usage %",          field:"appUsage", target:60,  blocked:false},
                    {label:"Re-Sign %",            field:"reSign",   target:80,  blocked:false},
                    {label:"AFP Meetings",         field:"afp",      target:10,  blocked:false},
                    {label:"Tipping Enablement %", field:"tipping",  target:90,  blocked:false},
                  ].map(m => (
                    <MetricRow key={m.field} {...m} value={rep[m.field]} editable={editing} onEdit={v => updateMetric(m.field,v)} />
                  ))}
                  <div style={{ marginTop:16, padding:12, background:"rgba(255,255,255,0.03)", borderRadius:8, fontSize:11, color:SNAP_MUTED, lineHeight:1.8 }}>
                    ⚠ Launch Rate is gamed across the org — treat as effort signal only<br/>
                    ⚠ Re-Launch data currently bugged for Stampede team<br/>
                    ⚠ Re-Sign gaps for select reps are structural (AM capacity issue)
                  </div>
                </div>
              )}

              {/* QUESTIONS */}
              {tab==="questions" && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ background:SNAP_CARD, borderRadius:10, padding:20, border:`1px solid ${SNAP_BORDER}` }}>
                    <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
                      {tc.approach} — Lead With These
                    </div>
                    {QUESTION_BANKS[tc.approach].map((q,i) => (
                      <div key={i} style={{ padding:"12px 16px", background:"rgba(0,181,173,0.05)", borderRadius:8, marginBottom:8, borderLeft:`2px solid ${SNAP_TEAL}` }}>
                        <div style={{ fontSize:13, color:SNAP_LIGHT, lineHeight:1.6, fontStyle:"italic" }}>"{q}"</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:SNAP_CARD, borderRadius:10, padding:20, border:`1px solid ${SNAP_BORDER}` }}>
                    <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
                      Coaching Habit 7 — Go Deeper
                    </div>
                    {COACHING_HABIT.map((q,i) => (
                      <div key={i} style={{ display:"flex", gap:14, padding:"10px 0", borderBottom:`1px solid ${SNAP_BORDER}` }}>
                        <span style={{ fontSize:10, fontWeight:600, color:SNAP_TEAL, minWidth:72, paddingTop:2, textTransform:"uppercase", letterSpacing:0.5 }}>{q.name}</span>
                        <span style={{ fontSize:13, color:SNAP_LIGHT, fontStyle:"italic" }}>"{q.q}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTES */}
              {tab==="notes" && (
                <div style={{ background:SNAP_CARD, borderRadius:10, padding:20, border:`1px solid ${SNAP_BORDER}` }}>
                  <div style={{ fontSize:11, fontWeight:600, color:SNAP_MUTED, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Session Notes — Auto-saved</div>
                  <textarea value={notes[rep.name]||""} onChange={e => setNotes(p=>({...p,[rep.name]:e.target.value}))}
                    placeholder={`Notes from 1:1 with ${rep.name.split(" ")[0]}...\n\nWhat came up? What shifted? What's the one thing to follow up on?`}
                    style={{ width:"100%", minHeight:320, background:SNAP_DARK, border:`1px solid ${SNAP_BORDER}`, color:SNAP_TEXT, borderRadius:8, padding:14, fontSize:13, lineHeight:1.7, outline:"none" }} />
                  <div style={{ fontSize:11, color:SNAP_MUTED, marginTop:8 }}>Saved automatically to this browser</div>
                </div>
              )}

              {/* ACTIONS */}
              {tab==="actions" && (
                <div>
                  <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                    <input value={newAction} onChange={e=>setNewAction(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addAction()}
                      placeholder={`Add action item for ${rep.name.split(" ")[0]}...`}
                      style={{ flex:1, background:SNAP_CARD, border:`1px solid ${SNAP_BORDER}`, color:SNAP_TEXT, padding:"10px 14px", borderRadius:8, fontSize:13, outline:"none" }} />
                    <button onClick={addAction} style={{ padding:"10px 18px", background:SNAP_TEAL, border:"none", color:"#fff", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>Add</button>
                  </div>

                  {!(actions[rep.name]?.length) ? (
                    <div style={{ textAlign:"center", padding:48, color:SNAP_MUTED, fontSize:13 }}>No action items yet</div>
                  ) : (
                    <>
                      {(actions[rep.name]||[]).filter(a=>!a.done).map((item) => {
                        const ri = actions[rep.name].indexOf(item);
                        return (
                          <div key={ri} style={{ display:"flex", gap:12, padding:"12px 16px", background:SNAP_CARD, borderRadius:8, marginBottom:8, border:`1px solid ${SNAP_BORDER}`, borderLeft:`3px solid ${tc.color}`, alignItems:"flex-start" }}>
                            <button onClick={()=>toggleAction(ri)} style={{ background:"none", border:`2px solid ${SNAP_BORDER}`, width:20, height:20, borderRadius:"50%", cursor:"pointer", flexShrink:0, marginTop:2 }} />
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:13, color:SNAP_TEXT }}>{item.text}</div>
                              <div style={{ fontSize:11, color:SNAP_MUTED, marginTop:3 }}>{item.date}</div>
                            </div>
                            <button onClick={()=>deleteAction(ri)} style={{ background:"none", border:"none", cursor:"pointer", color:SNAP_MUTED, fontSize:16, padding:0 }}>×</button>
                          </div>
                        );
                      })}
                      {(actions[rep.name]||[]).some(a=>a.done) && (
                        <>
                          <div style={{ fontSize:11, color:SNAP_MUTED, margin:"16px 0 8px", letterSpacing:1, textTransform:"uppercase" }}>Completed</div>
                          {(actions[rep.name]||[]).filter(a=>a.done).map((item) => {
                            const ri = actions[rep.name].indexOf(item);
                            return (
                              <div key={ri} style={{ display:"flex", gap:12, padding:"10px 16px", background:"rgba(255,255,255,0.02)", borderRadius:8, marginBottom:6, border:`1px solid rgba(26,58,92,0.4)`, alignItems:"flex-start", opacity:0.5 }}>
                                <button onClick={()=>toggleAction(ri)} style={{ background:"#10B981", border:"none", width:20, height:20, borderRadius:"50%", cursor:"pointer", flexShrink:0, marginTop:2, color:"#fff", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center" }}>✓</button>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:13, color:SNAP_MUTED, textDecoration:"line-through" }}>{item.text}</div>
                                </div>
                                <button onClick={()=>deleteAction(ri)} style={{ background:"none", border:"none", cursor:"pointer", color:SNAP_MUTED, fontSize:16, padding:0 }}>×</button>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
