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

	const sampleFlightData = {
		flightNumber: "UA1234",
		altitude: "300",
		startLat: "33.715",
		startLong: "-111.78",
		endLat: "33.5382",
		endLong: "-112.04",
		startTime: "13:00",
		speed: "10",
	};
	const [flightData, setFlightData] = useState(initialFlightData);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFlightData({ ...flightData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// swap negative/positive signs for longitude
		flightData.startLong = -parseFloat(flightData.startLong);
		flightData.endLong = -parseFloat(flightData.endLong);

		fetch(
			"https://ncfqx2g33wwmf4ofvlgw3d52vm0haiaq.lambda-url.us-east-1.on.aws/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Flight: flightData.flightNumber,
					Altitude: flightData.altitude,
					Start: `${flightData.startLat}, ${flightData.startLong}`,
					End: `${flightData.endLat}, ${flightData.endLong}`,
					Start_Time: flightData.startTime,
					Speed: flightData.speed,
					User: "8b47e3b9448f0b72d9f12aa41ee5ca5754fe05f21cc8c521b5f6bdf6a507b36f",
					Key: "71c9a6840e7f0b0ea274e15427c9a1ac7db7b2be6f08dce14d08bcf29e075446",
				}),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				// {"message": "Flight added successfully. Enjoy your flight!"}
				if (
					data.message ===
					"Flight added successfully. Enjoy your flight!"
				) {
					setFlightData(initialFlightData);
					window.location.reload();
				} else {
					alert(data.message);
				}
			})
			.catch((error) => {
				alert("Invalid input. Please try again.");
			});
	};

	const handleSampleFlight = (e) => {
		e.preventDefault();
		setFlightData(sampleFlightData);
	};

	const handleClear = (e) => {
		e.preventDefault();
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
			<div className="flex mt-10">
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white mr-16 px-4 py-2 rounded"
					onClick={handleSampleFlight}
				>
					Load Sample Flight
				</button>
				<button
					type="submit"
					className="bg-red-500 hover:bg-red-700 text-white mr-16 px-4 py-2 rounded"
					onClick={handleClear}
				>
					Clear
				</button>
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
				>
					Add Flight
				</button>
			</div>
		</form>
	);
}

export default FlightInputForm;
