import { point } from "leaflet";
import { useState, useEffect } from "react";

export default function SatelliteList() {
  const [satellites, setSatellites] = useState([]);

  const [hoverStyle, setHoverStyle] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8001/api/satellites")
      .then((res) => res.json())
      .then((data) => {
        console.log(`raw sat data:`, data);
        setSatellites(data.satellites);
      })
      .catch((err) => console.log(`Failed to fetch sat list: ${err}`));
  }, []);

  // this really helped
  //   console.log("🧪 satellites type:", typeof satellites);
  //   console.log("🧪 isArray?", Array.isArray(satellites));
  //   console.log("🧪 satellites value:", satellites);

  return (
    <ul
      style={{
        position: "absolute",
        top: "100px",
        left: "10px",
        width: "150px",
        maxHeight: "300px",
        overflowY: "auto", // enables vertical scrolling
        padding: "10px",
        backgroundColor: "#222121ff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        margin: "0",
        color: "#f9f5f5ff",
        cursor: "pointer",
        zIndex: 1000, // ensures the list stays above the map
      }}>
      List of Satellites below:
      {satellites.slice(0, 20).map((sat, i) => {
        // console.log(JSON.stringify(sat, null, 2));
        return (
          <p
            key={i}
            onMouseEnter={() => setHoverStyle(i)}
            onMouseLeave={() => setHoverStyle(false)}
            style={{ color: hoverStyle === i ? "red" : "" }}>
            {sat.name}
          </p>
        );
      })}
    </ul>
  );
}
