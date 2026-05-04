import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Sprout } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // total count including quantity of each item
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "MarketPrice", slug: "/marketprice", active: authStatus },
    { name: "Marketplace", slug: "/all-posts", active: authStatus },
    { name: "For Farmers", slug: "/dashboard", active: authStatus },
  ];

  return (
    <header className="navbar glass">
      <Container>
        <div className="container flex items-center justify-between">
          <Link to="/" className="brand flex items-center gap-2">
            <div className="logo-icon flex items-center justify-center">
              <Sprout size={24} color="white" />
            </div>
            <span className="brand-text">FarmDirect</span>
          </Link>

          <nav className="nav-links flex items-center gap-6">
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="nav-link inline-block px-6 py-2 duration-200 hover:bg-green-100 rounded-full"
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

            <div className="flex items-center gap-4 border-l pl-4">
              <Link to="/cart" className="icon-btn" aria-label="Cart"
                style={{ position: "relative", display: "inline-flex" }}
              >
                <ShoppingCart size={20} />
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
        </div>
      </Container>
    </header>
  );
}

export default Header;