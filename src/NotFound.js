import React from "react";
import { fontSize } from "@material-ui/system";

export default () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "pink",
      color: "purple",
      fontSize: "5vw",
      margin: "auto"
    }}
  >
    <h1>Page not found!</h1>
    <p style={{ color: "#333", fontSize: "12px" }}>
      This URL doesn't exist:{" "}
      <u>
        <em style={{ color: "red" }}>{window.location.href}</em>
      </u>
    </p>
  </div>
);
