import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hook';
import { logoutUser } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading: authLoading, hasFetchedUser } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderRoleBasedLinks = () => {
    if (!user) return null;
  
    return (
      <>
        <Link to="/products">
          <button className="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500">
            View Products
          </button>
        </Link>
  
        {user.type === 'SELLER' && (
          <>
            <Link to="/create-product">
              <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Create Product
              </button>
            </Link>
  
            {/* <Link to="/my-products">
              <button className="px-4 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
                My Products
              </button>
            </Link> */}
          </>
        )}
  
        {/* Optional: Add admin-specific links in future */}
        {/* {user.type === 'SUPERADMIN' && (
          <Link to="/admin-panel">
            <button className="px-4 py-2 rounded-md border border-yellow-600 text-yellow-600 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              Admin Panel
            </button>
          </Link>
        )} */}
      </>
    );
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
            {!hasFetchedUser ? (
              <div>Loading...</div>
            ) : isAuthenticated && user ? (
              <>
                {renderRoleBasedLinks()}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
