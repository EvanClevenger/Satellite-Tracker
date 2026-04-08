// import { point } from "leaflet";
import { useState, useEffect } from "react";
import "./App.css";
import { FixedSizeList as List } from "react-window"; //used for rendering large lists

type SatelliteListProps = {
  observerPosition: [number, number, number];
  setCurrentSat: any;
};

type Satellite = {
  OBJECT_NAME: string;
  NORAD_CAT_ID: number;
};

// type SatelliteRowProps = {
//   satellites: Satellite[];
//   hoveredIndex: number | null;
//   setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
//   setSelected: React.Dispatch<React.SetStateAction<Satellite | null>>;
// };

export default function SatelliteList({
  observerPosition,
  setCurrentSat,
}: SatelliteListProps) {
  // when func paramater is an {}, TS needs the whole object type.
  // in destructuring, observerPosition: means "rename this prop" , not 'give it a type'.

  const [satellites, setSatellites] = useState<Satellite[]>([]);
  // we do useState<Satellite[]>([]); because it is a list, []-> array of satellites

  const [hoverStyle, setHoverStyle] = useState<boolean>(false);

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

  // useEffect(() => {
  //   fetch("/graphql")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSatellites(data);
  //     })

  //     .catch((err) => console.log(`Failed to fetch static sat list: ${err}`));
  // }, []); // fetches static sat info from data/satList.json, we want to add gql here.  OLD!!

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
          console.log("status", res.status);
          console.log("content-type:", res.headers.get("content-type"));

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
          console.log("parsed graphql data:", data);
          setSatellites(data.data.satellites);
          console.log("data from graphql returned");
        });
      // .then((res) => res.json())
      // .then((data) => {
      //   setSatellites(data.data.satellites); // note the nested structure
      //   console.log("data from graphql returned");
      // });
    } catch (error) {
      console.log(`failed to get graphql data, status:${error}`);
    }
  }, []);

  // console.log(selected);

  const filteredSatellites = satellites.filter(
    (sat) => sat.OBJECT_NAME.toLowerCase().includes(search.toLowerCase()), // HAVE to make searched sat name and search to lower case
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
                onMouseLeave={() => setHoverStyle(false)}
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
