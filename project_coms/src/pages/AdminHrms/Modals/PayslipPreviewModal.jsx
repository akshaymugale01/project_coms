import React, { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

const PayslipPreviewModal = ({onClose}) => {

    
  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-gray-500 bg-opacity-50">
      <div class="max-h-[90%] h-80vh bg-white p-4 w-[60rem] rounded-lg shadow-lg overflow-y-auto">
      {/* <div class="max-h-[90%] h-80vh bg-white p-4 w-[60rem] rounded-lg shadow-lg overflow-y-auto"> */}
        <h2 className="text-2xl font-bold mb-4">Payslip Preview</h2>
        <div className="max-h-96 overflow-scroll px-2">
        {/* <div className="flex flex-col max-h-[70%]"> */}
          <div className="flex justify-between g my-2 items-center">
            <div className="flex gap-4">
              <img src="" alt="Companylogo" className="border " />
              <div className="">
                <h2 className="text-xl font-semibold">Company Name</h2>
                <p className="w-96 font-medium text-gray-500">
                  244/1952 Motilalnagar no.1, New Link Road, Near Vibgyor
                  school, Goregaon West,Mumbai, Maharashtra- 400104
                </p>
              </div>
            </div>
            <div className="font-medium">
              <p className="text-lg text-right">Payslip</p>
              <p>September 2024</p>
            </div>
          </div>
          <div className="bg-orange-500 p-4 flex justify-between rounded-sm text-white">
            <div className="w-full">
              <div className="grid grid-cols-2">
                <p>Employee Code:</p>
                <p>VC 002</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Name:</p>
                <p>ABC</p>
              </div>
              <div className="grid grid-cols-2">
                <p>City:</p>
                <p>Mumbai</p>
              </div>
              <div className="grid grid-cols-2">
                <p>State:</p>
                <p>Mumbai</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Location Name:</p>
                <p>Malad</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Department:</p>
                <p>IT</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Bank Name:</p>
                <p>Kotak</p>
              </div>
              <div className="grid grid-cols-2">
                <p>A/C Number:</p>
                <p>4843534349</p>
              </div>
            </div>
            <div className="border-l border-white pl-4 w-full">
              <div className="grid grid-cols-2 ">
                <p>Joining Date:</p>
                <p>20/04/2024</p>
              </div>
              <div className="grid grid-cols-2">
                <p>UAN Number:</p>
                <p>123</p>
              </div>
              <div className="grid grid-cols-2">
                <p>UAN Number:</p>
                <p>123</p>
              </div>
              <div className="grid grid-cols-2">
                <p>PF Number:</p>

                <p>123</p>
              </div>
              <div className="grid grid-cols-2">
                <p>ESIC Number:</p>
                <p>123</p>
              </div>
              <div className="grid grid-cols-2">
                <p>PAN Number:</p>
                <p>123</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Designation:</p>

                <p>Backend developer</p>
              </div>
            </div>
          </div>

          {/* Payroll Days Section */}
          <div className="flex justify-between items-center bg-gray-100 rounded-b-sm p-1 text-gray-700 border-t border-gray-300">
            <div className="font-semibold">Payroll Days:</div>
            {/* <div className="flex space-x-6"> */}
            <div className="flex items-center gap-4">
              <p className="text-sm">Total Days</p>
              <p className="font-medium text-orange-500">30.0</p>
            </div>
            <div className="flex gap-4">
              <p className="text-sm">Days Paid</p>
              <p className="font-medium text-orange-500">30.0</p>
            </div>
            <div className="flex gap-4">
              <p className="text-sm">Arrear Days</p>
              <p className="font-medium text-orange-500">0.0</p>
            </div>
            <div className="flex gap-4">
              <p className="text-sm">Absent Days</p>
              <p className="font-medium text-orange-500">0.0</p>
              {/* </div> */}
            </div>
          </div>
          <div className="w-full mx-auto ">
            <div className="grid grid-cols-2 gap-8  p-6 rounded-lg">
              {/* Earnings Section */}
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-semibold mb-4 text-green-600 flex items-center gap-4">
                 <FaCirclePlus /> Earnings
                </h2>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-400">
                    Earning Head
                  </span>
                  <span className="font-semibold text-gray-400">
                    Total Amount
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fixed Earnings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic</span>
                    <span>₹ 1,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DA</span>
                    <span>₹ 50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special</span>
                    <span>₹ 50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonus2</span>
                    <span>₹ 20,000</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between font-semibold">
                    <span>Gross Earnings</span>
                    <span>₹ 2,20,000</span>
                  </div>
                </div>
              </div>

              {/* Deductions Section */}
              <div className="flex flex-col justify-between border-l pl-2">
                <h2 className="text-2xl font-semibold  text-red-600 flex items-center gap-4">
                 <FaCircleMinus/>  Deductions
                </h2>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-400">
                    Earning Head
                  </span>
                  <span className="font-semibold text-gray-400">
                    Total Amount
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span>Variable Deductions</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advances</span>
                      <span>₹ 18,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Professional Tax</span>
                      <span>₹ 2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provident Fund</span>
                      <span>₹ 1,800</span>
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between font-semibold">
                  <span>Gross Deductions</span>
                  <span>₹ 20,000</span>
                </div>
              </div>
            </div>

            {/* Net Salary */}
            <div className="mx-6 p-1 bg-gray-100 flex justify-between">
              <h2 className="text-xl font-semibold">Net Salary</h2>
              <p className="text-orange-500 text-xl font-bold ">₹ 2,00,000</p>
            </div>
          </div>
          <p className="mx-6 p-1 font-medium text-gray-500 my-2 ">
            Net Amount in words : Four Lakh, Four Thousand, Four Hundred,
            Seventy Eight Rupees only.
          </p>
          <p className="mx-6 p-1 text-sm font-medium bg-red-50 ">
          Note : Employer Contribution equivalent to the employee contribution will be remitted to employee PF account directly.
          </p>
        </div>
        <div className="flex justify-center my-2">
        <button className=" border border-red-500 text-red-500 p-2 px-6 font-medium hover:bg-red-400 hover:bg-opacity-30  rounded-full " onClick={onClose}>Close</button>

        </div>
      </div>
    </div>
  );
};

export default PayslipPreviewModal;
