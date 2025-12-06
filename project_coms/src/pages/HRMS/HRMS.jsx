import React from 'react';
import { NavLink } from 'react-router-dom';

const modules = [
  { name: 'Employee Onboarding', path: '/admin/hrms/employee-onboarding' },

  { name: 'Attendance', path: '/admin/hrms-attendance' },
  { name: 'Salary Slip', path: '/admin/hrms-salary-slip' },
  { name: 'Auto Salary Breakup Creation', path: '/admin/auto-salary-breakup' },
  { name: 'Leaves', path: '/admin/leaves' },
  { name: 'Roaster Planning', path: '/admin/roaster-planning' },
  { name: 'Employee Advance Claim', path: '/admin/employee-advance-claim' },
  { name: 'Employee Performance', path: '/admin/employee-performance' },
  { name: 'Employee Expenses', path: '/admin/employee-expenses' },
  { name: 'Time Sheet Tracker', path: '/admin/time-sheet-tracker' },
  { name: 'IJP/Recruitment', path: '/admin/ijp-recruitment' },
  { name: 'Employee Induction', path: '/admin/employee-induction' },
  { name: 'Employee IT Declaration', path: '/admin/employee-it-declaration' },
  { name: 'Offer Letter / Acceptance', path: '/admin/offer-letter' },
  { name: 'Employee Talent Programs', path: '/admin/employee-talent-programs' },
  { name: 'Memos', path: '/admin/memos' },
  { name: 'Employee Loans & Advance', path: '/admin/employee-loans-advance' },
  { name: 'Recruitment', path: '/admin/recruitment' },
  { name: 'Roaster', path: '/admin/roaster' },
  { name: 'Provident Fund, ESIC, Legal Compliance', path: '/admin/provident-fund' },

];

const HRMS = () => {
  return (
    <div className="flex flex-col border-r border-gray-400 h-screen overflow-auto text-xs font-medium pb-4  p-2">
      {modules.map((module, index) => (
        <CustomNavLink key={index} to={module.path}>
          {module.name}
        </CustomNavLink>
      ))}
    </div>
  );
};

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 px-4 cursor-pointer transition-all duration-300 ease-linear ${
          isActive ? 'text-blue-500 border border-blue-500 rounded-full' : 'hover:text-blue-700'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default HRMS;