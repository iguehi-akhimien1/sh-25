import React, { useState } from "react";

function Message() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && location.trim()) {
      setIsSubmitted(true);
    } else {
      alert("Please enter both your name and location!");
    }
  };

  const handleReset = () => {
    setName("");
    setLocation("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1
          style={{
            fontFamily: "cursive",
            color: "#28a745",
          }}
        >
          Welcome, {name}! 🎉
        </h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          We're excited to serve you in {location}!
        </p>
        <img
          src="/cart.jpg"
          alt="Food-to-go Logo"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "10%",
            objectFit: "cover",
            border: "2px solid #28a745",
            marginTop: "20px",
          }}
        />
        <br />
        <button
          onClick={handleReset}
          style={{
            padding: "15px 30px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#6c757d",
            color: "#fff",
            cursor: "pointer",
            marginTop: "20px",
            fontSize: "16px",
          }}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h1
        style={{
          fontFamily: "cursive",
        }}
      >
        Welcome to Budget Bites!
      </h1>
      <img
        src="/cart.jpg"
        alt="Food-to-go Logo"
        style={{
          width: "250px",
          height: "250px",
          borderRadius: "10%",
          objectFit: "cover",
          border: "2px solid #ccc",
        }}
      />
      <br />
      <input
        id="nameInput"
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "300px",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "40px",
          fontSize: "16px",
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{
          width: "300px",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "20px",
          fontSize: "16px",
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{
          padding: "20px 45px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#28a745",
          color: "#fff",
          cursor: "pointer",
          marginTop: "20px",
          marginLeft: "15px",
          marginBottom: "20px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Message;
