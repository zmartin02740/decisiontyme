import React from "react";
import "./Footer";

export default () => {
  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        bottom: "0",
        left: "0",
        padding: "1rem",
        backgroundColor: "#6e2d84",
        textAlign: "center",
        color: "white"
      }}
    >
      <footer>Copyright &copy; {new Date().getFullYear()} DecisionTyme</footer>
    </div>
  );
};
