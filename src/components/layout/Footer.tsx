import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white">
              LUXE<span className="text-zinc-400">Soles</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400">
              Premium destination for authenticated second-hand luxury footwear.
              Every pair tells a story, and we ensure it's a genuine one.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-zinc-400 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-sm text-zinc-400 hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/refunds" className="text-sm text-zinc-400 hover:text-white transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/authenticity" className="text-sm text-zinc-400 hover:text-white transition-colors">Authenticity Guarantee</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-zinc-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-400">123 Luxury Lane, Fashion District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-zinc-400" />
                <span className="text-sm text-zinc-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-zinc-400" />
                <span className="text-sm text-zinc-400">support@luxesoles.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-2">Newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-zinc-800 border border-zinc-700 text-white px-3 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-zinc-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-zinc-700 text-white px-3 py-2 text-sm font-medium rounded-r-md hover:bg-zinc-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} LUXESoles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;