import React, { useState } from "react";
import MonthlyExpenseSetup from "./MonthlyExpenseSetup.jsx";
import CAMSetup from "./CAMSetup.jsx";
import CAMBills from "../Billing/CAMBills.jsx";

const tabs = [
  { key: "monthly", label: "Monthly Expenses" },
  { key: "unit", label: "Unit Config" },
  { key: "bills", label: "Accounting Bills" },
];

const AccountingSetupTabs = () => {
  const [active, setActive] = useState("monthly");

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 pt-4">
          <div className="inline-flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "px-4 py-2 rounded " +
                  (active === t.key
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          {active === "monthly" && <MonthlyExpenseSetup />}
          {active === "unit" && <CAMSetup />}
          {active === "bills" && <CAMBills />}
        </div>
      </div>
    </div>
  );
};

export default AccountingSetupTabs;