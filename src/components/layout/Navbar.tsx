import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { cart, cartCount, dispatch } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_SEARCH', payload: searchValue });
    
    // If not already on shop page, navigate there
    if (location.pathname !== '/shop') {
      // Using window.location for simplicity, but we would use router navigation in a real app
      window.location.href = '/shop';
    }
  };

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isMobileMenuOpen
      ? 'bg-white shadow-md py-3'
      : 'bg-white/80 backdrop-blur-md py-4'
  }`;

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            LUXE<span className="text-gray-600">Soles</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/shop' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/about' ? 'text-black' : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === '/contact' ? 'text-black' : 'text-gray-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Search, Cart, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-40 lg:w-56 py-1.5 pl-8 pr-3 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 focus:bg-white transition-all"
              />
              <Search
                size={16}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </form>

            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-black transition-colors">
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-black transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/account">
              <Button variant="ghost" size="sm" className="p-2">
                <User size={20} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-1 text-gray-700">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
              />
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/wishlist"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                to="/account"
                className="text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;