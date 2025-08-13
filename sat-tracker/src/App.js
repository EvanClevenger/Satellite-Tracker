import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";
import Spinner from "./Spinner";
import SatelliteList from "./SatelliteList";

function App() {
  const [position, setPosition] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const altitude = 100; // cannot get alt so we harcoding it
        setPosition([latitude, longitude, altitude]);
      },
      (err) => console.log(`Geolocation error: ${err}`)
    );
  }, []); // on page load

  const customerIcon = L.icon({
    iconUrl: "../pin.png",
    iconSize: [32, 32],
  });

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {position ? (
        <>
          <MapContainer
            center={position}
            zoom={2.5}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker icon={customerIcon} position={position}>
              <Popup> satellite name</Popup>
            </Marker>
          </MapContainer>
          <SatelliteList
            observerPosition={position} /* passing position props */
          />
        </> //fragement, used to return multiple elements
      ) : (
        <Spinner />
      )}
    </div>
  );
}
export default App;
