import React from "react";
import style from "./map.module.css";
import work from "./../assets/work.svg";
import Entertainment from "./../assets/Entertainment.svg";
import Educational from "./../assets/Educational.svg";
const Controllers = ({
  selectedRadius,
  handleRadiusChange,
  handleFilterClick,
  activeMarker
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
            disabled={activeMarker ? false : true}
            style={{
              cursor: !activeMarker ? "not-allowed" : 'default'

            }}
            checked={activeMarker?selectedRadius === 1000 : null}
          />
          <label htmlFor="vehicle1">Tear 1 = 1 KM</label>
        </div>
        <div className={style.tears}>
          <input
            type="radio"
            id="vehicle2"
            name="radius"
            value="2000" disabled={activeMarker ? false : true}
            style={{
              cursor: !activeMarker ? "not-allowed" : 'default'

            }}
            onChange={() => handleRadiusChange(2000)}
            checked={activeMarker?selectedRadius === 2000 : null}

          />
          <label htmlFor="vehicle2">Tear 2 = 2 KM</label>
        </div>

        <div className={style.tears}>
          <input
            type="radio"
            id="vehicle3"
            name="radius" disabled={activeMarker ? false : true}
            style={{
              cursor: !activeMarker ? "not-allowed" : 'default'

            }}
            value="3000"
            onChange={() => handleRadiusChange(3000)}
            checked={activeMarker?selectedRadius === 3000 : null}

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
              value="schools" disabled={activeMarker ? false : true}
              style={{
                cursor: !activeMarker ? "not-allowed" : 'default'

              }}
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
              value="offices" disabled={activeMarker ? false : true}
              style={{
                cursor: !activeMarker ? "not-allowed" : 'default'

              }}
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
              value="entertainment" disabled={activeMarker ? false : true}
              style={{
                cursor: !activeMarker ? "not-allowed" : 'default'

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
