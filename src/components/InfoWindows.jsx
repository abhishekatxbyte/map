import { InfoWindow } from "@react-google-maps/api";
import React from "react";

// Memoize the InfoWindow component to prevent unnecessary re-renders
const InfoWindows = React.memo(
  ({ position, onCloseClick, title, address, url, cost, cuisine, population, activeWard }) => (
    <InfoWindow position={position} onCloseClick={onCloseClick} options={{ pixelOffset: new window.google.maps.Size(0, -30) }} >
      <div style={{ width: "200px", display: 'flex', flexDirection: "column", gap: "0.4em" }}>
        <h3>{title}</h3>
        <p>{address}</p>
        <p>{cuisine}</p>
        <h3>{activeWard ? population ? `Population Count : ${population}` : "Population Count : N/A" : ""}</h3>
        {/* <p>{cuisine ? <><strong>cuisine : </strong>{cuisine}</> : ""}</p> */}
        <p>{cost ? <>Avg.Cost for 2 people  <strong style={{ color: "green" }}>₹{cost}</strong> </> : <></>}</p>
      </div>
    </InfoWindow>
  )
);

export default InfoWindows;