import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { dummyPosts } from "./AllPosts";
import { addToCart } from "../store/cartSlice";

import {ShoppingCart,ArrowLeft,Pencil,Trash2,Leaf,Tag,Star,} from "lucide-react";
import "./Post.css";

export default function Post({ $id, title, content, feturedImage, farmName, price, category, image }) {
  const [post, setPost] = useState(null);
  const [added, setAdded] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    const dummyPost = dummyPosts.find((p) => p.$id === slug);
    if (dummyPost) {
      setPost(dummyPost);
      return;
    }
    appwriteService.getPost(slug).then((p) => {
      if (p) setPost(p);
      else navigate("/");
    });
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.feturedImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="post-page">
      {/* ── Hero Image ── */}
      <div className="post-hero">
        <img
          src={
            post.feturedImage
              ? appwriteService.getFilePreview(post.feturedImage)
              : post.image
          }
          alt={post.title}
          className="post-hero-img"
        />
        <div className="post-hero-overlay" />

        {/* Back button */}
        <Link to="/all-posts" className="post-back-btn">
          <ArrowLeft size={15} /> Back to Market
        </Link>

        {/* Author controls */}
        {isAuthor && (
          <div className="post-author-controls">
            <Link to={`/edit-post/${post.$id}`} className="post-edit-btn">
              <Pencil size={14} /> Edit
            </Link>
            <button className="post-delete-btn" onClick={deletePost}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <Container>
        <div className="post-content-wrap">
          {/* ── Info Card ── */}
          <div className="post-card">
            {/* Eyebrow */}
            <div className="post-eyebrow">
              <span className="post-eyebrow-dot" />
              Farm Fresh Listing
            </div>

            {/* Category fresh badge */}
            {post.category && (
              <div className="post-fresh-badge">
                <Leaf size={13} />
                {post.category}
              </div>
            )}

            {/* Star rating */}
            <div className="post-rating-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill="#c8703a" color="#c8703a" />
              ))}
              <span className="post-rating-label">Farm-verified quality</span>
            </div>

            {/* Title */}
            <h1 className="post-title">{post.title}</h1>

            {/* Meta pills */}
            <div className="post-meta-row">
              {post.category && (
                <span className="post-meta-pill green">
                  <Leaf size={14} /> {post.category}
                </span>
              )}
              {post.price && (
                <span className="post-meta-pill orange">
                  <Tag size={14} /> ₹{post.price}
                </span>
              )}
            </div>

            <hr className="post-divider" />

            {/* Body content */}
            <div className="post-body browser-css">{parse(post.content)}</div>

            <hr className="post-divider" />

            {/* ── Add to Cart ── */}
            <div className="post-cart-wrap">
              <button
                className={`post-cart-btn${added ? " added" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToCart(post),
                  );
                  navigate("/cart");
                }}
              >
                <ShoppingCart size={20} />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* ── Trust strip ── */}
          <div className="post-trust-card">
            {[
              {
                icon: "🌿",
                label: "No Middlemen",
                sub: "Direct from the farmer",
              },
              {
                icon: "🚜",
                label: "Farm-Gate Price",
                sub: "Fair & transparent",
              },
              {
                icon: "⚡",
                label: "Same-Day Fresh",
                sub: "Harvested this morning",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="post-trust-item-icon">{item.icon}</div>
                <div className="post-trust-item-label">{item.label}</div>
                <div className="post-trust-item-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
