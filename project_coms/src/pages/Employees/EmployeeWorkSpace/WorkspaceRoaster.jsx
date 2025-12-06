import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import EmployeePortal from '../../../components/navbars/EmployeePortal';
import RosterCard from './RoasterCard';

// Function to generate roster data for a month
const generateMonthlyRoster = (month, year) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const roster = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const formattedDate = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
    const shiftTiming = dayOfWeek === 0 ? 'Weekly Off' : '9 AM - 5 PM'; // Set 'Weekly Off' for Sundays
    const isWeeklyOff = dayOfWeek === 0; // Sunday is a weekly off day

    roster.push({
      date: formattedDate,
      shiftTiming,
      isWeeklyOff,
    });
  }

  return roster;
};

const WorkspaceRoaster = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const [rosterData, setRosterData] = useState([]);

  useEffect(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const generatedRosterData = generateMonthlyRoster(month, year);
    setRosterData(generatedRosterData);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeePortal />
        <div className="my-2">
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border rounded-md p-2 w-60"
          />
        </div>
        <div className="grid grid-cols-6 gap-1">
          {rosterData.map((day, index) => (
            <RosterCard
              key={index}
              date={day.date}
              shiftTiming={day.shiftTiming}
              isWeeklyOff={day.isWeeklyOff}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspaceRoaster;
