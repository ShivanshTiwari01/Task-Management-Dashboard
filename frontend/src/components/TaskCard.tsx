import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import TaskDialog from './TaskDialog';
import { useState } from 'react';
import type React from 'react';
import { Pencil, Trash2, User } from 'lucide-react';
import clsx from 'clsx';

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const priorityClass = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  }[task.priority];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    try {
      e.dataTransfer.setData(
        'application/json',
        JSON.stringify({ id: String(task.id), status: task.status })
      );
      e.dataTransfer.effectAllowed = 'move';
    } catch (_) {
      // no-op
    }
  };

  return (
    <>
      <div
        className={clsx(
          'rounded-lg border-2 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer',
          priorityClass
        )}
        draggable
        onDragStart={handleDragStart}
      >
        <div className='flex items-start justify-between mb-3'>
          <h3 className='font-semibold text-slate-900 text-base flex-1 mr-2'>
            {task.title}
          </h3>
          <div className='flex gap-1'>
            <button
              className='p-1.5 rounded-md hover:bg-slate-100 transition-colors'
              onClick={() => setOpen(true)}
              title='Edit'
            >
              <Pencil className='h-4 w-4 text-slate-600' />
            </button>
            <button
              className='p-1.5 rounded-md hover:bg-red-100 transition-colors'
              onClick={() => dispatch(deleteTask(task.id))}
              title='Delete'
            >
              <Trash2 className='h-4 w-4 text-red-600' />
            </button>
          </div>
        </div>

        <p className='text-sm text-slate-600 mb-4 line-clamp-2'>
          {task.description}
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm text-slate-600'>
            <User className='h-4 w-4' />
            <span className='font-medium'>{task.assignee}</span>
          </div>
          <span
            className={clsx('text-xs font-semibold uppercase tracking-wide', {
              'text-green-700': task.priority === 'low',
              'text-yellow-700': task.priority === 'medium',
              'text-red-700': task.priority === 'high',
            })}
          >
            {task.priority}
          </span>
        </div>
      </div>
      {open && <TaskDialog initial={task} onClose={() => setOpen(false)} />}
    </>
  );
}
