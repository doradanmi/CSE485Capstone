 import React, { useState } from "react";

function FlightInputForm({ addFlight }) {
  const initialFlightData = {
    flightNumber: "",
    startLong: "",
    startLat: "",
    endLong: "",
    endLat: "",
    startTime: "",
    altitude: "",
    speed: "",
  };

  const [flightData, setFlightData] = useState(initialFlightData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlight(flightData);
    setFlightData(initialFlightData);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-6 my-12">
      <div className="flex mb-3">
        <div className="mr-2">
          <label className="block mb-1">Flight Number:</label>
          <input
            type="text"
            name="flightNumber"
            value={flightData.flightNumber}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Start Time:</label>
          <input
            type="text"
            name="startTime"
            value={flightData.startTime}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex mb-3">
        <div className="mr-2">
          <label className="block mb-1">Start Longitude:</label>
          <input
            type="text"
            name="startLong"
            value={flightData.startLong}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Start Latitude:</label>
          <input
            type="text"
            name="startLat"
            value={flightData.startLat}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex mb-3">
        <div className="mr-2">
          <label className="block mb-1">End Longitude:</label>
          <input
            type="text"
            name="endLong"
            value={flightData.endLong}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">End Latitude:</label>
          <input
            type="text"
            name="endLat"
            value={flightData.endLat}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      <div className="flex mb-3">
        <div className="mr-2">
          <label className="block mb-1">Altitude:</label>
          <input
            type="text"
            name="altitude"
            value={flightData.altitude}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Speed:</label>
          <input
            type="text"
            name="speed"
            value={flightData.speed}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Flight
      </button>
    </form>
  );
}

export default FlightInputForm;
