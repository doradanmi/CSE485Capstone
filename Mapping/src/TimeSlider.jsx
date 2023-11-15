import React from "react";

export default function TimeSlider({ time, setTime }) {
	let date = new Date(null);
	date.setSeconds(time); // specify value of time here
	let timeString = date.toISOString().substr(11, 8);
	return (
		<div className="flex items-center">
			<input
				type="range"
				min="0"
				max="86400"
				value={time}
				onChange={(e) => setTime(e.target.value)}
				className="w-full"
			/>
			<div className="ml-4">{timeString}</div>
		</div>
	);
}
