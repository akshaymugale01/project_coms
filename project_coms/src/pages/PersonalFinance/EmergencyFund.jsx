import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
import { Link, NavLink } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { PiPlusCircle } from "react-icons/pi";
import Table from '../../components/table/Table';
import { BsEye } from "react-icons/bs";
import { BiEdit } from 'react-icons/bi';

const EmergencyFund = () => {

  const columns = [
            {
              name: "Action",
              cell: (row) => (
                <div className="flex items-center gap-4">
                  <Link to={`/emergency-details/${row.id}`}>
                    <BsEye size={15} />
                  </Link>
                  {/* <Link to={`/admin/edit-rvehicles/${row.id}`}>
                    <BiEdit size={15} />
                  </Link> */}
                </div>
              ),
            },
            // {
            //   name: "Name",
            //   selector: (row) => row.Name,
            //   sortable: true,
            // },
            {
              name: "Savings Goal Amount",
              selector: (row) => row.Goal_amount,
              sortable: true,
            },
            {
              name: "Current Emergency Fund Balance",
              selector: (row) => row.Current,
              sortable: true,
            },
            {
              name: "Monthly Savings Contribution",
              selector: (row) => row.Monthly,
              sortable: true,
            },

            {
              name: "Target Completion Date",
              selector: (row) => row.Target,
              sortable: true,
            },


        ]
        const data = [
            {
              Name:"Mittu",
              Goal_amount:"12333",
              Current:"456",
              Monthly:"456",
              Target:"789",
            }
        ]
  // const [income, setIncome] = useState([{ source: 'Job', amount: 5000, date: '2023-01-01' }, { source: 'Freelance', amount: 1500, date: '2023-01-15' }]);
  // const [expenses, setExpenses] = useState([
  //   { category: 'Housing', amount: 1500, date: '2023-01-01' },
  //   { category: 'Transportation', amount: 300, date: '2023-01-05' },
  //   { category: 'Groceries', amount: 600, date: '2023-01-10' },
  //   { category: 'Entertainment', amount: 200, date: '2023-01-15' },
  // ]);

  // const totalIncome = income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  // const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  // const remainingBudget = totalIncome - totalExpenses;

  // const expensesByCategory = expenses.reduce((acc, curr) => {
  //   acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
  //   return acc;
  // }, {});

  // const monthlyData = {
  //   dates: [],
  //   income: [],
  //   expenses: [],
  //   remainingBudget: [],
  // };

  // useEffect(() => {
  //   const dates = [...new Set([...income.map(i => i.date), ...expenses.map(e => e.date)])];
  //   dates.sort();

  //   dates.forEach(date => {
  //     const dailyIncome = income.filter(i => i.date === date).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  //     const dailyExpenses = expenses.filter(e => e.date === date).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  //     const previousRemainingBudget = monthlyData.remainingBudget.length ? monthlyData.remainingBudget[monthlyData.remainingBudget.length - 1] : 0;

  //     monthlyData.dates.push(date);
  //     monthlyData.income.push(dailyIncome);
  //     monthlyData.expenses.push(dailyExpenses);
  //     monthlyData.remainingBudget.push(previousRemainingBudget + dailyIncome - dailyExpenses);
  //   });

  //   const pieChart = Highcharts.chart('expenses-chart', {
  //     chart: {
  //       type: 'pie'
  //     },
  //     title: {
  //       text: 'Expenses by Category'
  //     },
  //     series: [{
  //       name: 'Expenses',
  //       data: Object.keys(expensesByCategory).map((category) => ({
  //         name: category,
  //         y: expensesByCategory[category],
  //       })),
  //     }],
  //   });

  //   const barChart = Highcharts.chart('income-expenses-chart', {
  //     chart: {
  //       type: 'bar'
  //     },
  //     title: {
  //       text: 'Monthly Income vs. Expenses'
  //     },
  //     xAxis: {
  //       categories: monthlyData.dates
  //     },
  //     series: [{
  //       name: 'Income',
  //       data: monthlyData.income
  //     }, {
  //       name: 'Expenses',
  //       data: monthlyData.expenses
  //     }]
  //   });

  //   return () => {
  //     if (pieChart) pieChart.destroy();
  //     if (barChart) barChart.destroy();
  //   };
  // }, [income, expenses, expensesByCategory, monthlyData]);

  return (
    <div className='flex'>
      <Navbar />
      <div className='w-full'>
        <div className="flex justify-center w-full">
          <div className="sm:flex grid grid-cols-2 mt-2 mb-2 text-sm md:text-base sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/personal-finance"}
              className={({ isActive }) =>
                `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Individual Financial Budgeting 
            </NavLink>
            <NavLink
              to={"/emergency-fund"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Emergency Fund 
            </NavLink>
            <NavLink
              to={"/personal-investment"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Investment 
            </NavLink>
            <NavLink
              to={"/goal-plan"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Goal Planning 
            </NavLink>
            <NavLink
              to={"/personal-insurance"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Insurance
            </NavLink>
          </div>
        </div>

        {/* <div className="ml-10 mt-3 flex w-full bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6">
            <div id="expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
          <div className="ml-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6">
            <div id="income-expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
        </div> */}
        <div className='flex justify-end gap-5 mr-2 mb-2'>
        <input
            type="text"
            placeholder="Search by employee Name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
        <Link
            to={"/add-emergency-fund"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add 
          </Link></div>
          <div className='ml-3'>
          <Table columns={columns} data={data} isPagination={true} />

          </div>

      </div>

    </div>
  );
};

export default EmergencyFund;