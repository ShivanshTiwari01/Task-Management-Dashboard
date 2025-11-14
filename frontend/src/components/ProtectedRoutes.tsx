import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const location = useLocation();

  if (!userId) {
    return <Navigate to='/' replace state={{ from: location }} />;
  }
  return <Outlet />;
}
