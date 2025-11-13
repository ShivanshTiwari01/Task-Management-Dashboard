import { useDispatch, useSelector } from 'react-redux';
import {
  setAssignee,
  setPriority,
  setQuery,
} from '../features/tasks/taskSlice';
import { useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

export default function FiltersBar() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.tasks.items);
  const filters = useSelector((s) => s.tasks.filters);

  const assignees = useMemo(
    () => Array.from(new Set(items.map((t) => t.assignee))).filter(Boolean),
    [items]
  );

  return (
    <div className='card'>
      <div className='flex items-center gap-2 mb-4'>
        <Filter className='h-5 w-5 text-blue-600' />
        <h3 className='text-lg font-semibold text-slate-900'>Filters</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-1'>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Search Tasks
          </label>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none' />
            <input
              className='input pl-10 w-full'
              placeholder='Search by title or description...'
              value={filters.q}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Priority Level
          </label>
          <select
            className='select'
            value={filters.priority}
            onChange={(e) => dispatch(setPriority(e.target.value))}
          >
            <option value='all'>All Priorities</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-2'>
            Assignee
          </label>
          <select
            className='select'
            value={filters.assignee}
            onChange={(e) => dispatch(setAssignee(e.target.value))}
          >
            <option value='all'>All Assignees</option>
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
