function Message() {
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
        style={{
          width: "300px",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "40px",
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your location..."
        style={{
          width: "300px",
          padding: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "40px",
        }}
      />
      <br />
      <button
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
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Message;
