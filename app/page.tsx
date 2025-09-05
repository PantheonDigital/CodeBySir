export default function Home() {
  return (
    <div className="min-h-screen p-0">
      {/* Hero header / dashboard summary */}
      <section className="card p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              Monitor your pipeline, jobs, and interviews at a glance.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="btn">Invite teammate</button>
            <button className="btn btn-primary">Create Job</button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {[
            { label: 'Open Jobs', value: '12', trend: '+2 this week' },
            { label: 'Active Candidates', value: '84', trend: '+11 this week' },
            { label: 'Interviews', value: '17', trend: '3 today' },
            { label: 'Offers', value: '4', trend: '1 awaiting sign' },
          ].map((kpi) => (
            <div key={kpi.label} className="card p-4">
              <div className="text-xs text-[var(--muted)]">{kpi.label}</div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-2xl font-semibold">{kpi.value}</div>
                <div className="text-xs pill">{kpi.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline + Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pipeline Overview</h2>
            <div className="flex gap-2">
              <button className="btn-ghost btn">This week</button>
              <button className="btn">This month</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4">
            {[
              { stage: 'Applied', count: 34 },
              { stage: 'Phone Screen', count: 18 },
              { stage: 'Interview', count: 17 },
              { stage: 'Offer', count: 4 },
              { stage: 'Hired', count: 2 },
              { stage: 'Rejected', count: 9 },
            ].map((s) => (
              <div key={s.stage} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-xs text-[var(--muted)]">{s.stage}</div>
                <div className="text-xl font-semibold mt-1">{s.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
          <div className="mt-3 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Senior Frontend Engineer</div>
                  <div className="text-xs text-[var(--muted)]">Today · 2:00 PM · with Alex and Priya</div>
                </div>
                <span className="pill blue">On-site</span>
              </div>
            ))}
          </div>
          <button className="btn w-full mt-4">Schedule Interview</button>
        </div>
      </section>
    </div>
  );
}
