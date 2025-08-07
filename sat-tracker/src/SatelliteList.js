import { point } from "leaflet";
import { useState } from "react";

export default function SatelliteList() {
  const satellites = ["Satellite 1", "Satellite 2", "Satellite 3"];

  const [hoverStyle, setHoverStyle] = useState(false);

  return (
    <ul
      style={{
        position: "absolute",
        top: "100px",
        left: "10px",
        width: "80px",
        padding: "10px",
        backgroundColor: "#222121ff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        margin: "0",
        color: "#f9f5f5ff",
        cursor: "pointer",
        zIndex: 1000, // ensures the list stays above the map
      }}>
      List of Satellites below
      {satellites.map((sat, i) => (
        <p
          key={i}
          onMouseEnter={() => setHoverStyle(i)}
          onMouseLeave={() => setHoverStyle(false)}
          style={{ color: hoverStyle === i ? "red" : "" }}>
          {sat}
        </p>
      ))}
    </ul>
  );
}
