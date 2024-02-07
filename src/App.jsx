import { useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Map from "./components/Map";

// import Map from "./components/Map";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCitlC9vWcZK-jT-MrRslfm1K4B44dFN0o", // Add your API key here
  });

  return <>{isLoaded ? <Map /> : <>loading</>}</>;
}

export default App;
