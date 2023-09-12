import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import Work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
import restaurants from "./../assets/restaurants.svg";

import { data } from "../Api/data.js";
import Controllers from "./Controllers";
import InfoWindows from "./InfoWindows";

const Map = () => {
  // State variables

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const [selectedRadius, setSelectedRadius] = useState(null);
  const [circles, setCircles] = useState([]);
  const [lastActiveMarkerPosition, setLastActiveMarkerPosition] =
    useState(null);

  const [catData, setCatData] = useState(data);
  const [check, setCheck] = useState({
    schools: false,
    entertainment: false,
    offices: false,
  });
  const [mapCenter, setMapCenter] = useState({
    lat: 17.464809,
    lng: 78.4280273,
  });

  // Prepare data for markers
  const masterStop = data.filter((data) => data.restaurant_id ? true : false);
  const tourStops = masterStop.map((item, index) => ({
    position: {
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
    },
    title: item.Name,
    address: item.Full_Address,
    url: item.URL,
    cost: item["Cost for two"] ? item["Cost for two"] : '',
    cat: item.filter_category,
    cuisine:item.Cuisine,
    master: item.restaurant_id ? true : false,
  }));
  function haversine(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadius = 6371000; // Radius of the Earth in meters

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
  }
  const filteredMarkers = catData.filter((marker) => {
    if (activeMarker) {
      //   Calculate the distance between the activeMarker and the current marker
      const distance = haversine(
        activeMarker.position.lat,
        activeMarker.position.lng,
        marker.latitude,
        marker.longitude
      );
      return distance <= selectedRadius && !marker.master;

      // Check if the marker is within the selected radius and does not have the master property
    } else if (lastActiveMarkerPosition) {
      const distance = haversine(
        lastActiveMarkerPosition.lat,
        lastActiveMarkerPosition.lng,
        marker.latitude,
        marker.longitude
      );
      return distance <= selectedRadius && !marker.master;
    }
    return false;
  });
  const nearByStop = filteredMarkers.map((item, index) => ({
    position: {
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
    },
    title: item.Name,
    address: item.Full_Address,
    url: item.URL,
    cat: item.filter_category,
    master: item.master,
  }));

  const handleLoad = (map) => {
    setMap(map);
  };

  // Marker click handler
  const handleMarkerClick = (marker) => {
    setLastActiveMarkerPosition(marker.position);
    setActiveMarker(marker);
  };

  // Close InfoWindow without clearing the selectedRadius
  const handleCloseInfoWindow = () => {
    setActiveMarker(null);
    setTimeout(() => {
      setLastActiveMarkerPosition(null);
    }, 1000);
  };

  // Radius change handler
  const handleRadiusChange = (value) => {
    // Update the selected radius
    setSelectedRadius(value);

    // Define the tear values
    const tearValues = [500, 700, 900, 1000, 2000, 3000];

    // Find the index of the selected tear value
    const selectedIndex = tearValues.indexOf(parseFloat(value));

    // Calculate the number of circles based on the selected index
    const numberOfCircles = selectedIndex + 1;

    // Create an array to hold the Circle components
    const newCircles = [];

    // Generate Circle components and add them to the array
    const circleColors = [
      { strokeColor: "#ff0000", fillColor: "#FFf000" }, // Circle 1 colors
      { strokeColor: "#ff0000", fillColor: "#FFe000" }, // Circle 2 colors
      { strokeColor: "#ff0000", fillColor: "#FFd000" }, // Circle 3 colors
      { strokeColor: "#ff0000", fillColor: "#FFf000" }, // Circle 1 colors
      { strokeColor: "#ff0000", fillColor: "#FFe000" }, // Circle 2 colors
      { strokeColor: "#ff0000", fillColor: "#FFd000" }, // Circle 3 colors
      // Add more colors as needed
    ];

    // Generate Circle components and add them to the array
    for (let i = 0; i < numberOfCircles; i++) {
      newCircles.push(
        <Circle
          key={i}
          center={activeMarker ? activeMarker.position : lastActiveMarkerPosition}
          radius={tearValues[i]} // Use the tear values
          options={{
            strokeColor: circleColors[i].strokeColor, // Set stroke color
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: circleColors[i].fillColor, // Set fill color
            fillOpacity: 0.15,
          }}
        />
      );
    }
    // Update the state to render the circles
    setCircles(newCircles);
  };

  // Filter click handler
  const handleFilterClick = (e) => {
    const key = e.target.value;
    // Create a copy of the previous check state
    const updatedCheck = { ...check };
    updatedCheck[key] = e.target.checked;

    // Find the selected categories
    const selectedCategories = Object.keys(updatedCheck).filter(
      (category) => updatedCheck[category]
    );

    // Filter the data based on selected categories using catData
    let filteredData = data.filter((item) => {
      if (selectedCategories.includes(item.filter_category)) {
        return true;
      }
      return false;
    });

    // If no filters are selected, show all data
    if (selectedCategories.length === 0) {
      filteredData = data;
    }

    // Update the state
    setCheck(updatedCheck);
    setCatData(filteredData);
  };
  console.log(activeMarker)
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMap
        onLoad={handleLoad}
        center={mapCenter} // Use the state variable for center
        zoom={12}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        options={{
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {/* Markers */}
        {tourStops.map((stop, index) => (
          <Marker
            key={index}
            position={stop.position}
            title={stop.title}
            icon={{
              url:
                stop.cat === "restaurants"
                  ? restaurants
                  : stop.cat === "entertainment"
                    ? Entertainment
                    : stop.cat === "offices"
                      ? Work
                      : stop.cat === "schools"
                        ? Educational
                        : restaurants, // Use your custom marker icon
              scaledSize: new window.google.maps.Size(25, 30), // Adjust size if needed
            }}
            onClick={() => handleMarkerClick(stop)}
          />
        ))}

        {/* Radius Circle */}

        {circles}

        {nearByStop.map((stop, index) => (
          <Marker
            key={index}
            position={stop.position}
            title={stop.title}
            icon={{
              url:
                stop.cat === "restaurants"
                  ? restaurants
                  : stop.cat === "entertainment"
                    ? Entertainment
                    : stop.cat === "offices"
                      ? Work
                      : stop.cat === "schools"
                        ? Educational
                        : restaurants, // Use your custom marker icon
              scaledSize: new window.google.maps.Size(25, 30), // Adjust size if needed
            }}
            onClick={() => handleMarkerClick(stop)}
          />
        ))}
        {/* InfoWindow */}
        {activeMarker && (
          <InfoWindows
            position={activeMarker.position}
            onCloseClick={handleCloseInfoWindow}
            title={activeMarker.title}
            url={activeMarker.url}
            address={activeMarker.address}
            cost={activeMarker.cost}
            cuisine={activeMarker.cuisine}
          />
        )}

        {/* Filters */}
        <Controllers
          activeMarker={activeMarker}
          selectedRadius={selectedRadius}
          handleFilterClick={handleFilterClick}
          handleRadiusChange={handleRadiusChange}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;