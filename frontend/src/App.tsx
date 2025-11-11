import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  selectFilteredTasks,
  selectMeta,
} from './features/tasks/taskSlice';
import TaskBoard from './components/TaskBoard';
import TaskDialog from './components/TaskDialog';
import FiltersBar from './components/FilterBar';
import { Plus, LayoutDashboard } from 'lucide-react';

export default function App() {
  const dispatch = useDispatch();
  const tasksByStatus = useSelector(selectFilteredTasks);
  const meta = useSelector(selectMeta);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const totalTasks =
    (tasksByStatus.todo?.length || 0) +
    (tasksByStatus['in-progress']?.length || 0) +
    (tasksByStatus.done?.length || 0);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50'>
      {/* Header */}
      <header className='bg-white border-b border-slate-200 shadow-sm'>
        <div className='mx-auto max-w-7xl px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-600 rounded-lg'>
                <LayoutDashboard className='h-6 w-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-slate-900'>
                  Task Management Dashboard
                </h1>
                <p className='text-sm text-slate-600 mt-0.5'>
                  Manage and track your tasks efficiently
                </p>
              </div>
            </div>
            <button className='btn btn-primary' onClick={() => setOpen(true)}>
              <Plus className='mr-2 h-5 w-5' />
              Add New Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-7xl px-6 py-8 space-y-6'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='card bg-gradient-to-br from-blue-500 to-blue-600 text-white'>
            <div className='text-sm font-medium opacity-90'>Total Tasks</div>
            <div className='text-3xl font-bold mt-2'>{totalTasks}</div>
          </div>
          <div className='card bg-gradient-to-br from-slate-500 to-slate-600 text-white'>
            <div className='text-sm font-medium opacity-90'>To Do</div>
            <div className='text-3xl font-bold mt-2'>
              {tasksByStatus.todo?.length || 0}
            </div>
          </div>
          <div className='card bg-gradient-to-br from-blue-400 to-blue-500 text-white'>
            <div className='text-sm font-medium opacity-90'>In Progress</div>
            <div className='text-3xl font-bold mt-2'>
              {tasksByStatus['in-progress']?.length || 0}
            </div>
          </div>
          <div className='card bg-gradient-to-br from-green-500 to-green-600 text-white'>
            <div className='text-sm font-medium opacity-90'>Completed</div>
            <div className='text-3xl font-bold mt-2'>
              {tasksByStatus.done?.length || 0}
            </div>
          </div>
        </div>

        {/* Filters */}
        <FiltersBar />

        {/* Loading/Error States */}
        {meta.loading && (
          <div className='card text-center py-12'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent'></div>
            <p className='mt-4 text-slate-600'>Loading tasks…</p>
          </div>
        )}
        {meta.error && (
          <div className='card border-red-200 bg-red-50'>
            <div className='flex items-center gap-3 text-red-700'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='font-medium'>{meta.error}</span>
            </div>
          </div>
        )}

        {/* Task Board */}
        {!meta.loading && <TaskBoard tasksByStatus={tasksByStatus} />}
      </main>

      {/* Dialog */}
      {open && <TaskDialog onClose={() => setOpen(false)} />}
    </div>
  );
}
