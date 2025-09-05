'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  type Database,
  type Tables as TablesHelper,
  type TablesInsert as TablesInsertHelper,
  type TablesUpdate as TablesUpdateHelper,
  type Enums as EnumsHelper,
} from '@/database.types';

// Make helpers match the generated signature: first arg is the union of table/view keys or a schema option
type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;
type PublicSchema = DatabaseWithoutInternals['public'];
type PublicTablesAndViews = keyof (PublicSchema['Tables'] & PublicSchema['Views']);
type PublicEnums = keyof PublicSchema['Enums'];

type T<Name extends PublicTablesAndViews> = TablesHelper<Name>;
type TI<Name extends keyof PublicSchema['Tables']> = TablesInsertHelper<Name>;
type TU<Name extends keyof PublicSchema['Tables']> = TablesUpdateHelper<Name>;
type E<Name extends PublicEnums> = EnumsHelper<Name>;

type JobRow = T<'jobs'>;
type JobInsert = TI<'jobs'>;
type JobUpdate = TU<'jobs'>;
type PipelineStage = E<'pipeline_stage'>;
type CandidateRow = T<'candidates'>;
type JobCandidateRow = T<'job_candidates'>;

export async function listJobs(): Promise<JobRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createJob(input: Pick<JobInsert, 'title' | 'department' | 'location' | 'employment_type' | 'headcount' | 'description' | 'external_link'>): Promise<{ ok: true; id: string }> {
  const supabase = await createClient();
  // created_by set by client later if needed; RLS allows admin/recruiter
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      title: input.title,
      department: input.department ?? null,
      location: input.location ?? null,
      employment_type: input.employment_type ?? null,
      headcount: input.headcount ?? 1,
      description: input.description ?? null,
      external_link: input.external_link ?? null,
      status: 'open',
    } as JobInsert)
    .select('id')
    .single();

  if (error) throw new Error(error.message);
  revalidatePath('/jobs');
  return { ok: true, id: (data as { id: string }).id };
}

export async function updateJob(id: string, patch: Partial<Pick<JobUpdate, 'title' | 'department' | 'location' | 'employment_type' | 'headcount' | 'description' | 'external_link' | 'status'>>): Promise<{ ok: true }> {
  const supabase = await createClient();
  const { error } = await supabase.from('jobs').update(patch as JobUpdate).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/jobs');
  revalidatePath(`/jobs/${id}`);
  return { ok: true };
}

export async function archiveJob(id: string, archived = true): Promise<{ ok: true }> {
  const supabase = await createClient();
  const { error } = await supabase.from('jobs').update({ is_archived: archived } as JobUpdate).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/jobs');
  return { ok: true };
}

export async function getJob(id: string): Promise<JobRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data ?? null;
}

export async function listPipeline(jobId: string): Promise<JobCandidateRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('job_candidates')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addCandidateToJob(jobId: string, candidateId: string): Promise<{ ok: true }> {
  const supabase = await createClient();
  const payload: TI<'job_candidates'> = {
    job_id: jobId,
    candidate_id: candidateId,
    stage: 'applied',
  };
  const { error } = await supabase.from('job_candidates').insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath(`/jobs/${jobId}`);
  return { ok: true };
}

export async function moveCandidateStage(jobId: string, candidateId: string, stage: PipelineStage): Promise<{ ok: true }> {
  const supabase = await createClient();
  const updatePayload: TU<'job_candidates'> = { stage: stage as PipelineStage };
  const { error } = await supabase
    .from('job_candidates')
    .update(updatePayload)
    .eq('job_id', jobId)
    .eq('candidate_id', candidateId);
  if (error) throw new Error(error.message);
  revalidatePath(`/jobs/${jobId}`);
  return { ok: true };
}

export async function listCandidates(): Promise<CandidateRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('candidates').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
