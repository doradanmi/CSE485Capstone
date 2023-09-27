import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "./assets/mapbox-gl.css";
import greenPin from "./assets/green-pin.png";
import redPin from "./assets/red-pin.png";

function MapBox({ flights }) {
  return (
    <Map
      initialViewState={{
        longitude: -111.94,
        latitude: 33.4255,
        zoom: 12,
      }}
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: 800, height: 800 }}
    >
      {flights.map((flight, index) => (
        <div key={index}>
          <Marker
            latitude={flight.start.lat}
            longitude={flight.start.long}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <img className="w-10" src={greenPin} />
          </Marker>
          <Marker
            latitude={flight.end.lat}
            longitude={flight.end.long}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <img className="w-10" src={redPin} />
          </Marker>
        </div>
      ))}
    </Map>
  );
}

export default MapBox;
