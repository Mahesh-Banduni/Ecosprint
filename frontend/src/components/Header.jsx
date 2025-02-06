import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { Menu, X, ChevronDown } from 'lucide-react';
import { logo } from '../utils/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/productSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      dispatch(setFilters({ searchQuery: searchQuery.trim() }));
      navigate('/products', { 
        state: { 
          initialFilters: {
            gender: [],
            category: [],
            brand: [],
            material: [],
            color: [],
            occasion: [],
            season: [],
            searchQuery: searchQuery.trim(),
            priceRange: [0, 10000],
            isBestSeller: '',
            isOnSale: '',
            specialCollection: '',
            isNewArrival: '',
          }
        }
      });
      setSearchQuery(''); // Clear search after navigation
      setIsSearchOpen(false); // Close mobile search if open
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 focus:outline-none mr-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 w-auto mr-2 max-sm:h-8"
            />
            <h1 className="lg:text-2xl md:text-2xl font-bold text-emerald-950 sm:text-xl uppercase">Ecosprint</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-grow mx-8 max-w-xl">
          <div className="flex items-center w-full border border-gray-300 rounded-md px-3 py-2">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text" 
              placeholder="Search..." 
              className="w-full outline-none text-sm"
            />
            <button 
              onClick={handleSearchClick}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IoSearch className="ml-2" />
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="md:hidden mt-2">
            <button 
              onClick={toggleSearch} 
              className="text-gray-700 focus:outline-none"
            >
              <IoSearch size={25} />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={toggleProfileDropdown} 
                className="flex items-center text-gray-700 focus:outline-none"
              >
                <CgProfile size={24} className="sm:mr-5 sm:ml-3 md:mr-5" />
              </button>
            </div>
            {isProfileDropdownOpen && (
              <div className="absolute right-[3%] mt-40 w-48 bg-white border rounded-md shadow-lg py-1">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search..." 
              className="w-full outline-none text-sm"
            />
            <button 
              onClick={handleSearchClick}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IoSearch className="ml-2" />
            </button>
          </div>
        </div>
      )}

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-white border-t`}>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-col lg:items-center justify-center md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-emerald-600 ${isActive ? 'text-emerald-700 font-semibold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-emerald-600 ${isActive ? 'text-emerald-700 font-semibold' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-emerald-600 ${isActive ? 'text-emerald-700 font-semibold' : ''}`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-emerald-600 ${isActive ? 'text-emerald-700 font-semibold' : ''}`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;