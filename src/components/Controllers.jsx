import React, { useEffect, useState } from "react";
import style from "./map.module.css";
import work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_RADIUS } from "../Api/slice";
import { Circle } from "@react-google-maps/api";

const Controllers = ({
  handleFilterClick,
  setActiveCircle,
  setCheckTear,
  checkTear
}) => {
  const selectedRadius = useSelector(state => state.restaurants.selectedRadius)
  const activeMarker = useSelector(state => state.restaurants.activeMarker)
  const currentMarker = useSelector(state => state.restaurants.currentMarker)
  const dispatch = useDispatch()
  // Define an array of Tier values

  const generateCircles = (selectedRadiusArray, activeMarker) => {
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
        center={activeMarker ? activeMarker.position : currentMarker.position}
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


  const handleRadiusChange = (value, activeMarker) => {
    setCheckTear(true)
    const changed_radius = (prev) => {
      const uniqueValues = new Set(prev);

      if (uniqueValues.has(value)) {
        uniqueValues.delete(value);
      } else {
        uniqueValues.add(value);
      }

      const selectedRadius = [...uniqueValues];

      // Update the active circles here using selectedRadiusArray
      const newCircles = generateCircles(selectedRadius, activeMarker);

      // Set the activeCircle state with the new circles
      setActiveCircle(newCircles)

      return selectedRadius;
    }
    const newselectedRadius = changed_radius(selectedRadius)
    dispatch(SET_SELECTED_RADIUS(newselectedRadius))
  };

  // Check if selectedRadius is empty
  const isRadiusEmpty = selectedRadius.length === 0;


  return (
    <div className={style.filters}>
      <div className={style.TierFilter}>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            name="radius"
            value="500"
            onChange={() => handleRadiusChange(500, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(500)}
          />
          <label htmlFor="vehicle1">Tier 1 = 500 mts</label>
        </div>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            name="radius"
            value="700"
            onChange={() => handleRadiusChange(700, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(700)}
          />
          <label htmlFor="vehicle2">Tier 2 = 700 mts</label>
        </div>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            name="radius"
            value="900"
            onChange={() => handleRadiusChange(900, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(900)}
          />
          <label htmlFor="vehicle3">Tier 3 = 900 mts</label>
        </div>
      </div>
      <div className={style.TierFilter}>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            id="vehicle1"
            name="radius"
            value="1000"
            onChange={() => handleRadiusChange(1000, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(1000)}
          />
          <label htmlFor="vehicle1">Tier 1 = 1 KM</label>
        </div>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            id="vehicle2"
            name="radius"
            value="2000"
            onChange={() => handleRadiusChange(2000, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(2000)}
          />
          <label htmlFor="vehicle2">Tier 2 = 2 KM</label>
        </div>
        <div className={style.Tiers}>
          <input
            type="checkbox"
            id="vehicle3"
            name="radius"
            value="3000"
            onChange={() => handleRadiusChange(3000, activeMarker)}
            disabled={!activeMarker}
            style={{
              cursor: !activeMarker ? "not-allowed" : "default",
            }}
            checked={!isRadiusEmpty && selectedRadius.includes(3000)}
          />
          <label htmlFor="vehicle3">Tier 3 = 3 KM</label>
        </div>
      </div>
      <div className={style.placeFilter}>
        <div className={style.places}>
          <img src={Educational} alt="Educational" className={style.marker} />
          <div className={style.filter}>
            <input
              type="checkbox"
              value="schools"
              disabled={!activeMarker}
              style={{
                cursor: !activeMarker ? "not-allowed" : "default",
              }}
              onChange={(e) => handleFilterClick(e)}
            />
            <label htmlFor="Educational">Educational Institutions</label>
          </div>
        </div>
        <div className={style.places}>
          <img src={work} alt="Work" className={style.marker} />
          <div className={style.filter}>
            <input
              type="checkbox"
              value="offices"
              disabled={!activeMarker}
              style={{
                cursor: !activeMarker ? "not-allowed" : "default",
              }}
              onChange={(e) => handleFilterClick(e)}
            />
            <label htmlFor="Work"> Work Places</label>
          </div>
        </div>
        <div className={style.places}>
          <img
            src={Entertainment}
            alt="Entertainment"
            className={style.marker}
          />
          <div className={style.filter}>
            <input
              type="checkbox"
              value="entertainment"
              disabled={!activeMarker}
              style={{
                cursor: !activeMarker ? "not-allowed" : "default",
              }}
              onChange={(e) => handleFilterClick(e)}
            />
            <label htmlFor="Entertainment"> Entertainment</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controllers