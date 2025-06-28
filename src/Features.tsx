import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      title: "🍕 Wide Menu Selection",
      description:
        "Choose from hundreds of delicious dishes from local restaurants and food trucks.",
    },
    {
      title: "💰 Budget-Friendly Prices",
      description:
        "Special deals and discounts to help you save money while enjoying great food.",
    },
    {
      title: "⚡ Fast Delivery",
      description:
        "Get your food delivered to your doorstep in 30 minutes or less.",
    },
    {
      title: "📍 Location-Based Service",
      description:
        "Find the best food options available in your area with real-time updates.",
    },
    {
      title: "⭐ Customer Reviews",
      description:
        "Read authentic reviews from other customers to make informed decisions.",
    },
    {
      title: "🎁 Loyalty Rewards",
      description:
        "Earn points with every order and redeem them for free meals and discounts.",
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "#28a745",
            fontFamily: "cursive",
            fontSize: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          Why Choose Budget Bites?
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                border: "1px solid #e9ecef",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3
                style={{
                  color: "#28a745",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  fontSize: "1.1rem",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#28a745", marginBottom: "1rem" }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            Join thousands of satisfied customers who love Budget Bites!
          </p>
          <Link
            to="/"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "1rem 2rem",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Start Ordering Now! 🚀
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Features;
