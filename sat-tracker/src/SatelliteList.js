export default function SatelliteList() {
  const satellites = ["Satellite 1", "Satellite 2", "Satellite 3"];
  return (
    <ul
      style={{
        position: "absolute",
        top: "100px",
        left: "10px",
        width: "80px",
        padding: "10px",
        backgroundColor: "#222121ff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        margin: "0",
        color: "red",
        zIndex: 1000, // ensures the list stays above the map
      }}>
      List of Satellites below
      {satellites.map((sat, i) => (
        <p key={i}>{sat}</p>
      ))}
    </ul>
  );
}
