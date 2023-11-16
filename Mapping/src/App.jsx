import React, { useState, useEffect } from "react";
import "./App.css";
import FlightTable from "./FlightTable";
import FlightInputForm from "./FlightInputForm";
import MapBox from "./MapBox";
import TimeSlider from "./TimeSlider";

function convertJSONtoFlights(inputJSON) {
	const flights = inputJSON.flights;
	const flightList = [];

	for (const flightNumber in flights) {
		const flightData = flights[flightNumber];
		for (const index in flightData) {
			const flightInfo = flightData[index];
			const startCoordinates = flightInfo.Start.split(", ");
			const endCoordinates = flightInfo.End.split(", ");
			const startTime =
				parseInt(flightInfo.Start_Time.split(":")[0]) * 3600 +
				parseInt(flightInfo.Start_Time.split(":")[1]) * 60;
			const endTime =
				parseInt(flightInfo.End_Time.split(":")[0]) * 3600 +
				parseInt(flightInfo.End_Time.split(":")[1]) * 60;
			const speed = parseInt(flightInfo.Speed);
			const altitude = parseInt(flightInfo.Altitude);

			const flightObject = {
				start: {
					long: -parseFloat(startCoordinates[1]),
					lat: parseFloat(startCoordinates[0]),
				},
				end: {
					long: -parseFloat(endCoordinates[1]),
					lat: parseFloat(endCoordinates[0]),
				},
				flightNumber: flightNumber,
				startTime: startTime,
				altitude: altitude,
				speed: speed,
			};

			flightList.push(flightObject);
		}
	}

	return flightList;
}
function App() {
	const [time, setTime] = useState(46800);
	const [flights, setFlights] = useState([]);

	useEffect(() => {
		fetch(
			"https://xzy55jtx57tccv6r56hi45rmma0qmnfs.lambda-url.us-east-1.on.aws/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Key: "71c9a6840e7f0b0ea274e15427c9a1ac7db7b2be6f08dce14d08bcf29e075446",
					User:
						localStorage.getItem("loggedInSession") ||
						"8b47e3b9448f0b72d9f12aa41ee5ca5754fe05f21cc8c521b5f6bdf6a507b36f", // get localStoage key loggedInSession
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("Success: ", data);
				const flightData = convertJSONtoFlights(data);
				setFlights(flightData);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	}, []);

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
