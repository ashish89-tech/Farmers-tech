import React, { useEffect, useState } from "react";
import { PlusCircle, Package, IndianRupee, TrendingUp } from "lucide-react";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/config.js";

const DashBoard = () => {
  const navigate  = useNavigate();
  const userData  = useSelector((state) => state.auth.userData);
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.$id) {
      service
        .getPosts([])
        .then((res) => {
          if (res) {
            const myPosts = res.documents.filter(
              (post) => post.userId === userData.$id
            );
            setPosts(myPosts);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [userData]);

  const totalRevenue = posts.reduce((acc, post) => acc + (post.price || 0), 0);

  return (
    <div className="dashboard-root">

      {/* ── Hero Header ── */}
      <div className="db-hero">
        <div className="db-hero-inner">
          <div>
            <div className="db-eyebrow">
              <span className="db-eyebrow-dot" />
              Farmer Portal
            </div>
            <h1 className="db-title">
              Farmer <span>Dashboard</span>
            </h1>
            <p className="db-welcome">
              Welcome back, {userData?.name || "Farmer"} 👋
            </p>
          </div>
          <button
            className="db-add-btn"
            onClick={() => navigate("/add-post")}
          >
            <PlusCircle size={18} />
            Add New Product
          </button>
        </div>
      </div>

      <div className="db-body">

        {/* ── Stat Cards ── */}
        <div className="db-stats">
          <div className="db-stat-card">
            <div className="db-stat-icon revenue">
              <IndianRupee size={24} />
            </div>
            <div>
              <div className="db-stat-label">Total Revenue</div>
              <div className="db-stat-value">₹{totalRevenue.toFixed(2)}</div>
              <div className="db-stat-sub">from all listings</div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon listings">
              <Package size={24} />
            </div>
            <div>
              <div className="db-stat-label">Active Listings</div>
              <div className="db-stat-value">{posts.length}</div>
              <div className="db-stat-sub">products on market</div>
            </div>
          </div>

          <div className="db-stat-card">
            <div className="db-stat-icon profit">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="db-stat-label">Estimated Extra Profit</div>
              <div className="db-stat-value">+42%</div>
              <div className="db-stat-sub">vs wholesale middlemen</div>
            </div>
          </div>
        </div>

        {/* ── Inventory Table ── */}
        <div className="db-section-label">Your Inventory</div>

        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">
                    <div className="db-empty">
                      <div className="db-empty-icon">🌾</div>
                      Loading your products…
                    </div>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="db-empty">
                      <div className="db-empty-icon">🌱</div>
                      No products yet. Click "Add New Product" to get started.
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.$id}>
                    <td>
                      <div className="db-product-cell">
                        {post.feturedImage && (
                          <img
                            src={service.getFilePreview(post.feturedImage)}
                            alt={post.title}
                            className="db-product-img"
                          />
                        )}
                        <span className="db-product-name">{post.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="db-cat-pill">
                        {post.category || "—"}
                      </span>
                    </td>
                    <td>
                      <span className="db-price">₹{post.price}</span>
                    </td>
                    <td>
                      <span className={`db-status ${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="db-edit-btn"
                        onClick={() => navigate(`/edit-post/${post.$id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;