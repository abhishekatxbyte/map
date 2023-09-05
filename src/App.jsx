import { useEffect, useState } from "react";
import "./App.css";
import { fetchRestaurants, restaurants, status } from "./Api/slice";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Map from "./components/Map";

// import Map from "./components/Map";

function App() {
  const isSuccess = useSelector(status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);
  return (
    <>
      {isSuccess === "success" ? (
        <Map />
      ) : (
        <div className="loader">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </>
  );
}

export default App;
