import { InfoWindow } from "@react-google-maps/api";
import React from "react";

// Memoize the InfoWindow component to prevent unnecessary re-renders
const InfoWindows = React.memo(
  ({ position, onCloseClick, title, address, url, cost, cuisine }) => (
    <InfoWindow position={position} onCloseClick={onCloseClick}>
      <div style={{ width: "200px", display: 'flex', flexDirection: "column", gap: "0.4em" }}>
        <h3>{title}</h3>
        <p>{address}</p>
        <p>{cuisine}</p>

        {/* <p>{cuisine ? <><strong>cuisine : </strong>{cuisine}</> : ""}</p> */}
        <p>{cost ? <>Avg.Cost for 2 people  <strong style={{ color: "green" }}>₹{cost}</strong> </> : <></>}</p>
      </div>
    </InfoWindow>
  )
);

export default InfoWindows;
