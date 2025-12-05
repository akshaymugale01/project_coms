// src/components/Sidebar.js
import React from 'react';

const BasicLink = () => {
  const items = [
    
    "How do I add a location?",
    "How do I upload/edit my company policy document?",
    "How do I add custom employee fields?",
    "How do I check the changes made to an administrator's permissions?",
    "How to give admin access only for reports module",
    "How do I restrict my employees from sharing information on the dashboard?",
    "How do I add a list of company holidays?",
    "How do I upload my company’s corporate logo on the portal and employee payslips?",
    "What does the customised document ID mean?",
    "How can I restrict employees in viewing or sharing information?",
    "How do I edit/add my company profile details?",
    "How do I edit multiple locations?",
    "How do I restrict holidays to a few employees or specific employees?",
    "How do I select what employee fields I want to capture in the employee profile?",
    "How do I setup the bank account information from which I will be making my salary or reimbursement payments?",
    "How do I setup Two Factor Authentication for employees & admins?",
    "What does the signatory detail mean?",
    "What happens when I map employees to different locations?",
    "What does the employee permissions sub-tab mean?",
    "How do I modify the columns visible in the employee directory visible in the employee portal?"
  ];

  return (
    <div className="w-full  ml-10 mt-5 mb-5 text-blue p-4">
      <h2 className="text-xl font-bold mb-4">Organization</h2>
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

export default BasicLink;
