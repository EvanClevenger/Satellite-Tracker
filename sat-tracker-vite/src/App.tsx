import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import Spinner from "./Spinner";
import SatelliteList from "./SatelliteList";
import GlobeMap from "./GlobeMap";

function App() {
  const [position, setPosition] = useState<[number, number, number] | null>(
    null,
  );
  // useState in TS note!
  // when assiging types, dont forget to add default value to the useState, looks a bit different ⬆️

  const [currentSatellite, setCurrentSatellite] = useState({
    info: { satname: "", satid: 0 },
    positions: [{ satlatitude: 0, satlongitude: 0, sataltitude: 0 }],
  });

  const satCoordinates: [number, number, number] = [
    currentSatellite.positions[0].satlatitude,
    currentSatellite.positions[0].satlongitude,
    currentSatellite.positions[0].sataltitude,
  ];

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

  return (
    <>
      <div className="min-h-screen bg-black text-white flex overflow-hidden">
        <aside className="w-[230px] bg-zinc-950/90 border-r border-white/10 p-4 z-[1000]">
          {position && (
            <SatelliteList
              observerPosition={position}
              setCurrentSat={setCurrentSatellite}
            />
          )}
        </aside>
      </div>
      {position ? (
        <GlobeMap
          userPosition={position}
          satCoordinates={satCoordinates}
          satelliteName={currentSatellite.info.satname}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
}
export default App;
