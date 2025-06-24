import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hook';
import Header from './Header';
import { useCheckSessionQuery, useRefreshSessionMutation } from '../services/authAPI';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { isLoading } = useCheckSessionQuery("");
  const [refreshSession] = useRefreshSessionMutation();

  // Periodically refresh session every 40s when authenticated
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
  
    if (isAuthenticated) {
      interval = setInterval(() => {
        console.log("Attempting to refresh session...");
  
        refreshSession(undefined)
          .unwrap()
          .then((res) => {
            console.log("Session refreshed successfully:", res);
          })
          .catch((err) => {
            console.error("Failed to refresh session:", err);
          });
      }, 40000);  
  
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshSession]);
  

  // Redirect authenticated users away from login/register
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const currentPath = location.pathname;
      if (currentPath === '/login' || currentPath === '/register') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, location.pathname, navigate]);

  // Loading screen while checking session
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
