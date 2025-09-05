"use client";

import React from "react";

// Define types locally since database types are not available
type JobRow = {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  status: "draft" | "open" | "on_hold" | "closed";
  headcount: number;
  description: string | null;
  external_link: string | null;
  created_at: string;
  updated_at: string;
};

type JobCandidateRow = {
  id: string;
  job_id: string;
  candidate_id: string;
  stage: "applied" | "phone" | "interview" | "offer" | "hired" | "rejected";
  created_at: string;
  updated_at: string;
};

type PipelineStage =
  | "applied"
  | "phone"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({
  params,
}: JobDetailPageProps): JSX.Element {
  const { id } = params;
  const [job, setJob] = React.useState<JobRow | null>(null);
  const [pipeline, setPipeline] = React.useState<JobCandidateRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Mock data for demonstration since database is not set up
    const mockJob: JobRow = {
      id: id,
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      employment_type: "Full-time",
      status: "open",
      headcount: 1,
      description:
        "We are looking for a senior frontend engineer to join our team...",
      external_link: "https://example.com/job-posting",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockPipeline: JobCandidateRow[] = [
      {
        id: "1",
        job_id: id,
        candidate_id: "candidate-1",
        stage: "applied",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        job_id: id,
        candidate_id: "candidate-2",
        stage: "interview",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    // Simulate loading
    setTimeout(() => {
      setJob(mockJob);
      setPipeline(mockPipeline);
      setLoading(false);
    }, 500);
  }, [id]);

  function handleStatusChange(
    jobId: string,
    newStatus: JobRow["status"]
  ): void {
    setJob((prev: JobRow | null) =>
      prev ? ({ ...prev, status: newStatus } as JobRow) : prev
    );
  }

  function handleStageChange(
    candidateId: string,
    newStage: PipelineStage
  ): void {
    setPipeline((prev) =>
      prev.map((item) =>
        item.candidate_id === candidateId ? { ...item, stage: newStage } : item
      )
    );
  }

  const statusPillClass = (status: JobRow["status"]): string => {
    switch (status) {
      case "open":
        return "pill green";
      case "on_hold":
        return "pill yellow";
      case "closed":
        return "pill red";
      default:
        return "pill";
    }
  };

  const stagePillClass = (stage: PipelineStage): string => {
    switch (stage) {
      case "applied":
        return "pill";
      case "phone":
        return "pill blue";
      case "interview":
        return "pill purple";
      case "offer":
        return "pill green";
      case "hired":
        return "pill green";
      case "rejected":
        return "pill red";
      default:
        return "pill";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading job details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Job not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-xs text-[var(--muted)]">Job</div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {job.department} · {job.location} · {job.employment_type}
            </p>
          </div>
          <div className="flex gap-2">
            <span className={statusPillClass(job.status)}>
              {job.status?.replace("_", " ").toUpperCase()}
            </span>
            <button className="btn">Edit</button>
            <button className="btn btn-primary">Add Candidate</button>
          </div>
        </div>

        {job.description && (
          <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="text-sm font-medium mb-2">Description</div>
            <div className="text-sm text-[var(--muted)]">{job.description}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 card p-5">
          <h3 className="text-lg font-semibold mb-4">Pipeline</h3>

          {pipeline.length === 0 ? (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-[var(--muted)]">
              No candidates in pipeline yet.
            </div>
          ) : (
            <div className="space-y-3">
              {pipeline.map((item) => (
                <div
                  key={`${item.job_id}-${item.candidate_id}`}
                  className="p-3 rounded-lg border border-white/10 bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">
                        Candidate {item.candidate_id}
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        Added {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={stagePillClass(item.stage)}>
                        {item.stage?.replace("_", " ").toUpperCase()}
                      </span>
                      <select
                        className="input text-xs"
                        value={item.stage}
                        onChange={(e) =>
                          handleStageChange(
                            item.candidate_id,
                            e.target.value as PipelineStage
                          )
                        }
                      >
                        <option value="applied">Applied</option>
                        <option value="phone">Phone</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="card p-5">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Status</span>
              <select
                className="input text-xs"
                value={job.status}
                onChange={(e) =>
                  handleStatusChange(job.id, e.target.value as JobRow["status"])
                }
              >
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="on_hold">On Hold</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Headcount</span>
              <span>{job.headcount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Created</span>
              <span>{new Date(job.created_at).toLocaleDateString()}</span>
            </div>
            {job.external_link && (
              <div className="pt-2">
                <a
                  href={job.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full"
                >
                  View External Posting
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
