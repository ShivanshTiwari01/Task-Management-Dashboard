import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../features/tasks/api';
import { Lock, Mail } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) navigate('/dashboard', { replace: true });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { data } = await api.post('/register', { email, password });
      if (data?.userId) {
        localStorage.setItem('userId', String(data.userId));
        const to = location.state?.from?.pathname || '/dashboard';
        navigate(to, { replace: true });
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen grid place-items-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4'>
      <div className='card w-full max-w-md'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-2 bg-blue-600 rounded-lg'>
            <Lock className='h-6 w-6 text-white' />
          </div>
          <div>
            <h1 className='text-xl font-bold text-slate-900'>Welcome</h1>
            <p className='text-sm text-slate-600'>
              Sign up or log in to continue
            </p>
          </div>
        </div>

        {error && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none' />
              <input
                type='email'
                className='input pl-10'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              className='input'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary w-full'
            disabled={submitting}
          >
            {submitting ? 'Please wait…' : 'Continue'}
          </button>
        </form>

        <p className='mt-4 text-xs text-slate-500'>
          New email will be registered; existing email will log in.
        </p>
      </div>
    </div>
  );
}
