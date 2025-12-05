import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Link, NavLink } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { PiPlusCircle } from "react-icons/pi";
import Table from '../../components/table/Table';
import { BsEye } from "react-icons/bs";
import { BiEdit } from 'react-icons/bi';
import Financial from './Financial';

const PersonalFinancialLogin = () => {
  const columns1 = [
    //  {
    //       name: "Name",
    //       selector: (row) => row.Name,
    //       sortable: true,
    //     },
        {
          name: "Salary",
          selector: (row) => row.Salary,
          sortable: true,
        },
        {
          name: "Bonus",
          selector: (row) => row.Bonus,
          sortable: true,
        },

        {
          name: "Investment Income",
          selector: (row) => row.Income,
          sortable: true,
        },
  ]
  const data1 = [
    {
        Name:"Mittu",
        Salary:"10",
        Bonus:"10",
        Income:"100",
    }
    ]
    const columns = [
        // {
        //   name: "Action",
        //   cell: (row) => (
        //     <div className="flex items-center gap-4">
        //         <Link to={`/admin/personal-financial-details/${row.id}`}>
        //         <BsEye size={15} />
        //       </Link>
        //       <Link to={`/personal-financial-edit/${row.id}`}>
        //         <BiEdit size={15} />
        //       </Link>
        //     </div>
        //   ),
        // },

        // {
        //   name: "Name",
        //   selector: (row) => row.Name,
        //   sortable: true,
        // },
        // {
        //   name: "Salary",
        //   selector: (row) => row.Salary,
        //   sortable: true,
        // },
        // {
        //   name: "Bonus",
        //   selector: (row) => row.Bonus,
        //   sortable: true,
        // },

        // {
        //   name: "Investment Income",
        //   selector: (row) => row.Income,
        //   sortable: true,
        // },
        {
          name: "Housing",
          selector: (row) => row.Housing,
          sortable: true,
        },
        {
          name: "Utilities",
          selector: (row) => row.Utilities,
          sortable: true,
        },
        {
          name: "Transportation",
          selector: (row) => row.Transportation,
          sortable: true,
        },

        {
          name: "Groceries",
          selector: (row) => row.Groceries,
          sortable: true,
        },
        {
          name: "Entertainment",
          selector: (row) => row.Entertainment,
          sortable: true,
        },

        {
          name: "Health Insurance Premiums",
          selector: (row) => row.Health,
          sortable: true,
        },
        {
          name: "Loan Payments",
          selector: (row) => row.Loan,
          sortable: true,
        },

        {
          name: "Savings",
          selector: (row) => row.Savings,
          sortable: true,
        },
        {
          name: "Miscellaneous",
          selector: (row) => row.Miscellaneous,
          sortable: true,
        },

        {
          name: "Cancellation",
          selector: (row) =>
            row.status === "Upcoming" && (
              <button className="text-red-400 font-medium">Cancel</button>
            ),
          sortable: true,
        },
        {
          name: "Approval",
          selector: (row) =>
            row.status === "Upcoming" && (
              <div className="flex justify-center gap-2">
                <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                  <TiTick size={20} />
                </button>
                <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
                  <IoClose size={20} />
                </button>
              </div>
            ),
          sortable: true,
        },
      ];
      const data = [
        {
            Name:"Mittu",
            Salary:"10",
            Bonus:"10",
            Income:"100",
            Housing:"10",
            Utilities:"10",
            Transportation:"10",
            Groceries:"10",
            Entertainment:"12",
            Health:"78",
            Loan:"89",
            Savings:"85",
            Miscellaneous:"56",
        }
    ]
  const [income, setIncome] = useState([{ source: 'Job', amount: 5000, date: '2023-01-01' }, { source: 'Freelance', amount: 1500, date: '2023-01-15' }]);
  const [expenses, setExpenses] = useState([
    { category: 'Housing', amount: 1500, date: '2023-01-01' },
    { category: 'Transportation', amount: 300, date: '2023-01-05' },
    { category: 'Groceries', amount: 600, date: '2023-01-10' },
    { category: 'Entertainment', amount: 200, date: '2023-01-15' },
  ]);

  const totalIncome = income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const remainingBudget = totalIncome - totalExpenses;

  const expensesByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const monthlyData = {
    dates: [],
    income: [],
    expenses: [],
    remainingBudget: [],
  };

  useEffect(() => {
    const dates = [...new Set([...income.map(i => i.date), ...expenses.map(e => e.date)])];
    dates.sort();

    dates.forEach(date => {
      const dailyIncome = income.filter(i => i.date === date).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      const dailyExpenses = expenses.filter(e => e.date === date).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      const previousRemainingBudget = monthlyData.remainingBudget.length ? monthlyData.remainingBudget[monthlyData.remainingBudget.length - 1] : 0;

      monthlyData.dates.push(date);
      monthlyData.income.push(dailyIncome);
      monthlyData.expenses.push(dailyExpenses);
      monthlyData.remainingBudget.push(previousRemainingBudget + dailyIncome - dailyExpenses);
    });

    const pieChart = Highcharts.chart('expenses-chart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Expenses by Category'
      },
      series: [{
        name: 'Expenses',
        data: Object.keys(expensesByCategory).map((category) => ({
          name: category,
          y: expensesByCategory[category],
        })),
      }],
    });

    const barChart = Highcharts.chart('income-expenses-chart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Monthly Income vs. Expenses'
      },
      xAxis: {
        categories: monthlyData.dates
      },
      series: [{
        name: 'Income',
        data: monthlyData.income
      }, {
        name: 'Expenses',
        data: monthlyData.expenses
      }]
    });

    return () => {
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();
    };
  }, [income, expenses, expensesByCategory, monthlyData]);

  return (
    <div className='flex'>
      <Navbar />
      <div className=" w-full my-2 flex md:mx-2 overflow-hidden flex-col">
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
              <Financial/>
        <div className="flex gap-2 p-2  w-full bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-custom-all-sides w-full max-w-2xl mb-6">
            <div id="expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
          <div className="mr-2 bg-white p-6 rounded-lg shadow-custom-all-sides w-full max-w-2xl mb-6">
            <div id="income-expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
        </div>
        <div className='flex justify-end gap-5   my-2'>

        <Link
            to={"/personal-financial-setup"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Setup 
          </Link></div>
          <div className='ml-3'>
          <h1 className='font-semibold' style={{ fontSize: '32px' }}>Income</h1>

          <Table columns={columns1} data={data1} isPagination={true} />
          <h1 className='font-semibold' style={{ fontSize: '32px' }}>Expenses</h1>
          <Table columns={columns} data={data} isPagination={true} />
          </div>

      </div>

    </div>
  );
};

export default PersonalFinancialLogin;