import TaskCard from './TaskCard';
import { STATUSES } from '../features/tasks/types';

const LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const STATUS_COLORS = {
  todo: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
};

export default function TaskBoard({ tasksByStatus }) {
  return (
    <div className='card'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-slate-900'>All Tasks</h2>
        <p className='text-sm text-slate-600 mt-1'>
          Organized by status and priority
        </p>
      </div>

      <div className='space-y-8'>
        {STATUSES.map((status) => {
          const tasks = tasksByStatus[status] || [];
          return (
            <div key={status}>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-lg font-semibold text-slate-800'>
                    {LABELS[status]}
                  </h3>
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}
                  >
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
              </div>

              {tasks.length === 0 ? (
                <div className='rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-slate-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <p className='mt-2 text-sm text-slate-500'>
                    No tasks in this status
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {tasks.map((t) => (
                    <TaskCard key={t.id} task={t} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
