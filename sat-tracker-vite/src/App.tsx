import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Spinner from "./Spinner";
import SatelliteList from "./SatelliteList";

function App() {
  const [position, setPosition] = useState<[number, number, number] | null>(
    null,
  );
  // useState in TS note!
  // when assiging types, dont forget to add default value to the useState, looks a bit different ⬆️

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

  const userLocationIcon: any = L.icon({
    iconUrl: "/person_pin.png",
    iconSize: [32, 32],
  });

  const satelliteIcon: any = L.icon({
    iconUrl: "satellite.png",
    iconSize: [32, 32],
  });

  const satCoordinates: [number, number] = [
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
              <Popup> Your current position</Popup>
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
