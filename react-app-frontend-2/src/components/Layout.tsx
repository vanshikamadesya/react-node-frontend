import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hook';
import Header from './Header';
import { useCheckSessionQuery } from '../services/authAPI';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading } = useCheckSessionQuery("");

  // 2. Handle redirection for authenticated users away from login/register pages.
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const currentPath = location.pathname;
      if (currentPath === '/login' || currentPath === '/register') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, location.pathname, navigate]);

  // 3. Render a loading screen until the initial auth check is complete.
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;