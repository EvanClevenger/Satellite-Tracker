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
        setPosition([latitude, longitude]);
      },
      (err) => console.log(`Geolocation error: ${err}`)
    );
  }, []); // not really going to need this but I have it here anyway just to remeber how to get current location

  const customerIcon = L.icon({
    iconUrl: "../satellite2.png",
    iconSize: [32, 32],
  });

  return (
    <div stlye={{ position: "relative", height: "100%", width: "100%" }}>
      {position ? (
        <>
          <MapContainer
            center={position}
            zoom={10}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker icon={customerIcon} position={position}>
              <Popup> satellite name</Popup>
            </Marker>
          </MapContainer>
          <SatelliteList />
        </> //fragement, used to return multiple elements
      ) : (
        <Spinner />
      )}
    </div>
  );
}
export default App;
