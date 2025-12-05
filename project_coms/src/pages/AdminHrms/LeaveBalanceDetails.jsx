import React, { useEffect, useState } from "react";
import Select from "react-select"
import { getItemInLocalStorage } from "../../utils/localStorage";
import { getMyHRMSEmployees } from "../../api";
const LeaveBalanceDetails = () => {
  const monthlyBalances = [
    {
      month: "Jan - 2024",
      opening: 22.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 22.0,
    },
    {
      month: "Feb - 2024",
      opening: 22.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 22.0,
    },
    {
      month: "Mar - 2024",
      opening: 22.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 22.0,
    },
    {
      month: "Apr - 2024",
      opening: 22.0,
      accrued: 0,
      taken: 0,
      adjusted: -17.0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "May - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Jun - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Jul - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Aug - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Sep - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Oct - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Nov - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
    {
      month: "Dec - 2024",
      opening: 5.0,
      accrued: 0,
      taken: 0,
      adjusted: 0,
      lapsed: 0,
      encashed: 0,
      ending: 5.0,
    },
  ];

  const transactions = [
    {
      date: "01-01-2024",
      details: "Opening Balance",
      change: 22.0,
      ending: 22.0,
    },
    {
      date: "30-04-2024",
      details: "Leave Adjusted by Admin\nComment :- OK",
      change: -17.0,
      ending: 5.0,
    },
  ];

  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const handleUserChangeSelect = (selectedUserOption) => {
    setSelectedUserOption(selectedUserOption);
  };

  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getMyHRMSEmployees(hrmsOrgId);

        const employeesList = res.map((emp) => ({
          value: emp.id,
          label: `${emp.first_name} ${emp.last_name}`,
        }));

        setEmployees(employeesList);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">Leave Balance Details</h2>
        <div className=" grid grid-cols-4 items-end  gap-5">
          <div className="flex flex-col gap-2">

          <label className="text-xl font-semibold">Employee:</label>
          <Select
                options={employees}
                noOptionsMessage={() => "No Employee Available"}
                onChange={handleUserChangeSelect}
                placeholder="Select Employee"
                />
                </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">Leave Cycle:</p>
           <select className="border border-gray-300 rounded-md p-2">
            <option value="">Jan 24 - Dec 24 </option>
           </select>
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="text-xl font-semibold">Category:</p>
            <select name="" id="" className="border border-gray-300 rounded-md p-2">
              <option value="">Paid Leave</option>
              <option value="">LWP</option>
            </select>
          </div>
          <div className=" flex items-end gap-3">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Monthly Leave Balances</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Month</th>
                <th className="border px-4 py-2">Opening Balance</th>
                <th className="border px-4 py-2">Accrued Balance</th>
                <th className="border px-4 py-2">Leaves Taken</th>
                <th className="border px-4 py-2">Leaves Adjusted</th>
                <th className="border px-4 py-2">Leaves Lapsed</th>
                <th className="border px-4 py-2">Leaves Encashed</th>
                <th className="border px-4 py-2">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyBalances.map((balance, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{balance.month}</td>
                  <td className="border px-4 py-2">{balance.opening}</td>
                  <td className="border px-4 py-2">{balance.accrued}</td>
                  <td className="border px-4 py-2">{balance.taken}</td>
                  <td className="border px-4 py-2">{balance.adjusted}</td>
                  <td className="border px-4 py-2">{balance.lapsed}</td>
                  <td className="border px-4 py-2">{balance.encashed}</td>
                  <td className="border px-4 py-2">{balance.ending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Leave Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Transaction Details</th>
                <th className="border px-4 py-2">Change</th>
                <th className="border px-4 py-2">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{transaction.date}</td>
                  <td className="border px-4 py-2 whitespace-pre-line">
                    {transaction.details}
                  </td>
                  <td className="border px-4 py-2">{transaction.change}</td>
                  <td className="border px-4 py-2">{transaction.ending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceDetails;
