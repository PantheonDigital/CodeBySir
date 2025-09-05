'use client';

import React from 'react';

export default function CandidateProfile({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params;
  const tabs = ['Overview', 'Activity', 'Notes', 'Attachments'] as const;
  type Tab = typeof tabs[number];
  const [active, setActive] = React.useState<Tab>('Overview');

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-xs text-[var(--muted)]">Candidate</div>
            <h1 className="text-2xl font-semibold">Alex Johnson</h1>
            <p className="text-sm text-[var(--muted)] mt-1">Frontend Engineer · Remote · React, TypeScript</p>
          </div>
          <div className="flex gap-2">
            <button className="btn">Email</button>
            <button className="btn btn-primary">Schedule</button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              className={`pill ${active === t ? 'blue' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 card p-5">
          {active === 'Overview' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm font-medium mb-1">Experience</div>
                <div className="text-sm text-[var(--muted)]">5+ years in frontend. Worked at Acme Co.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm font-medium mb-1">Links</div>
                <div className="text-sm text-[var(--muted)]">Resume, Portfolio, LinkedIn</div>
              </div>
            </div>
          )}
          {active === 'Activity' && (
            <div className="space-y-2">
              {[1,2,3].map((i) => (
                <div key={i} className="p-3 rounded-lg border border-white/10 bg-white/5">
                  <div className="text-sm">Moved to Interview stage</div>
                  <div className="text-xs text-[var(--muted)]">By Priya · 2 days ago</div>
                </div>
              ))}
            </div>
          )}
          {active === 'Notes' && (
            <div className="space-y-3">
              <textarea className="input min-h-32" placeholder="Add a note..." />
              <div className="flex justify-end">
                <button className="btn btn-primary">Save Note</button>
              </div>
            </div>
          )}
          {active === 'Attachments' && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-[var(--muted)]">
              Upload resumes, take-home tasks, and more.
            </div>
          )}
        </div>

        <aside className="card p-5">
          <h3 className="text-lg font-semibold">Profile</h3>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Stage</span>
              <span className="pill blue">Interview</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Owner</span>
              <span>Sam Lee</span>
            </div>
            <button className="btn w-full">Advance Stage</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
