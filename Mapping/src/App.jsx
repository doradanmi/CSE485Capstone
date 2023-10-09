import React, { useState } from "react";
import "./App.css";
import FlightTable from "./FlightTable";
import FlightInputForm from "./FlightInputForm";
import MapBox from "./MapBox";
import TimeSlider from "./TimeSlider";

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
  const [time, setTime] = useState(25250);
  const [flights, setFlights] = useState(
    JSON.parse(JSON.stringify(sampleData))
  );

  function addFlight(flight) {
    setFlights([...flights, flight]);
  }

  return (
    <div className="flex">
      <div className="mx-12">
        <MapBox flights={flights} time={time} />
        <TimeSlider time={time} setTime={setTime} />
      </div>
      <div className="flex flex-col">
        <FlightTable data={flights} />
        <FlightInputForm addFlight={addFlight} />
      </div>
    </div>
  );
}

export default App;
