import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

function Header() {
  const { getCartItemCount, openCart, isCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            FootwearHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link
              to="/?category=sneakers"
              className="text-gray-600 hover:text-gray-900"
            >
              Sneakers
            </Link>
            <Link
              to="/?category=athletic"
              className="text-gray-600 hover:text-gray-900"
            >
              Athletic
            </Link>
            <Link
              to="/?category=formal"
              className="text-gray-600 hover:text-gray-900"
            >
              Formal
            </Link>
            <Link
              to="/?category=boots"
              className="text-gray-600 hover:text-gray-900"
            >
              Boots
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="relative p-2"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/?category=sneakers"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Sneakers
              </Link>
              <Link
                to="/?category=athletic"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Athletic
              </Link>
              <Link
                to="/?category=formal"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Formal
              </Link>
              <Link
                to="/?category=boots"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Boots
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} />
    </header>
  );
}

export default Header;
