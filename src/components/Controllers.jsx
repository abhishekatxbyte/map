import React from "react";
import style from "./map.module.css";
import work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
import { handleRadiusChange } from "./Circle/calculateRadius";

const Controllers = ({
  selectedRadius,
  handleFilterClick,
  setActiveCircle,
  setSelectedRadius,
  activeMarker,
}) => {
  // Define an array of Tier values
  const tierValues = [500, 700, 900, 1000, 2000, 3000];

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
            onChange={() => handleRadiusChange(500, setSelectedRadius, setActiveCircle, activeMarker)}
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
            onChange={() => handleRadiusChange(700, setSelectedRadius, setActiveCircle, activeMarker)}
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
            onChange={() => handleRadiusChange(900, setSelectedRadius, setActiveCircle, activeMarker)}
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
            onChange={() => handleRadiusChange(1000, setSelectedRadius, setActiveCircle, activeMarker)}
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
            onChange={() => handleRadiusChange(2000, setSelectedRadius, setActiveCircle, activeMarker)}
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
            onChange={() => handleRadiusChange(3000, setSelectedRadius, setActiveCircle, activeMarker)}
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

export default Controllers;
