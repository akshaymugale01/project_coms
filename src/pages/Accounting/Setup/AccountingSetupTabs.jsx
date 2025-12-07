import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import SetupNavbar from "../../../components/navbars/SetupNavbar";
import MonthlyExpenseSetup from "./MonthlyExpenseSetup.jsx";
import CAMSetup from "./CAMSetup.jsx";
import CAMBills from "../Billing/CAMBills.jsx";
import BillingConfiguration from "./BillingConfiguration.jsx";
import InterestConfiguration from "./InterestConfiguration.jsx";
import IncomeTracking from "./IncomeTracking.jsx";
import ReconciliationReport from "./ReconciliationReport.jsx";
import { 
  FaFileInvoiceDollar, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaCog, 
  FaPercent,
  FaReceipt,
  FaChartLine
} from 'react-icons/fa';

const menuItems = [
  { 
    id: 'bills', 
    label: 'Accounting Bills', 
    icon: <FaFileInvoiceDollar />,
    component: CAMBills
  },
  { 
    id: 'monthly', 
    label: 'Monthly Expense', 
    icon: <FaMoneyBillWave />,
    component: MonthlyExpenseSetup
  },
  { 
    id: 'unit', 
    label: 'Unit Configuration', 
    icon: <FaBuilding />,
    component: CAMSetup
  },
  { 
    id: 'billing-config', 
    label: 'Billing Configuration', 
    icon: <FaCog />,
    component: BillingConfiguration
  },
  { 
    id: 'interest-config', 
    label: 'Interest Configuration', 
    icon: <FaPercent />,
    component: InterestConfiguration
  },
  { 
    id: 'income-tracking', 
    label: 'Income Tracking', 
    icon: <FaReceipt />,
    component: IncomeTracking
  },
  { 
    id: 'reconciliation', 
    label: 'Reconciliation Report', 
    icon: <FaChartLine />,
    component: ReconciliationReport
  }
];

const AccountingSetupTabs = () => {
  const [activeSection, setActiveSection] = useState('bills');

  const ActiveComponent = menuItems.find(item => item.id === activeSection)?.component;

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        {/* <SetupNavbar /> */}
        <div className="flex flex-1 overflow-hidden mt-2">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto rounded-l-lg">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-600 to-gray-700">
              <h2 className="text-xl font-bold text-white">Accounting Setup</h2>
              <p className="text-sm text-blue-100 mt-1">Configure settings</p>
            </div>
            <nav className="p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gray-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 rounded-r-lg">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountingSetupTabs;