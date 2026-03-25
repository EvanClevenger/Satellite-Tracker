import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import L from "leaflet";
import Spinner from "./Spinner";
import SatelliteList from "./SatelliteList";
// import { useMap } from "react-leaflet";

function App() {
  const [position, setPosition] = useState<[number, number, number]>;
  const [currentSatellite, setCurrentSatellite] = useState({
    info: { satname: "", satid: 0 },
    positions: [{ satlatitude: 0, satlongitude: 0 }],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const altitude = 100; // cannot get alt so we harcoding it
        setPosition([latitude, longitude, altitude]);
      },
      (err) => console.log(`Geolocation error: ${err}`),
    );
  }, []); // on page load

  // console.log(currentSatellite);

  const userLocationIcon = L.icon({
    iconUrl: `${process.env.PUBLIC_URL}/pin.png`,
    iconSize: [32, 32],
  });
  // we have to use "process.env.PUBLIC_URL", once in production the app is served from (ref json) "homepage" : http://localhost:3000/Satellite-Tracker instead of just the root ('/'), this happens after npm build

  const satelliteIcon = L.icon({
    iconUrl: `${process.env.PUBLIC_URL}/satellite2.png`,
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
            <Marker icon={userLocationIcon} position={position}>
              <Popup> User Position</Popup>
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
