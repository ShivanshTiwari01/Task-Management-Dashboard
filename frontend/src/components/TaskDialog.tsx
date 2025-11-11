import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PRIORITIES } from '../features/tasks/types';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high']),
  assignee: z.string().min(1, 'Assignee required'),
  status: z.enum(['todo', 'in-progress', 'done']).default('todo'),
});

export default function TaskDialog({ initial, onClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      status: 'todo',
    },
  });

  const onSubmit = (values) => {
    if (initial) {
      dispatch(updateTask({ id: initial.id, changes: values }));
    } else {
      dispatch(addTask(values));
    }
    onClose();
  };

  return (
    <div
      className='fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='card w-full max-w-2xl shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-2xl font-bold text-slate-900'>
            {initial ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-slate-100 transition-colors'
          >
            <X className='h-5 w-5 text-slate-600' />
          </button>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Task Title
            </label>
            <input
              className='input'
              placeholder='Enter task title...'
              {...register('title')}
            />
            {errors.title && (
              <p className='text-sm text-red-600 mt-1'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Description
            </label>
            <textarea
              className='input'
              rows={4}
              placeholder='Describe the task...'
              {...register('description')}
            />
            {errors.description && (
              <p className='text-sm text-red-600 mt-1'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Priority
              </label>
              <select className='select' {...register('priority')}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Status
              </label>
              <select className='select' {...register('status')}>
                <option value='todo'>To Do</option>
                <option value='in-progress'>In Progress</option>
                <option value='done'>Done</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Assignee
              </label>
              <input
                className='input'
                placeholder='Assign to...'
                {...register('assignee')}
              />
              {errors.assignee && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.assignee.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onClose}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {initial ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
