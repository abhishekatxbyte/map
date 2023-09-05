import { InfoWindow } from "@react-google-maps/api";
import React from "react";

// Memoize the InfoWindow component to prevent unnecessary re-renders
const InfoWindows = React.memo(
  ({ position, onCloseClick, title, address, url }) => (
    <InfoWindow position={position} onCloseClick={onCloseClick}>
      <div style={{ width: "200px" }}>
        <h2>{title}</h2>
        <p>{address}</p>
        <a href={url}></a>
      </div>
    </InfoWindow>
  )
);

export default InfoWindows;
