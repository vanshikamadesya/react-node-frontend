import { Link, useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { logoutUser } from "../store/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { ShoppingCartLogo } from "./ShoppingCartLogo";


const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef<number | null>(null);

  const { user, isAuthenticated, isLoading: authLoading, hasFetchedUser } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted. Search term:", searchTerm);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  // Debounced search on typing
  useEffect(() => {
    if (!searchTerm.trim()) {
      console.log("Search term is empty or just whitespace.");
      navigate("/products");
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      console.log("Debounced search triggered. Search term:", searchTerm);
      navigate(`/products?search=${searchTerm}`);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, navigate]);

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
  
       
      </>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-gray-800"
          >
            <ShoppingCartLogo />
            <span>MultiStore</span>
          </Link>

          {/* Search Bar */}
          {isAuthenticated && user && (
            <div className="flex-grow max-w-md px-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                >
                  <Search />
                </button>
              </form>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!hasFetchedUser ? (
              <div>Loading...</div>
            ) : isAuthenticated && user ? (
              <>
                {renderRoleBasedLinks()}

               
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center space-x-2 px-3 py-2"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium truncate max-w-[140px]">
                      {user.email}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
