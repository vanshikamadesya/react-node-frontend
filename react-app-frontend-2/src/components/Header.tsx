import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { logoutUser } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            MultiStore
          </Link>
          
          {/* <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div> */}

          <div className="flex items-center space-x-4">
            {/* Show loading state or render links based on user/authLoading */}
            {authLoading ? (
              <div>Loading...</div> // Or a spinner
            ) : user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hi, {user.username}</span>
                <Link to="/profile">
                  <button className="relative">
                    <User className="h-5 w-5" />
                  </button>
                </Link>
                {user.type === 'SUPERADMIN' && (
                  <Link to="/admin">
                    <button className="relative">
                      Admin
                    </button>
                  </Link>
                )}
                <button onClick={handleLogout} className="relative">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <button className="relative">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="relative">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;