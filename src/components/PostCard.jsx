import React from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./PostCard.css";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function PostCard({
  $id,
  title,
  content,
  feturedImage,
  farmName,
  price,
  category,
}) {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  return (
    <Link to={`/post/${$id}`} className="link">
      <div className="card">
        {/* Image */}
        <div className="imageWrapper">
          <span className="category-badge">{category}</span>
          {feturedImage ? (
            <img
              src={appwriteService.getFilePreview(feturedImage)}
              alt={title}
              className="image"
            />
          ) : (
            <div className="noImage">No Image</div>
          )}

          {/* Price badge */}
          <div className="priceBadge">
            ₹{price}
            <span className="priceUnit">/box</span>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h2 className="title">{title}</h2>
          <p className="farmName">{farmName}</p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Footer */}
          <div className="footer">
            <span className="tag">Farm Direct</span>
            <button
              className="cartBtn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  addToCart(
                    {$id,
                    title,
                    content,
                    feturedImage,
                    farmName,
                    price,
                    category,}
                  ),
                );
                navigate("/cart")
              }}
            >
              <ShoppingCart size={15} />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
