import React from "react";
import style from "./map.module.css";
import work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
const Controllers = ({
  selectedRadius,
  handleRadiusChange,
  handleFilterClick,
}) => {
  return (
    <div className={style.filters}>
      <div className={style.tearFilter}>
        <div className={style.tears}>
          <input
            type="radio"
            id="vehicle1"
            name="radius"
            value="1000"
            onChange={() => handleRadiusChange(1000)}
            checked={selectedRadius === 1000}
          />
          <label htmlFor="vehicle1">Tear 1 = 1 KM</label>
        </div>
        <div className={style.tears}>
          <input
            type="radio"
            id="vehicle2"
            name="radius"
            value="2000"
            onChange={() => handleRadiusChange(2000)}
            checked={selectedRadius === 2000}
          />
          <label htmlFor="vehicle2">Tear 2 = 2 KM</label>
        </div>

        <div className={style.tears}>
          <input
            type="radio"
            id="vehicle3"
            name="radius"
            value="3000"
            onChange={() => handleRadiusChange(3000)}
            checked={selectedRadius === 3000}
          />
          <label htmlFor="vehicle3">Tear 3 = 3 KM</label>
        </div>
      </div>

      <div className={style.placeFilter}>
        <div className={style.places}>
          <img src={Educational} className={style.marker} />
          <div className={style.filter}>
            <input
              type="checkbox"
              value="schools"
              onChange={(e) => handleFilterClick(e)}
            />
            <label htmlFor="Educational">Educational Institutions</label>
          </div>
        </div>
        <div className={style.places}>
          <img src={work} className={style.marker} />
          <div className={style.filter}>
            <input
              type="checkbox"
              value="offices"
              onChange={(e) => handleFilterClick(e)}
            />
            <label htmlFor="Work"> Work Places</label>
          </div>
        </div>
        <div className={style.places}>
          <img src={Entertainment} className={style.marker} />

          <div className={style.filter}>
            <input
              type="checkbox"
              value="entertainment"
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
