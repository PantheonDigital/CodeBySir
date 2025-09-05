'use client';

import React from 'react';

type InterviewItem = {
  id: string;
  title: string;
  candidate: string;
  interviewers: string[];
  when: string;
  mode: 'On-site' | 'Remote';
};

const demoInterviews: InterviewItem[] = [
  { id: 'i-1', title: 'Frontend Engineer — Technical', candidate: 'Alex Johnson', interviewers: ['Sam', 'Priya'], when: 'Today · 2:00 PM', mode: 'On-site' },
  { id: 'i-2', title: 'Product Designer — Portfolio', candidate: 'Priya Kapoor', interviewers: ['Diego'], when: 'Tomorrow · 10:30 AM', mode: 'Remote' },
  { id: 'i-3', title: 'Recruiter — Behavioral', candidate: 'Diego Lopez', interviewers: ['Alex'], when: 'Fri · 1:00 PM', mode: 'Remote' },
];

export default function InterviewsPage(): JSX.Element {
  const [query, setQuery] = React.useState<string>('');

  const filtered = demoInterviews.filter(
    (it) =>
      it.title.toLowerCase().includes(query.toLowerCase()) ||
      it.candidate.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Interviews</h1>
          <p className="text-sm text-[var(--muted)]">Schedule and track upcoming interviews</p>
        </div>
        <div className="flex gap-2">
          <input
            className="input w-72"
            placeholder="Search interviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary">New Interview</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((it) => (
          <div key={it.id} className="card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-lg font-medium">{it.title}</div>
              <div className="text-sm text-[var(--muted)]">
                {it.candidate} · {it.when} · Interviewers: {it.interviewers.join(', ')}
              </div>
            </div>
            <span className={`pill ${it.mode === 'On-site' ? 'blue' : ''}`}>{it.mode}</span>
            <div className="flex gap-2">
              <button className="btn">View Kit</button>
              <button className="btn">Feedback</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
