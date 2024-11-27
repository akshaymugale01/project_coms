import React from 'react';

const RosterCard = ({ date, shiftTiming, isWeeklyOff }) => {
  // Determine the card color based on the day of the week
  const cardColor = isWeeklyOff ? 'border-red-500' : 'border-green-500';

  return (
    <div className={`p-1  ${cardColor} rounded-lg border-2  text-black shadow-md my-2`}>
      <h3 className=" font-semibold">{date}</h3>
      <p className="text-sm">Shift Timing: {shiftTiming}</p>
    </div>
  );
};

export default RosterCard;
