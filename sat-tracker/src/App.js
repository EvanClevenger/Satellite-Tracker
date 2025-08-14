import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";
import Spinner from "./Spinner";
import SatelliteList from "./SatelliteList";

function App() {
  const [position, setPosition] = useState();
  const [currentSatellite, setCurrentSatellite] = useState();

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

  console.log(currentSatellite);

  const customerIcon = L.icon({
    iconUrl: "../pin.png",
    iconSize: [32, 32],
  });

  const satelliteIcon = L.icon({
    iconUrl: "../satellite2.png",
    iconSize: [32, 32],
  });

  const satCoordinates = [
    currentSatellite.positions[0].satlatitude,
    currentSatellite.positions[0].satlongitude,
  ];

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {position ? (
        <>
          <MapContainer
            center={position}
            zoom={3}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker icon={customerIcon} position={position}>
              <Popup> You'r current position</Popup>
            </Marker>
            <Marker icon={satelliteIcon} position={satCoordinates}>
              <Popup> {currentSatellite.info.satname}</Popup>
            </Marker>
          </MapContainer>
          <SatelliteList
            observerPosition={position} /* passing position props */
            setCurrentSat={setCurrentSatellite}
          />
        </> //fragement, used to return multiple elements
      ) : (
        <Spinner />
      )}
    </div>
  );
}
export default App;
