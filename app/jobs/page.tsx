'use client';

import React from 'react';

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  status: 'Draft' | 'Open' | 'On Hold' | 'Closed';
  candidates: { stage: string; count: number }[];
};

const demoJobs: Job[] = [
  {
    id: 'J-001',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'Full-time',
    status: 'Open',
    candidates: [
      { stage: 'Applied', count: 23 },
      { stage: 'Phone', count: 8 },
      { stage: 'Interview', count: 5 },
      { stage: 'Offer', count: 1 },
    ],
  },
  {
    id: 'J-002',
    title: 'Product Designer',
    department: 'Design',
    location: 'NY, USA',
    employmentType: 'Full-time',
    status: 'On Hold',
    candidates: [
      { stage: 'Applied', count: 40 },
      { stage: 'Phone', count: 6 },
      { stage: 'Interview', count: 2 },
      { stage: 'Offer', count: 0 },
    ],
  },
  {
    id: 'J-003',
    title: 'Recruiter',
    department: 'People',
    location: 'London, UK',
    employmentType: 'Contract',
    status: 'Draft',
    candidates: [
      { stage: 'Applied', count: 5 },
      { stage: 'Phone', count: 0 },
      { stage: 'Interview', count: 0 },
      { stage: 'Offer', count: 0 },
    ],
  },
];

export default function JobsPage(): JSX.Element {
  const [query, setQuery] = React.useState<string>('');

  const filtered = demoJobs.filter(
    (j) =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.department.toLowerCase().includes(query.toLowerCase()) ||
      j.location.toLowerCase().includes(query.toLowerCase())
  );

  const statusPillClass = (status: Job['status']): string => {
    switch (status) {
      case 'Open':
        return 'pill green';
      case 'On Hold':
        return 'pill yellow';
      case 'Closed':
        return 'pill red';
      default:
        return 'pill';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <p className="text-sm text-[var(--muted)]">Manage and track your job requisitions</p>
        </div>
        <div className="flex gap-2">
          <input
            className="input w-64"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary">New Job</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((job) => (
          <div key={job.id} className="card p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span className={statusPillClass(job.status)}>{job.status}</span>
                </div>
                <div className="text-sm text-[var(--muted)] mt-1">
                  {job.department} · {job.location} · {job.employmentType}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.candidates.map((c) => (
                  <span className="pill" key={c.stage}>
                    {c.stage}: {c.count}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <a className="btn" href={`/jobs/${job.id}`}>View</a>
                <button className="btn">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
