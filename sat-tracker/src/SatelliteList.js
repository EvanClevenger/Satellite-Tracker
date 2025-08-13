import { point } from "leaflet";
import { useState, useEffect } from "react";
import "./App.css";
import { FixedSizeList as List } from "react-window"; //used for rendering large lists

export default function SatelliteList({ observerPosition }) {
  // observerPosition being sent as {[]}, destructure nessasary
  const [satellites, setSatellites] = useState([]);

  const [hoverStyle, setHoverStyle] = useState(false);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState(null);
  //   console.log(observerPosition);

  useEffect(() => {
    const seconds = 180; // 3 min of future data
    //ensures that selected is always up to date, with current selected item

    if (selected) {
      fetch("/frontend/selectedSat", {
        //sending exact params to backend to then fetch data
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selected.NORAD_CAT_ID,
          observer_lat: observerPosition[0],
          observer_lng: observerPosition[1],
          observer_alt: observerPosition[2],
          seconds: seconds,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Server resonded with ${res.status}`);
          return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(`error connecting to backend: ${err}`));
    }
  }, [selected, observerPosition]); // runs after this dependecy is changed ->[selected]

  useEffect(() => {
    fetch("/api/staticSatelliteList")
      .then((res) => res.json())
      .then((data) => {
        // console.log(`raw sat data:`, data);
        setSatellites(data);
      })
      .catch((err) => console.log(`Failed to fetch sat list: ${err}`));
  }, []);

  //   console.log({ satellites });

  // this really helped
  //   console.log("🧪 satellites type:", typeof satellites);
  //   console.log("🧪 isArray?", Array.isArray(satellites));
  //   console.log("🧪 satellites value:", satellites);

  const filteredSatellites = satellites.filter(
    (sat) => sat.OBJECT_NAME.toLowerCase().includes(search.toLowerCase()) // HAVE to make searched sat name and search to lower case
  );

  return (
    <div className=" list">
      <input
        className="searchBar"
        placeholder="Search for Satellites here..."
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredSatellites.length === 0 ? (
        <p>Could not find Satellite</p>
      ) : (
        <List
          height={600} // height of scrollable container
          itemCount={filteredSatellites.length}
          itemSize={35} // height of each item
          width={"100%"}>
          {({ index, style }) => {
            const sat = filteredSatellites[index];
            return (
              <p
                key={index}
                style={{
                  ...style,
                  padding: "5px",
                  color: hoverStyle === index ? "red" : "",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoverStyle(index)}
                onMouseLeave={() => setHoverStyle(null)}
                onClick={() => {
                  setSelected(sat);
                }}>
                {sat.OBJECT_NAME}
              </p>
            );
          }}
        </List>
      )}
    </div>
  );
}
