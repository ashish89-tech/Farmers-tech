import React from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./PostCard.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { adjustPrice, resetPrice } from "../store/priceSlice";


function PostCard({ $id, title, content, feturedImage, farmName, price, category, image }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const priceMultiplier = useSelector((state) => state.price.multiplier);

  return (
    <Link to={`/post/${$id}`} className="pc-link">
      <div className="pc-card">

        {/* ── Image ── */}
        <div className="pc-image-wrapper">
          {category && (
            <span className="pc-category-badge">{category}</span>
          )}

          {image ? (
            <img src={image} alt={title} className="pc-image" />
          ) : feturedImage ? (
            <img
              src={appwriteService.getFilePreview(feturedImage)}
              alt={title}
              className="pc-image"
            />
          ) : (
            <div className="pc-no-image">No Image</div>
          )}

          <div className="pc-price-badge">
             ₹{(price * priceMultiplier).toFixed(2)}
            <span className="pc-price-unit">/box</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="pc-content">
          <h2 className="pc-title">{title}</h2>
          <p className="pc-farm-name">{farmName}</p>
          <div
            className="pc-description"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* ── Footer ── */}
          <div className="pc-footer">
            <span className="pc-tag">Farm Direct</span>
            <button
              className="pc-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart({ $id, title, content, feturedImage, farmName, price, category, image }));
                navigate("/cart");
              }}
            >
              <ShoppingCart size={14} />
              Add
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default PostCard;