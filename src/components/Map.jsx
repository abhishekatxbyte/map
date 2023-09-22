import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import Work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
import restaurants from "./../assets/restaurants.svg";

import { data } from "../Api/data.js";
import Controllers from "./Controllers";
import InfoWindows from "./InfoWindows";
import { haversine } from "./calculateRadius";

const Map = () => {
  // State variables

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoverData, setHoverData] = useState(false)
  const [selectedRadius, setSelectedRadius] = useState([]);
  const [circles, setCircles] = useState([]);
  const [activeCircle, setActiveCircle] = useState(null);
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
    cuisine: item.Cuisine,
    master: item.restaurant_id ? true : false,
  }));


  const filteredMarkers = catData.filter((marker) => {
    if (activeMarker) {
      // Calculate the distance between the activeMarker and the current marker
      const distance = haversine(
        activeMarker.position.lat,
        activeMarker.position.lng,
        marker.latitude,
        marker.longitude
      );

      // Check if the marker is within any of the selected radii and does not have the master property
      return selectedRadius.some((radius) => distance <= radius) && !marker.master;
    } else if (lastActiveMarkerPosition) {
      const distance = haversine(
        lastActiveMarkerPosition.lat,
        lastActiveMarkerPosition.lng,
        marker.latitude,
        marker.longitude
      );

      // Check if the marker is within any of the selected radii and does not have the master property
      return selectedRadius.some((radius) => distance <= radius) && !marker.master;
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
    if (!hoverData) {
      setSelectedRadius([])
      setLastActiveMarkerPosition(marker.position);
      setActiveMarker(marker);

      // Create or update the circle when a marker is clicked
      const newCircle = (
        <Circle
          key={marker.title} // Use a unique key based on marker info
          center={marker.position}
          radius={selectedRadius}
          options={{
            strokeColor: "#ff0000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#FFf000",
            fillOpacity: 0.15,
          }}
        />
      );

      // Set the active circle
      setActiveCircle(newCircle);
    } else {
      //       setLastActiveMarkerPosition(marker.position);
      //  const newCircle = (
      //         <Circle
      //           key={marker.title} // Use a unique key based on marker info
      //           center={marker.position}
      //           radius={selectedRadius}
      //           options={{
      //             strokeColor: "#ff0000",
      //             strokeOpacity: 0.8,
      //             strokeWeight: 1,
      //             fillColor: "#FFf000",
      //             fillOpacity: 0.15,
      //           }}
      //         />
      //       );

      //       // Set the active circle
      //       setActiveCircle(newCircle);
      return
    }
  };
  // Close InfoWindow without clearing the selectedRadius

  console.log(activeCircle)
  const handleRadiusChange = (value) => {

    setSelectedRadius((prev) => {
      const uniqueValues = new Set(prev);

      if (uniqueValues.has(value)) {
        uniqueValues.delete(value);
      } else {
        uniqueValues.add(value);
      }

      const selectedRadiusArray = [...uniqueValues];

      // Update the active circles here using selectedRadiusArray
      const newCircles = generateCircles(selectedRadiusArray);

      // Set the activeCircle state with the new circles
      setActiveCircle(newCircles);

      return selectedRadiusArray;
    });
  };

  const generateCircles = (selectedRadiusArray) => {
    const circleColors = [
      { strokeColor: "#ff0000", fillColor: "#FFf000" },
      { strokeColor: "#ff0000", fillColor: "#FFe000" },
      { strokeColor: "#ff0000", fillColor: "#FFd000" },
      { strokeColor: "#ff0000", fillColor: "#FFf000" },
      { strokeColor: "#ff0000", fillColor: "#FFe000" },
      { strokeColor: "#ff0000", fillColor: "#FFd000" },
    ];

    const newCircles = selectedRadiusArray.map((radius, index) => (
      <Circle
        key={index}
        center={activeMarker ? activeMarker.position : lastActiveMarkerPosition}
        radius={radius}
        options={{
          strokeColor: circleColors[index].strokeColor,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: circleColors[index].fillColor,
          fillOpacity: 0.15,
        }}
      />
    ));

    return newCircles;
  };
  const handleCloseInfoWindow = () => {
    setActiveMarker(null);
    setHoverData(false)
    setTimeout(() => {
      setLastActiveMarkerPosition(null);
      setActiveCircle(null); // Clear the active circle
    }, 2000);
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
            onMouseOver={function () {
              handleMarkerClick(stop)
            }}
            onMouseOut={() => {
              // handleMarkerClick(stop)
            }}
            position={stop.position}
            title={`${stop.title} ${<br />} ${stop.address}`}
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
            onClick={() => { handleMarkerClick(stop), setHoverData(true) }}
          />
        ))}

        {/* Active Circle */}
        {activeCircle}

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