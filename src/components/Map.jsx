import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, Circle, MarkerClustererF, MarkerClusterer, Polygon } from "@react-google-maps/api";
import Work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
import restaurants from "./../assets/restaurants.svg";
import ZoneData from "./../Api/TreeData.json"
import { data } from "../Api/data.js";
import Controllers from "./Controllers";
import InfoWindows from "./InfoWindows";
import { haversine } from "./Circle/calculateRadius";
import {
  SET_CURRENT_MARKER,
  TOGGLE_SHOWINFO,
  SET_ACTIVE_MARKER,
  SET_SELECTED_RADIUS,
} from "./../Api/slice";
import { useDispatch, useSelector } from "react-redux";
import TreeSelectComponent from "./TreeSelectComponent/TreeSelectComponent";

const Map = () => {
  const [map, setMap] = useState(null);
  const [activeCircle, setActiveCircle] = useState(null);
  const [catData, setCatData] = useState(data);
  const [circleDataInfo, setCircleDataInfo] = useState(false)
  const selectedRadius = useSelector(state => state.restaurants.selectedRadius)
  const [checkTear, setCheckTear] = useState(false)
  const activeMarker = useSelector(state => state.restaurants.activeMarker)
  const currentMarker = useSelector(state => state.restaurants.currentMarker)

  const [highLightedArea, setHighLightedArea] = useState([

    // Add more polygons if needed
  ])

  const activeArea = useSelector(state => state.restaurants.activeArea)
  const dispatch = useDispatch()
  const [showInfo, setShowInfo] = useState(true)
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
      const distance = haversine(
        activeMarker.position.lat,
        activeMarker.position.lng,
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
    if (!marker.master) {
      return
    }
    dispatch(SET_SELECTED_RADIUS([]))
    dispatch(SET_ACTIVE_MARKER(marker))
    setCircleDataInfo(true)
    setShowInfo(true)
    setCheckTear(false)
    // Create or update the circle when a marker is clicked
    if (showInfo || circleDataInfo) {

      const newCircle = (

        <Circle
          key={marker.title} // Use a unique key based on marker info
          center={marker.position}
          radius={0}
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
      setActiveCircle(newCircle)
    }
  };
  // Close InfoWindow without clearing the selectedRadius
  let hoverTimeout;

  const handleMarkerHover = (marker) => {
    clearTimeout(hoverTimeout); // Clear any existing timeout

    hoverTimeout = setTimeout(() => {
      setShowInfo(true);
      dispatch(SET_CURRENT_MARKER(marker));
    }, 300); // Adjust the delay time (300 milliseconds in this example)
  };

  const handleMarkerOut = (marker) => {
    clearTimeout(hoverTimeout); // Clear the timeout when mouse leaves
    dispatch(SET_CURRENT_MARKER(null));
  };

  // Close InfoWindow without clearing the selectedRadius




  const handleCloseInfoWindow = () => {
    // dispatch(SET_ACTIVE_MARKER(null))
    setShowInfo(false);
    setCircleDataInfo(false)
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
  useEffect(() => {
    if (activeArea) {
      const coordinates = [];
      ZoneData.forEach(zone => {
        const cordinates = []
        if (zone.value === activeArea) {
          if (zone.zoneDetail.coordinates.length > 1) {
            zone.zoneDetail.coordinates.map(cordinatess => {
              cordinates.push(...cordinatess)
            })
            coordinates.push(...cordinates)
          } else {
            coordinates.push(...zone.zoneDetail.coordinates);
          }
        } else {

          zone.children.forEach(circle => {
            const cordinates = []

            if (circle.value === activeArea) {
              circle.children.forEach(ward => {

                if (ward.coordinates.length > 1) {
                  const tempArr = []
                  tempArr.push(...ward.coordinates)
                  const tempAr2 = []
                  cordinates.push(...tempAr2);
                } else {
                  cordinates.push(...ward.coordinates);
                }

              });
            }
            else {
              circle.children.forEach(ward => {
                if (ward.value === activeArea) {
                  coordinates.push(...ward.coordinates);
                }
              });
            }
            coordinates.push(...cordinates)
          });
        }
      });

      function convertCoordinates(inputCoordinates) {
        const outputCoordinates = [];
        for (const [lng, lat] of inputCoordinates) {
          outputCoordinates.push({ lat, lng });
        }
        return outputCoordinates;
      }
      if (coordinates.length > 1) {

        const zoneCordinates = []
        coordinates.map(cordinates => {
          const convertedCoordinates = convertCoordinates(cordinates);
          zoneCordinates.push(convertedCoordinates);
        })
        setHighLightedArea([zoneCordinates]);

      } else {

        const convertedCoordinates = convertCoordinates(...coordinates);
        setHighLightedArea([convertedCoordinates]);
      }
    } else {
      setHighLightedArea([]);
    }

  }, [activeArea]);
  const color_codes = [
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
    "#00FFFF", "#800000", "#008000", "#000080", "#808000",
    "#800080", "#008080", "#C0C0C0", "#808080", "#999999",
    "#FFA07A", "#FA8072", "#E9967A", "#F08080", "#FF6347",
    "#FF4500", "#FFD700", "#DAA520", "#FF8C00", "#FFA500",
    "#FFDAB9", "#FFE4B5", "#FFE4E1", "#F5DEB3", "#FFF8DC",
    "#F0E68C", "#BDB76B", "#ADFF2F", "#7FFF00", "#7CFC00",
    "#008000", "#008080", "#00FFFF", "#4682B4", "#87CEEB",
    "#87CEFA", "#B0C4DE", "#1E90FF", "#6495ED", "#4169E1",
    "#0000CD", "#00008B", "#0000FF", "#8A2BE2", "#9932CC",
    "#9400D3", "#8B008B", "#800080", "#4B0082", "#6A5ACD",
    "#483D8B", "#7B68EE", "#9370DB", "#8B008B", "#9400D3",
    "#9932CC", "#BA55D3", "#800080", "#9370DB", "#DDA0DD",
    "#DA70D6", "#FF00FF", "#FF69B4", "#FF1493", "#FFC0CB",
    "#FFB6C1", "#FFA07A", "#FA8072", "#E9967A", "#D2691E",
    "#CD5C5C", "#DC143C", "#B22222", "#8B0000", "#A52A2A",
    "#A52A2A", "#8B0000", "#B22222", "#DC143C", "#CD5C5C",
    "#D2691E", "#E9967A", "#FA8072", "#FFA07A", "#FFB6C1",
    "#FFC0CB", "#FF1493", "#FF69B4", "#FF00FF", "#DA70D6",
    "#DDA0DD", "#9370DB", "#800080", "#BA55D3", "#9932CC",
    "#9400D3", "#8B008B", "#800080", "#4B0082", "#6A5ACD",
    "#483D8B", "#7B68EE", "#0000FF", "#00008B", "#0000CD",
    "#4169E1", "#6495ED", "#1E90FF", "#B0C4DE", "#87CEFA",
    "#87CEEB", "#4682B4", "#00FFFF", "#008080", "#008000",
    "#7CFC00", "#7FFF00", "#ADFF2F", "#BDB76B", "#F0E68C",
    "#FFF8DC", "#F5DEB3", "#FFE4E1", "#FFE4B5", "#FFDAB9",
    "#FFA500", "#FF8C00", "#FFD700", "#FF4500", "#FF6347",
    "#F08080", "#E9967A", "#FA8072", "#FFA07A", "#0000FF",
    "#00FF00", "#FF0000"
  ]


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
        {tourStops && (
          <MarkerClusterer>
            {() => {

              return (
                <>
                  {tourStops.map((stop, index) => (
                    <Marker
                      key={index}
                      onMouseOver={() => handleMarkerHover(stop)}
                      onMouseOut={() => handleMarkerOut(stop)}
                      onClick={() => handleMarkerClick(stop)}

                      position={stop.position}
                      title={`${stop.title} ${stop.address}`}
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
                        scaledSize: new window.google.maps.Size(30, 35), // Adjust size if needed
                      }}

                    />
                  ))}

                </>
              );
            }}
          </MarkerClusterer>
        )}

        {/* Active Circle */}
        {activeCircle}

        {nearByStop.map((stop, index) => (
          <Marker
            key={index}
            position={stop.position}
            onMouseOver={() => handleMarkerHover(stop)}
            onClick={() => handleMarkerClick(stop)}
            onMouseOut={() => handleMarkerOut(stop)}

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
          />
        ))}
        {/* InfoWindow */}

        {showInfo && currentMarker ? (
          <InfoWindows
            position={currentMarker.position}
            onCloseClick={handleCloseInfoWindow}
            title={currentMarker.title}
            url={currentMarker.url}
            address={currentMarker.address}
            cost={currentMarker.cost}
            cuisine={currentMarker.cuisine}
          />
        ) : <></>
        }
        {showInfo && activeMarker && !currentMarker && circleDataInfo ? (
          <InfoWindows
            position={activeMarker.position}
            onCloseClick={handleCloseInfoWindow}
            title={activeMarker.title}
            url={activeMarker.url}
            address={activeMarker.address}
            cost={activeMarker.cost}
            cuisine={activeMarker.cuisine}
          />
        ) : <></>
        }

        {activeArea && (
          <>
            {highLightedArea.map((polygonCoordinates, index) => {
              if (Array.isArray(...polygonCoordinates)) {

                return polygonCoordinates.map((cordinate, index) => {
                  console.log(cordinate)
                  return (
                    <Polygon
                      key={index}
                      paths={cordinate}
                      options={{
                        strokeColor: '#fff', // Outline color
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillColor: color_codes[index], // Fill color (use the same color as outline)
                        fillOpacity: 0.3,
                      }}
                    />
                  );
                })
              } else {
                return (
                  <Polygon
                    key={index}
                    paths={polygonCoordinates}
                    options={{
                      strokeColor: color_codes[0], // Outline color
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: color_codes[0], // Fill color (use the same color as outline)
                      fillOpacity: 0.3,
                    }}
                  />
                );
              }
            })}
          </>
        )}


        {/* Filters */}
        <Controllers
          activeMarker={activeMarker}
          selectedRadius={selectedRadius}
          setActiveCircle={setActiveCircle}
          checkTear={checkTear} setCheckTear={setCheckTear}
          handleFilterClick={handleFilterClick}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;