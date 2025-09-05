"use server";

import { revalidatePath } from "next/cache";

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

type JobInsert = Omit<JobRow, "id" | "created_at" | "updated_at">;
type JobUpdate = Partial<JobInsert>;
type PipelineStage =
  | "applied"
  | "phone"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

type CandidateRow = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type JobCandidateRow = {
  id: string;
  job_id: string;
  candidate_id: string;
  stage: PipelineStage;
  created_at: string;
  updated_at: string;
};

// Mock implementations since database is not set up
export async function listJobs(): Promise<JobRow[]> {
  // Mock data for demonstration
  return [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      employment_type: "Full-time",
      status: "open",
      headcount: 1,
      description: "We are looking for a senior frontend engineer...",
      external_link: "https://example.com/job-posting",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

export async function createJob(
  input: Pick<
    JobInsert,
    | "title"
    | "department"
    | "location"
    | "employment_type"
    | "headcount"
    | "description"
    | "external_link"
  >
): Promise<{ ok: true; id: string }> {
  // Mock implementation
  revalidatePath("/jobs");
  return { ok: true, id: Math.random().toString(36).substr(2, 9) };
}

export async function updateJob(
  id: string,
  patch: Partial<
    Pick<
      JobUpdate,
      | "title"
      | "department"
      | "location"
      | "employment_type"
      | "headcount"
      | "description"
      | "external_link"
      | "status"
    >
  >
): Promise<{ ok: true }> {
  // Mock implementation
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${id}`);
  return { ok: true };
}

export async function archiveJob(
  id: string,
  archived = true
): Promise<{ ok: true }> {
  // Mock implementation
  revalidatePath("/jobs");
  return { ok: true };
}

export async function getJob(id: string): Promise<JobRow | null> {
  // Mock implementation
  return {
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
}

export async function listPipeline(jobId: string): Promise<JobCandidateRow[]> {
  // Mock implementation
  return [
    {
      id: "1",
      job_id: jobId,
      candidate_id: "candidate-1",
      stage: "applied",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      job_id: jobId,
      candidate_id: "candidate-2",
      stage: "interview",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

export async function addCandidateToJob(
  jobId: string,
  candidateId: string
): Promise<{ ok: true }> {
  // Mock implementation
  revalidatePath(`/jobs/${jobId}`);
  return { ok: true };
}

export async function moveCandidateStage(
  jobId: string,
  candidateId: string,
  stage: PipelineStage
): Promise<{ ok: true }> {
  // Mock implementation
  revalidatePath(`/jobs/${jobId}`);
  return { ok: true };
}

export async function listCandidates(): Promise<CandidateRow[]> {
  // Mock implementation
  return [
    {
      id: "candidate-1",
      name: "John Doe",
      email: "john@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}
