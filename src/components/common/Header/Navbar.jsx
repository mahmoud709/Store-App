import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { cartContext } from "../../../Context/CartContext";

const Navbar = () => {
  const { token } = useContext(AuthContext);
  const { numOfCartItems } = useContext(cartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors duration-200 ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
    }`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about-us', label: 'About-us' },
  ];

  return (
    <>
      <nav className="h-16 fixed z-50 top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">

          {/* Logo */}
          <Link to='/' className="text-xl font-bold text-blue-700 tracking-tight">
            Store
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClass}>{label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link to={token ? '/profile' : '/login'}>
              <User className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
            </Link>

            <Link to='/cart' className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors" />
              {numOfCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {numOfCartItems > 99 ? '99+' : numOfCartItems}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X className="w-5 h-5 text-gray-700" />
                : <Menu className="w-5 h-5 text-gray-700" />
              }
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-md
                       transition-all duration-300 ease-in-out md:hidden
                       ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Mobile profile link */}
          <li className="border-t border-gray-100 mt-2 pt-2">
            <Link
              to={token ? '/profile' : '/login'}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <User className="w-4 h-4" />
              {token ? 'Profile' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>

      {/* Backdrop — closes menu on outside click */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;