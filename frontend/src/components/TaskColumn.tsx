import TaskCard from './TaskCard';

const LABELS = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };

export default function TaskColumn({ status, tasks }) {
  return (
    <div className='card min-h-[60vh]'>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>{LABELS[status]}</h2>
        <span className='rounded-full bg-slate-100 px-2 py-1 text-xs'>
          {tasks.length}
        </span>
      </div>
      <div className='space-y-3'>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
        {tasks.length === 0 && (
          <div className='text-sm text-slate-400'>No tasks.</div>
        )}
      </div>
    </div>
  );
}
