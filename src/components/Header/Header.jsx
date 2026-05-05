import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Sprout, Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // total count including quantity of each item
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "MarketPrice", slug: "/marketprice", active: authStatus },
    { name: "Marketplace", slug: "/all-posts", active: authStatus },
    { name: "For Farmers", slug: "/dashboard", active: authStatus },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="navbar glass sticky top-0 z-50">
      <Container>
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="brand flex items-center gap-2">
            <div className="logo-icon flex items-center justify-center bg-primary rounded-full p-1">
              <Sprout size={24} color="white" />
            </div>
            <span className="brand-text font-serif text-xl font-bold text-primary">FarmDirect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links hidden md:flex items-center gap-6">
            <ul className="flex ml-auto gap-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="nav-link inline-block px-6 py-2 duration-200 hover:bg-green-100 rounded-full font-medium"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null,
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>

            <div className="flex items-center gap-4 border-l border-gray-300 pl-4">
              <Link to="/cart" className="icon-btn" aria-label="Cart"
                style={{ position: "relative", display: "inline-flex" }}
              >
                <ShoppingCart size={24} className="text-primary hover:text-green-700 transition" />
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#e53e3e",
                    color: "#fff",
                    borderRadius: "999px",
                    minWidth: "18px",
                    height: "18px",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Toggle and Cart */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="icon-btn" aria-label="Cart"
              style={{ position: "relative", display: "inline-flex" }}
            >
              <ShoppingCart size={24} className="text-primary hover:text-green-700 transition" />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#e53e3e",
                  color: "#fff",
                  borderRadius: "999px",
                  minWidth: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-primary p-1 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 px-4 py-4 shadow-lg flex flex-col gap-2">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                className="w-full text-left px-4 py-3 hover:bg-green-50 rounded-lg font-medium text-gray-800"
                onClick={() => {
                  toggleMenu();
                  navigate(item.slug);
                }}
              >
                {item.name}
              </button>
            ) : null,
          )}
          {authStatus && (
            <div className="px-4 py-2 mt-2 border-t border-gray-100">
              <LogoutBtn />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;