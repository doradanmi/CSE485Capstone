import { useState } from "react";
import "./App.css";
import Map from "react-map-gl";
import { useTable } from "react-table";
import FlightTable from "./FlightTable";

const sampleData = [
  {
    start: { long: -111.94, lat: 33.4255 },
    end: { long: -112.94, lat: 34.4255 },
    flightNumber: "UA712",
    startTime: 25200,
    altitude: 600,
    speed: 20,
  },
  {
    start: { long: -112.04, lat: 33.5382 },
    end: { long: -111.78, lat: 33.715 },
    flightNumber: "AA123",
    startTime: 28800,
    altitude: 800,
    speed: 25,
  },
  {
    start: { long: -112.05, lat: 33.4398 },
    end: { long: -112.12, lat: 33.5502 },
    flightNumber: "DL456",
    startTime: 32400,
    altitude: 700,
    speed: 18,
  },
];

function App() {
  const [flights, setFlights] = useState(
    JSON.parse(JSON.stringify(sampleData))
  );
  

  
  return (
   
    <div className="flex">
      <FlightTable data={flights}/>
      {/* <InputForm setFlights={setFlights} /> */}
      <div className="mx-12">
        <Map
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: -111.94,
            latitude: 33.4255,
            zoom: 12,
          }}
          style={{ width: 800, height: 800 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>
    </div>
  );
}

export default App;
