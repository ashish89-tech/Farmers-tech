
import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import "./AllPosts.css";
import tomatoImg from "../assets/download.jpeg";
import wheatImg from "../assets/bengan.jpg";
import mangoImg from "../assets/corn.jpeg";

const CATEGORIES = [
  { key: "all",       label: "All",        icon: "🌿" },
  { key: "fruit",     label: "Fruits",     icon: "🍎" },
  { key: "vegetable", label: "Vegetables", icon: "🥦" },
  { key: "cereal",    label: "Cereals",    icon: "🌾" },
  { key: "seed",      label: "Seeds",      icon: "🫘" },
  { key: "plant",     label: "Plants",     icon: "🪴" },
  { key: "spice",     label: "Spices",     icon: "🌶️" },
];

const dummyPosts = [
  {
    $id: "dummy1",
    title: "brinjal",
    content: "Organic farm fresh brinjal.",
    farmName: "Ranjan Farms",
    price: 40,
    category: "vegetable",
    image: wheatImg,
    isDummy: true,
  },

  {
    $id: "dummy2",
    title: "Premium Wheat",
    content: "High quality wheat directly from farmers.",
    farmName: "Green Valley",
    price: 55,
    category: "cereal",
    image: tomatoImg,
    isDummy: true,
  },

  {
    $id: "dummy3",
    title: "Sweet corns",
    content: "Naturally ripened corns.",
    farmName: "Mithapur Farms",
    price: 120,
    category: "fruit",
    image: mangoImg,
    isDummy: true,
  },
];


export default function AllPosts() {
  const [posts, setPosts]         = useState([]);
  const [activecat, setActivecat] = useState("all");

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  const allProducts = [...dummyPosts, ...posts];

  const countFor = (key) =>
    key === "all"
      ? allProducts.length
      : allProducts.filter((p) => p.category === key).length;


const filtered =
  activecat === "all"
    ? allProducts
    : allProducts.filter((p) => p.category === activecat);

  const activeLabel =
    CATEGORIES.find((c) => c.key === activecat)?.label ?? "All";

  return (
    <div className="ap-root">

      {/* ── Hero ── */}
      <div className="ap-hero">
        <div className="ap-eyebrow">
          <span className="ap-dot" />
          Fresh · Daily Updated
        </div>

        <h1 className="ap-title">
          Fresh Produce <span>Marketplace</span>
        </h1>

        <p className="ap-sub">
          Farm-fresh commodities sourced directly from APMC mandis across India
        </p>

        {/* ── Category pills ── */}
        <div className="ap-cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`ap-cat${activecat === cat.key ? " active" : ""}`}
              onClick={() => setActivecat(cat.key)}
            >
              <span className="ap-cat-icon">{cat.icon}</span>
              {cat.label}
              <span className="ap-cat-count">{countFor(cat.key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="ap-body">
        <div className="ap-section-label">{activeLabel} products</div>

        <Container>
          <div className="ap-grid">
            {filtered.length === 0 ? (
              <div className="ap-empty">
                <div className="ap-empty-icon">🌿</div>
                No products in this category yet.
              </div>
            ) : (
              filtered.map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))
            )}
          </div>
        </Container>
      </div>

    </div>
  );
}
export  {dummyPosts};