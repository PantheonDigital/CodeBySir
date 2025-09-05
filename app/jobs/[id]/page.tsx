// ... existing code ...
import {
  type Database,
  type Tables as TablesHelper,
  type Enums as EnumsHelper,
} from '@/database.types';

// Make helpers match the generated signature: first arg is the union of table/view keys or a schema option
type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;
type PublicSchema = DatabaseWithoutInternals['public'];
type PublicTablesAndViews = keyof (PublicSchema['Tables'] & PublicSchema['Views']);
type PublicEnums = keyof PublicSchema['Enums'];

type T<Name extends PublicTablesAndViews> = TablesHelper<Name>;
type E<Name extends PublicEnums> = EnumsHelper<Name>;

type JobRow = T<'jobs'>;
type CandidateRow = T<'candidates'>;
type JobCandidateRow = T<'job_candidates'>;
type PipelineStage = E<'pipeline_stage'>;
// ... existing code ...
  const [job, setJob] = React.useState<JobRow | null>(null);
// ... existing code ...
  async function handleStatusChange(jobId: string, newStatus: JobRow['status']): Promise<void> {
    try {
      await updateJob(jobId, { status: newStatus });
      setJob((prev: JobRow | null) => (prev ? ({ ...(prev as JobRow), status: newStatus } as JobRow) : prev));
    } finally {
      // ...
    }
  }
// ... existing code ...
