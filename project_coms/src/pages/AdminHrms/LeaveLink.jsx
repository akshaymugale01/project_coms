// src/components/Sidebar.js
import React from 'react';

const LeaveLink = () => {
  const items = [
    
    "What does the rollover mean? How does it work?",
    "How do I assign leave balance?",
    "How do I add a leave category?",
   " How do I create a leave Template?",
   " Which month of the year does your leave cycle start from? What does this mean?",
    "How do I add single/multiple leave applications for employees?",
    "What does Leave Applications sub tab mean?",
    "What are leave categories?",
    "Which date were initial balances set for? What does this mean?",
    "How do I edit the general settings?",
   " How do I assign a leave template?",
    // How do I add a comp-off credit on behalf of an employee?
    // Would you like to run daily leave accruals? What does this mean?
    // How do I assign a supervisor for the leave template?
    // How do I approve/reject multiple leave applications?
    // Are Admins Having “Manage Access” to Leave Module Allowed To Approve/Reject Leave Applications? What does this mean?
    // Would you like to freeze Initial balances once first accrual is run? What does this mean?
    // Webinar | Leave Management
    // How can I add a comp-off leave application on behalf of an employee ?
    // How can I approve a comp-off credit or earnings request?
  ];

  return (
    <div className="w-full  ml-10 mt-5 mb-5 text-blue p-4">
      <h2 className="text-xl font-bold mb-4">Leave</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <a href="#" className="hover:underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveLink;
