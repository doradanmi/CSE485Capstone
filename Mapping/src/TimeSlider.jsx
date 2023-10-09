import React from "react";

export default function TimeSlider({ time, setTime }) {
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
      <div className="ml-4">{time}</div>
    </div>
  );
}
