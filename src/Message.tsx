import { useState } from "react";

function List() {
  const [name, setName] = useState("");
  return (
    <div>
      <h1
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // horizontal
          justifyContent: "center", // vertical
          height: "100vh",
        }}
      >
        Welcome to Food-to-go!
      </h1>
    </div>
  );
}

export default List;
