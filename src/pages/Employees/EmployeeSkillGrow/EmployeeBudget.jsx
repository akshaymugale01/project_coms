import React, { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { LuPieChart } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import ReactApexChart from "react-apexcharts";
import { BsDatabaseDash, BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit, BiPlus } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
function EmployeeBudget() {
  const [addBudgetCategory, setAddBudgetCategory] = useState(false);
  const [budgetCategoryAction, setBudgetCategoryAction] = useState(null);
  const dropdownRefs = useRef([]);
  const [categoryEditModal, setCategoryEditModal] = useState(false);
  const [categoryDetailsModal, setCategoryDetailsModal] = useState(false);
  const [bifurcations, setBifurcations] = useState([{ name: "", amount: "" }]);
  const handleBudgetCategoryDropDown = (index) => {
    setBudgetCategoryAction(budgetCategoryAction === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
    ) {
      setBudgetCategoryAction(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const CategoryEditModal = () => {
    setCategoryEditModal(true);
  };

  const CategoryDetailsModal = () => {
    setCategoryDetailsModal(true);
  };

  const closeModal = () => {
    setCategoryEditModal(false);
    setCategoryDetailsModal(false);
  };
  const progressBarData = [
    { label: "Design", value: 23, color: "bg-yellow-500" },
    { label: "Saas Services", value: 10, color: "bg-gray-500" },
    { label: "Development", value: 25, color: "bg-red-500" },
    { label: "SEO", value: 18, color: "bg-purple-500" },
    { label: "Entertainment", value: 4, color: "bg-pink-500" },
    { label: "Marketing", value: 19, color: "bg-green-500" },
    { label: "Extra", value: 3, color: "bg-blue-500" },
  ];

  const budgetCategory = [
    {
      id: 1,
      category: "Design",
      totalBudget: "₹  11,500",
      totalSpent: "₹ 6,000",
      percentage: "23%",
      color: "bg-yellow-500",
    },
    {
      id: 2,
      category: "Saas Services",
      totalBudget: "₹  5,000",
      totalSpent: "₹ 4,000",
      percentage: "10%",
      color: "bg-gray-500",
    },
    {
      id: 3,
      category: "Development",
      totalBudget: "₹ 11,250",
      totalSpent: "₹ 12,000",
      percentage: "22.5%",
      color: "bg-red-500",
    },
    {
      id: 4,
      category: "SEO",
      totalBudget: "₹ 9,000",
      totalSpent: "₹ 9,000",
      percentage: "18%",
      color: "bg-purple-500",
    },
    {
      id: 5,
      category: "Entertainment",
      totalBudget: "₹ 2,000",
      totalSpent: "₹ 4,000",
      percentage: "4%",
      color: "bg-pink-500",
    },
    {
      id: 6,
      category: "Marketing",
      totalBudget: "₹ 9,500",
      percentage: "19%",
      totalSpent: "₹ 7,000",
      color: "bg-green-500",
    },
    {
      id: 7,
      category: "Extra",
      totalBudget: "₹ 1,750",
      totalSpent: "₹ 2,000",
      percentage: "3.5%",
      color: "bg-blue-500",
    },
  ];
  const budgetDetails = [
    {
      id: 1,
      categoryType: "Design",
      totalBudget: "₹ 11,500",
      spentAmount: "₹ 6,000",
      expensesPercent: "47.83%.",
      remaining: "₹ 5,500",
      overSpent: " - ",
      color: "bg-yellow-500",
    },
    {
      id: 2,
      categoryType: "Saas Services",
      totalBudget: "₹ 5,000",
      spentAmount: "₹ 4,000",
      expensesPercent: "20.00%",
      remaining: "₹ 1,000",
      overSpent: " - ",
      color: "bg-gray-500",
    },
    {
      id: 3,
      categoryType: "Development",
      totalBudget: "₹ 11,250",
      spentAmount: "₹ 12,000",
      expensesPercent: "-06.25%",
      remaining: "₹ 0",
      overSpent: "₹ 750 ",
      color: "bg-red-500",
    },
    {
      id: 4,
      categoryType: "SEO",
      totalBudget: "₹ 9,000",
      spentAmount: "₹ 9,000",
      expensesPercent: "00.00%",
      remaining: "₹ 0",
      overSpent: " - ",
      color: "bg-violet-500",
    },
    {
      id: 5,
      categoryType: "Entertainment",
      totalBudget: "₹ 2,000",
      spentAmount: "₹ 4,000",
      expensesPercent: "-50.00%",
      remaining: "₹ 0",
      overSpent: "₹ 2,000",
      color: "bg-pink-500",
    },
    {
      id: 6,
      categoryType: "Marketing",
      totalBudget: "₹ 9,500",
      spentAmount: "₹ 7,000",
      expensesPercent: "26.32%",
      remaining: "₹ 2,500",
      overSpent: " - ",
      color: "bg-green-500",
    },
    {
      id: 7,
      categoryType: "Extra",
      totalBudget: "₹ 17,00",
      spentAmount: "₹ 2,000",
      expensesPercent: "-15.00%",
      remaining: "₹ 0",
      overSpent: "₹ 300 ",
      color: "bg-blue-500",
    },
  ];

  const options = {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Design",
        "SaaS Services",
        "Development",
        "SEO",
        "Entertainment",
        "Marketing",
      ],
      labels: {
        style: {
          colors: [
            "#4A5568",
            "#4A5568",
            "#4A5568",
            "#4A5568",
            "#4A5568",
            "#4A5568",
          ], // Customize colors for each category
          fontSize: "14px", // Customize font size
        },
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.4,
    },
    colors: ["#8B5CF6"],
    markers: {
      size: 5,
      colors: ["#754ffe"],
      strokeColor: "#fff",
      strokeWidth: 2,
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 2,
      },
    },
    tooltip: {
      enabled: true,
    },
    yaxis: {
      stepSize: 30,
      tickAmount: 4,
      labels: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Expenses",
      data: [90, 32, 30, 40, 100, 20],
    },
  ];

  const handleAddBudgetBifurcation = (event) => {
    event.preventDefault();
    setBifurcations([...bifurcations, { name: "", amount: "" }]);
  };
  const handleRemoveBifurcation = (index) => {
    const newBifurcation = [...bifurcations];
    newBifurcation.splice(index, 1);
    setBifurcations(newBifurcation);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newBifurcation = [...bifurcations];
    newBifurcation[index][name] = value;
    setBifurcations(newBifurcation);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 mx-5">
        <div className="shadow-custom-all-sides rounded-md">
          <h2 className="text-lg font-semibold mx-8 my-4 text-slate-600">
            Budget
          </h2>
          <div className="flex justify-between px-5 md:px-8 ">
            <p>
              ₹ 50,000 <span className="text-slate-500">(Total)</span>
            </p>
            <p>
              ₹ 10000 <span className="text-slate-500">Remaining </span>
            </p>
          </div>
          <div className=" bg-gray-200 h-2 rounded-full mb-5 mt-2 mx-5 md:mx-10">
            <div className="flex h-full ">
              {progressBarData.map((data, index) => (
                <div
                  key={index}
                  className={`h-full ${data.color}`}
                  style={{ width: `${data.value}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="rounded-md ">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 border-t border-gray-400">
              <div className="flex justify-between gap-5 items-center p-5 px-10">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">₹ 50,000</h2>
                  <p className="text-base text-slate-500 ml-2">Total Budget</p>
                </div>
                <div className="bg-violet-100 rounded-full p-3">
                  <MdOutlineCurrencyRupee
                    className="items-center text-violet-400"
                    size={30}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 items-center p-5 px-10 lg:border-l border-gray-500">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">₹40,000</h2>
                  <p className="text-base text-slate-500 ml-2">Total Spent</p>
                </div>
                <div className="bg-red-100 rounded-full p-3">
                  <FiShoppingCart
                    className="items-center text-red-400"
                    size={30}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 items-center p-5 px-10 lg:border-l border-gray-500">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">₹ 10,000</h2>
                  <p className="text-base text-slate-500 ml-2">Remaining</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <LuPieChart
                    className="items-center text-green-400"
                    size={30}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 items-center p-5 px-10 lg:border-l lg:border-t border-gray-500">
                <div>
                  <h2 className="text-3xl font-semibold mb-2">₹ 0</h2>
                  <p className="text-base text-gray-700 ml-2">Over Spent</p>
                </div>
                <div className="bg-red-100 rounded-full p-3">
                  <BsDatabaseDash
                    className="items-center text-red-400"
                    size={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:gap-5 mx-5">
        <div className="lg:col-span-2">
          <div className="shadow-custom-all-sides rounded-md h-auto">
            <h2 className="text-xl font-semibold mx-8 my-5 mb-16 py-2">
              Expenses
            </h2>
            <ReactApexChart
              options={options}
              series={series}
              type="radar"
              height={400}
            />
          </div>
        </div>
        <div className="lg:col-span-2 my-5">
          <div className="shadow-custom-all-sides rounded-md h-full">
            <div className="flex md:flex-row flex-col justify-between mx-5 py-2">
              <h2 className="text-lg font-semibold text-slate-800">
                Budget Category
              </h2>
              <div>
                <button
                  className={` font-semibold border-2 border-gray-300 px-4  flex gap-2 items-center rounded-md ${"hover:bg-gray-200 rounded-full p-1"}`}
                  onClick={() => setAddBudgetCategory(!addBudgetCategory)}
                >
                  <IoAddCircleOutline size={20} /> Add
                </button>
                {addBudgetCategory && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z">
                    <div className="bg-white p-5 rounded-lg shadow-lg hide-scrollbar w-auto relative max-h-[80%] overflow-y-auto">
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setAddBudgetCategory(!addBudgetCategory)}
                      >
                        <IoClose size={24} />
                      </button>
                      <div className="mx-5 my-5">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                          Budget Details
                        </h2>
                        <div className="grid grid-cols-1 my-2">
                          {/* <div>
                            <label
                              htmlFor="category-name"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Category Name
                            </label>
                            <select
                              id="category-name"
                              className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                            >
                              <option value="">Select a category</option>
                              <option value="design">Design</option>
                              <option value="saasServices">
                                Saas Services
                              </option>
                              <option value="development">Development</option>
                              <option value="seo">SEO</option>
                              <option value="entertainment">
                                Entertainment
                              </option>
                              <option value="marketing">Marketing</option>
                              <option value="extra">Extra</option>
                            </select>
                          </div> */}
                          <div>
                            <label
                              htmlFor="total-budget"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Total Budget
                            </label>
                            <input
                              id="total-budget"
                              type="number"
                              placeholder="Enter Total budget"
                              className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          {/* <div>
                            <label
                              htmlFor="spent"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Total Spent
                            </label>
                            <input
                              id="spent"
                              type="number"
                              placeholder="Enter percentage"
                              className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                            />
                          </div> */}
                          {bifurcations.map((bifurcate, index) => (
                            <div key={index} className="flex gap-2 items-end my-2">
                              <div className="grid gap-2 items-center w-full">
                                <label htmlFor="" className="font-semibold">
                                  Category Name:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  className="border border-gray-400 p-2 rounded-md"
                                  value={bifurcate.name}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />
                              </div>
                             
                              <div className="grid gap-2 items-center w-full">
                                <label htmlFor="" className="font-semibold">
                                  Amount:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter amount"
                                  name="amount"
                                  className="border border-gray-400 p-2 rounded-md"
                                  value={bifurcate.amount}
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />
                                
                              </div>
                                <button
                                  onClick={() => handleRemoveBifurcation(index)}
                                >
                                  <FaTrash className="text-red-400" />
                                </button>
                            </div>
                          ))}
                          <div className="flex justify-end">
                            <button
                              onClick={handleAddBudgetBifurcation}
                              className="border-black border-2 hover:bg-gray-200 font-semibold py-1 px-4 rounded"
                            >
                              <BiPlus />
                            </button>
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            onClick={() => setAddBudgetCategory(!addBudgetCategory)}
                            className="px-4 py-2 bg-black text-white rounded-md w-full"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="min-w-full bg-white border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Spent
                    </th>
                    <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgetCategory.map((data, index) => (
                    <tr
                      className="hover:bg-gray-100 border-t border-gray-200"
                      key={index}
                    >
                      <td className="px-6 py-3 flex items-center space-x-3 text-gray-500 whitespace-nowrap">
                        <div className={`w-2 h-2 ${data.color}`}></div>
                        <span>{data.category}</span>
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {data.totalBudget}
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {data.totalSpent}
                      </td>
                      <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                        {data.percentage}
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        <button
                          className="relative"
                          onClick={() => handleBudgetCategoryDropDown(data.id)}
                          ref={(el) => (dropdownRefs.current[data.id] = el)}
                        >
                          <BsThreeDotsVertical />
                          {budgetCategoryAction === data.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 text-start">
                              <button
                                className="block px-4 py-1 text-gray-800 hover:bg-gray-100 w-full"
                                onClick={CategoryEditModal}
                              >
                                <div className="flex gap-2">
                                  <BiEdit size={15} className="mt-1" />
                                  Edit
                                </div>
                              </button>
                              <button
                                className="block px-4 py-1 text-gray-800 hover:bg-gray-100 w-full"
                                onClick={CategoryDetailsModal}
                              >
                                <div className="flex gap-2">
                                  <BsEye className="mt-1" size={15} /> View
                                </div>
                              </button>
                              <button
                                type="submit"
                                className="block px-4 py-1 text-gray-800 hover:bg-gray-100 w-full"
                              >
                                <div className="flex gap-2">
                                  <RiDeleteBin6Line
                                    className="mt-1"
                                    size={15}
                                  />
                                  Delete
                                </div>
                              </button>
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-5 mx-5">
        <div className="shadow-custom-all-sides rounded-md">
          <h2 className="text-lg font-semibold mx-5 my-5 text-slate-800">
            Budget Details
          </h2>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full  bg-white border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Category Type
                  </th>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Total Budget
                  </th>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Expenses (%)
                  </th>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Over Spent
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetDetails.map((data, index) => (
                  <tr
                    className="hover:bg-gray-100 border-t border-gray-200"
                    key={index}
                  >
                    <td className="px-6 py-3 flex items-center space-x-3 text-gray-500 whitespace-nowrap">
                      <div className={`w-2 h-2 ${data.color}`}></div>
                      <span>{data.categoryType}</span>
                    </td>
                    <td className="px-6 py-3  text-gray-500 whitespace-nowrap">
                      {data.totalBudget}
                    </td>
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                      {data.spentAmount}
                    </td>
                    <td className="px-6 py-3 text-gray-500 flex items-center space-x-1 whitespace-nowrap">
                      <span>{data.expensesPercent}</span>
                      <span
                        className={`text-lg ${
                          parseFloat(data.expensesPercent) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {parseFloat(data.expensesPercent) > 0 ? (
                          <IoIosArrowRoundUp size={22} />
                        ) : (
                          <IoIosArrowRoundDown size={22} />
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {data.remaining}
                    </td>
                    <td className="px-6 py-3text-gray-500">{data.overSpent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {categoryEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative  overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
            <div className="mx-5 my-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Budget Details
              </h2>
              <div className="grid grid-cols-1 my-2">
                <div>
                  <label
                    htmlFor="category-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Name
                  </label>
                  <select
                    id="category-name"
                    className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                  >
                    <option value="">Select a category</option>
                    <option value="design">Design</option>
                    <option value="saasServices">Saas Services</option>
                    <option value="development">Development</option>
                    <option value="seo">SEO</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="marketing">Marketing</option>
                    <option value="extra">Extra</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="total-budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Budget
                  </label>
                  <input
                    id="total-budget"
                    type="number"
                    placeholder="Enter total budget"
                    className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="spent"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Spent
                  </label>
                  <input
                    id="spent"
                    type="number"
                    placeholder="Enter percentage"
                    className="border-2 p-2 mb-4 border-gray-300 rounded-lg w-full"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md w-full"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {categoryDetailsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative  overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
            <div className="mx-5 my-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Budget Details
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-1 px-3 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Category Name
                  </h3>
                  <p className="text-gray-600">Design</p>
                </div>

                <div className="bg-gray-50 p-1 px-3 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Total Budget
                  </h3>
                  <p className="text-gray-600">₹ 11,500</p>
                </div>
                <div className="bg-gray-50 p-1 px-3 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Total Spent
                  </h3>
                  <p className="text-gray-600">₹ 6000</p>
                </div>
                <div className="bg-gray-50 p-1 px-3 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Percentage
                  </h3>
                  <p className="text-gray-600">23%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeBudget;
