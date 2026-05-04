


import React, { useEffect, useState } from "react";
import { PlusCircle, Package, IndianRupee, TrendingUp } from "lucide-react";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/config.js"; // adjust path if needed

const DashBoard = ({category,price}) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.$id) {
      service
        .getPosts([]) // get all posts
        .then((res) => {
          if (res) {
            // filter only this user's posts
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
    <div className="dashboard container">
      <div className="dashboard-header flex items-center justify-between">
        <div>
          <h1>Farmer Dashboard</h1>
          <p className="text-muted text-lg text-gray-600 mt-2">
            Welcome back, {userData?.name || "Farmer"}
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-post")}
        >
          <PlusCircle size={20} />
          Add New Product
        </button>
      </div>

      <div className="stats-grid">
        <div
          className="stat-card glass animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div
            className="stat-icon"
            style={{
              backgroundColor: "rgba(44, 95, 45, 0.1)",
              color: "var(--color-primary)",
            }}
          >
            <IndianRupee size={24} />
           
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">₹{totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div
          className="stat-card glass animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className="stat-icon"
            style={{
              backgroundColor: "rgba(151, 188, 98, 0.2)",
              color: "var(--color-accent)",
            }}
          >
            <Package size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Listings</p>
            <h3 className="stat-value">{posts.length}</h3>
          </div>
        </div>

        <div
          className="stat-card glass animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div
            className="stat-icon"
            style={{
              backgroundColor: "rgba(166, 123, 91, 0.2)",
              color: "var(--color-earth)",
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Estimated Extra Profit</p>
            <h3 className="stat-value text-primary">+42%</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              vs wholesale
            </p>
          </div>
        </div>
      </div>

      <div className="inventory-section">
        <h2 style={{ marginBottom: "1.5rem" }}>Your Inventory</h2>
        <div
          className="table-responsive glass"
          style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}
        >
          <table className="inventory-table">
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
                  <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                    Loading...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    No products yet. Click "Add New Product" to get started.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.$id}>
                    <td>
                      <div className="flex items-center gap-4">
                        {post.feturedImage && (
                          <img
                            src={service.getFilePreview(post.feturedImage)}
                            alt={post.title}
                            className="table-img"
                          />
                        )}
                        <span style={{ fontWeight: 500 }}>{post.title}</span>
                      </div>
                    </td>
                    <td>{post.category}</td>
                    <td>{ `₹${post.price}`}</td>
                    <td>
                      <span className={`status-badge ${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline"
                        style={{
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.9rem",
                        }}
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
