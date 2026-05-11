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
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      {/* Satellite List */}
      <aside className="w-[230px] bg-zinc-950/90 border-r border-white/10 p-4 z-[1000]">
        {position && (
          <SatelliteList
            observerPosition={position}
            setCurrentSat={setCurrentSatellite}
          />
        )}
      </aside>

      {/* Space / Globe area */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* stars */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:45px_45px] opacity-20" />

        <div className="relative w-[600px] h-[600px] rounded-full overflow-hidden border border-blue-300/30 shadow-[0_0_100px_rgba(59,130,246,0.7)]">
          {/* atmosphere overlay */}
          <div className="pointer-events-none absolute inset-0 z-[500] rounded-full shadow-[inset_-60px_-30px_90px_rgba(0,0,0,0.75),inset_30px_20px_60px_rgba(147,197,253,0.25)]" />

          {position ? (
            <MapContainer
              center={position}
              zoom={2}
              minZoom={2}
              maxZoom={5}
              scrollWheelZoom={true}
              className="h-full w-full scale-125"
              zoomControl={false}
              attributionControl={false}
              worldCopyJump={false}
              maxBounds={[
                [-85, -200],
                [85, 180],
              ]}
              maxBoundsViscosity={1.0}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                noWrap={true}
                bounds={[
                  [-85, -180],
                  [85, 180],
                ]}
              />

              <Marker icon={userLocationIcon} position={position}>
                <Popup>Your current position</Popup>
              </Marker>

              <Marker icon={satelliteIcon} position={satCoordinates}>
                <Popup>{currentSatellite.info.satname}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Spinner />
          )}
        </div>
      </main>
    </div>
  );
}
export default App;
