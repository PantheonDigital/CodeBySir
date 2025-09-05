'use client';

import React from 'react';

type Candidate = {
  id: string;
  name: string;
  role: string;
  stage: 'Applied' | 'Phone' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  tags: string[];
  location: string;
};

const demoCandidates: Candidate[] = [
  { id: 'c-1', name: 'Alex Johnson', role: 'Frontend Engineer', stage: 'Interview', tags: ['React', 'TypeScript'], location: 'Remote' },
  { id: 'c-2', name: 'Priya Kapoor', role: 'Product Designer', stage: 'Phone', tags: ['Figma', 'UX'], location: 'NY' },
  { id: 'c-3', name: 'Diego Lopez', role: 'Recruiter', stage: 'Applied', tags: ['Sourcing'], location: 'Madrid' },
];

export default function CandidatesPage(): JSX.Element {
  const [query, setQuery] = React.useState<string>('');
  const [stage, setStage] = React.useState<Candidate['stage'] | 'All'>('All');

  const filtered = demoCandidates.filter((c) => {
    const q = query.toLowerCase();
    const matchQuery =
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);
    const matchStage = stage === 'All' ? true : c.stage === stage;
    return matchQuery && matchStage;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Candidates</h1>
          <p className="text-sm text-[var(--muted)]">Search and manage your candidate pool</p>
        </div>
        <div className="flex gap-2">
          <input
            className="input w-64"
            placeholder="Search candidates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="input w-40"
            value={stage}
            onChange={(e) => setStage(e.target.value as Candidate['stage'] | 'All')}
          >
            {['All', 'Applied', 'Phone', 'Interview', 'Offer', 'Hired', 'Rejected'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button className="btn btn-primary">Add Candidate</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((c) => (
          <div key={c.id} className="card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-lg font-medium">{c.name}</div>
              <div className="text-sm text-[var(--muted)]">{c.role} · {c.location}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
            <span className="pill blue">{c.stage}</span>
            <div className="flex gap-2">
              <a className="btn" href={`/candidates/${c.id}`}>Profile</a>
              <button className="btn">Advance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
