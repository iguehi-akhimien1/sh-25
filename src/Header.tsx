import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header
    style={{
      backgroundColor: "#28a745",
      color: "white",
      padding: "1rem",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }}
  >
    <h1 style={{ margin: 0, fontFamily: "cursive" }}>🍽️ Budget Bites</h1>
    <nav style={{ marginTop: "1rem" }}>
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        Home
      </Link>
      <Link
        to="/features"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        Features
      </Link>
      <Link
        to="/grocery-list"
        style={{
          color: "white",
          textDecoration: "none",
          margin: "0 1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        Grocery Lists
      </Link>
    </nav>
  </header>
);

export default Header;
