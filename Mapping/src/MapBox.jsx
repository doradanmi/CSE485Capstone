import React, { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "./assets/mapbox-gl.css";
import greenPin from "./assets/green-pin.png";
import redPin from "./assets/red-pin.png";
import drone from "./assets/drone.png";

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

function getDistance(lat1, long1, lat2, long2) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLong = deg2rad(long2 - long1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLong / 2) *
			Math.sin(dLong / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in km
	return distance;
}

function MapBox({ flights, time }) {
	const [dronePositions, setDronePositions] = useState([]);

	useEffect(() => {
		// Calculate drone positions and rotations based on the given time
		const newDronePositions = flights.map((flight) => {
			const { start, end, speed } = flight;
			const distance = getDistance(
				start.lat,
				start.long,
				end.lat,
				end.long
			);
			const totalDuration = distance / speed;
			const elapsedDuration = (time - flight.startTime) / 1000; // Convert to seconds
			const progress = elapsedDuration / totalDuration;
			if (progress < 0 || progress > 1) {
				return null;
			}
			const lat = start.lat + (end.lat - start.lat) * progress;
			const long = start.long + (end.long - start.long) * progress;
			const rotation =
				Math.atan2(end.lat - start.lat, end.long - start.long) *
				(180 / Math.PI);
			return { lat, long, rotation };
		});

		setDronePositions(
			newDronePositions.filter((position) => position !== null)
		);
	}, [flights, time]);

	return (
		<Map
			initialViewState={{
				longitude: -111.94,
				latitude: 33.4255,
				zoom: 9,
			}}
			mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
			mapStyle="mapbox://styles/mapbox/streets-v9"
			style={{ width: 600, height: 600 }}
		>
			{flights.map((flight, index) => (
				<div key={index}>
					<Source
						id={`line-${index}`}
						type="geojson"
						data={{
							type: "Feature",
							geometry: {
								type: "LineString",
								coordinates: [
									[flight.start.long, flight.start.lat],
									[flight.end.long, flight.end.lat],
								],
							},
						}}
					>
						<Layer
							id={`line-${index}`}
							type="line"
							paint={{
								"line-color": "#1742cf",
								"line-width": 1,
								"line-opacity": 0.8,
							}}
						/>
					</Source>
					<Marker
						latitude={flight.start.lat}
						longitude={flight.start.long}
						offsetTop={-50}
						offsetLeft={-25}
					>
						<img className="w-8" src={greenPin} />
					</Marker>
					<Marker
						latitude={flight.end.lat}
						longitude={flight.end.long}
						offsetTop={-50}
						offsetLeft={-25}
					>
						<img className="w-8" src={redPin} />
					</Marker>
				</div>
			))}
			{dronePositions.map((dronePosition, index) => (
				<div key={index}>
					<Marker
						latitude={dronePosition.lat}
						longitude={dronePosition.long}
					>
						<img
							className="w-6"
							src={drone}
							style={{
								transform: `rotate(${dronePosition.rotation}deg)`,
							}}
						/>
					</Marker>
					<Source
						id={`geofence-${index}`}
						type="geojson"
						data={{
							type: "Feature",
							geometry: {
								type: "Point",
								coordinates: [
									dronePosition.long,
									dronePosition.lat,
								],
							},
							properties: {
								radius: 3000,
							},
						}}
					>
						<Layer
							id={`geofence-${index}`}
							type="circle"
							paint={{
								"circle-color": "#68b9de",
								"circle-opacity": 0.3,
								"circle-stroke-color": "#68b9de",
								"circle-stroke-width": 30,
								"circle-stroke-opacity": 0.5,
							}}
						/>
					</Source>
				</div>
			))}
		</Map>
	);
}

export default MapBox;
