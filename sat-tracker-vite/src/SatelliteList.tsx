import { useState, useEffect } from "react";
import "./index.css";
import { FixedSizeList as List } from "react-window"; //used for rendering large lists

type SatelliteListProps = {
  observerPosition: [number, number, number];
  setCurrentSat: any;
};

type Satellite = {
  OBJECT_NAME: string;
  NORAD_CAT_ID: number;
};

export default function SatelliteList({
  observerPosition,
  setCurrentSat,
}: SatelliteListProps) {
  // when func paramater is an {}, TS needs the whole object type.
  // in destructuring, observerPosition: means "rename this prop" , not 'give it a type'.

  const [satellites, setSatellites] = useState<Satellite[]>([]);
  // we do useState<Satellite[]>([]); because it is a list, []-> array of satellites

  const [hoverStyle, setHoverStyle] = useState<number | null>(null);

  const [search, setSearch] = useState<string>("");

  const [selected, setSelected] = useState<Satellite | null>(null);

  useEffect(() => {
    const seconds = 180; // 3 min of future data
    //ensures that selected is always up to date, with current selected item

    if (selected) {
      fetch("/frontend/selectedSat", {
        //sending exact params to backend to then fetch data
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tells server we are sending json,this is internal
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
          return res.json(); //parses data from backend
        })
        .then((data) => setCurrentSat(data))
        .catch((err) => console.log(`error connecting to backend: ${err}`));
    }
  }, [selected, observerPosition, setCurrentSat]); // runs after this dependecy is changed ->[selected]

  useEffect(() => {
    try {
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tells server we are sending json,this is internal
        },
        body: JSON.stringify({
          query: `
        query {
          satellites {
            OBJECT_NAME
            NORAD_CAT_ID
          }
        }
      `,
        }),
      })
        .then(async (res) => {
          const text = await res.text();
          //text() reads the request body and returns as a promise with a string
          // console.log("raw response:", text);

          if (!res.ok) {
            throw new Error(`Server responded with ${res.status}: ${text}`);
          }

          if (!text) {
            throw new Error("Empty resonse body from /graphql");
          }

          return JSON.parse(text);
        })
        .then((data) => {
          // console.log("parsed graphql data:", data);
          setSatellites(data.data.satellites);
          // console.log("data from graphql returned");
        });
    } catch (error) {
      console.log(`failed to get graphql data, status:${error}`);
    }
  }, []);

  const filteredSatellites = satellites.filter(
    (sat) => sat.OBJECT_NAME.toLowerCase().includes(search.toLowerCase()), // HAVE to make searched sat name and search to lower case
  );

  return (
    <div className="absolute top-3 left-2.5 w-[215px] h-[800px] overflow-y-auto p-2.5 bg-neutral-900 rounded-xl shadow-lg m-0 text-neutral-50 cursor-pointer z-1000">
      <input
        className="w-full h-5 border-white-200 mb-[8px]"
        placeholder="Search for Satellites here..."
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredSatellites.length === 0 ? (
        <p>Could not find Satellite</p>
      ) : (
        <List
          height={725} // height of scrollable container
          itemCount={filteredSatellites.length}
          itemSize={35} // height of each item
          width={"100%"}>
          {({ index, style }) => {
            const sat = filteredSatellites[index]; // index = current rendered list view
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
