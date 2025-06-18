// src/components/Layout.tsx (Corrected and Simplified)

import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { checkAuthStatus } from '../store/slices/authSlice';
import Header from './Header';


const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, hasFetchedUser } = useAppSelector((state) => state.auth);

  // 1. Dispatch the auth check ONCE when the app/layout loads.
  useEffect(() => {
    if (!hasFetchedUser) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, hasFetchedUser]);

  // 2. Handle redirection for authenticated users away from login/register pages.
  useEffect(() => {
    // This effect runs after the user status is confirmed.
    if (hasFetchedUser && isAuthenticated) {
      const currentPath = location.pathname;
      // If a logged-in user tries to visit login or register, send them to the dashboard.
      if (currentPath === '/login' || currentPath === '/register') {
        navigate('/dashboard', { replace: true });
      }
    }
    // We don't need to handle redirecting unauthenticated users from protected routes here.
    // The <ProtectedRoute> component will handle that responsibility perfectly.
  }, [hasFetchedUser, isAuthenticated, location.pathname, navigate]);

  // 3. Render a loading screen until the initial auth check is complete.
  // This is the single source of truth for the initial loading state.
  if (!hasFetchedUser) {
    return ; // A full-page loading component
  }


  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;