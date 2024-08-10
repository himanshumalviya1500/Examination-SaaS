import React from "react";

const DateComponent = () => {
  const currentDate = new Date();
  const startDate = currentDate.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 5);

  const formattedEndDate = endDate.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <p className="time start">Start: {startDate}</p>
      <p className="time end">End: {formattedEndDate}</p>
    </div>
  );
};

export default DateComponent;
