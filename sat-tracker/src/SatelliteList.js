import { point } from "leaflet";
import { useState, useEffect } from "react";
import "./App.css";

export default function SatelliteList() {
  const [satellites, setSatellites] = useState([]);

  const [hoverStyle, setHoverStyle] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/satellites")
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

  const filteredSatellites = satellites.filter(
    (sat) => sat.name.toLowerCase().includes(search.toLowerCase()) // HAVE to make searched sat name and search to lower case
  );

  return (
    <ul className=" list">
      <input
        className="searchBar"
        placeholder="Search for Satellites here..."
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredSatellites.length === 0 ? (
        <p>Could not find Satellite</p>
      ) : (
        filteredSatellites.map((sat, i) => (
          <p
            key={i}
            onMouseEnter={() => setHoverStyle(i)}
            onMouseLeave={() => setHoverStyle(false)}
            style={{ color: hoverStyle === i ? "red" : "" }}>
            {sat.name}
          </p>
        ))
      )}
    </ul>
  );
}
