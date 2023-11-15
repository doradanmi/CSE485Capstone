import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPause,
	faPlay,
	faForward,
	faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function TimeSlider({ time, setTime }) {
	const [isPlaying, setIsPlaying] = useState(0);

	useEffect(() => {
		let interval = null;
		if (isPlaying !== 0) {
			interval = setInterval(() => {
				setTime((time) => {
					if (time >= 86400) {
						return 0;
					}
					if (isPlaying === 2) {
						return parseInt(time) + 5;
					}
					return parseInt(time) + 1;
				});
			}, 1);
		}
		return () => clearInterval(interval);
	}, [isPlaying, setTime]);

	const handleTimeSliderChange = (e) => {
		setIsPlaying(0);
		setTime(e.target.value);
	};

	const handleCyclePlay = () => {
		if (isPlaying == 2) {
			setIsPlaying(0);
		} else {
			setIsPlaying(isPlaying + 1);
		}
	};

	const handleReset = () => {
		setIsPlaying(0);
		setTime(46800);
	};

	let date = new Date(null);
	date.setSeconds(time); // specify value of time here
	let timeString = date.toISOString().slice(11, 19);
	return (
		<div className="flex items-center ml-1 mt-2 text-blue-600">
			<div className="w-4 mr-2" onClick={handleCyclePlay}>
				{isPlaying === 0 && <FontAwesomeIcon icon={faPlay} />}
				{isPlaying === 1 && <FontAwesomeIcon icon={faForward} />}
				{isPlaying === 2 && <FontAwesomeIcon icon={faPause} />}
			</div>
			<div className="w-4 mr-2" onClick={handleReset}>
				<FontAwesomeIcon icon={faRotateLeft} />
			</div>

			<input
				type="range"
				min="0"
				max="86400"
				value={time}
				onChange={handleTimeSliderChange}
				className="w-full"
			/>
			<div className="ml-2">{timeString}</div>
		</div>
	);
}
