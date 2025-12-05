import React from "react";
import EmployeePortal from "../../../components/navbars/EmployeePortal";
import Navbar from "../../../components/Navbar";

const PayslipData = () => {
    const payslipData = {
        earnings: [
          { description: 'Basic', amount: '33,333.00' },
          { description: 'House Rent Allowance', amount: '16,667.00' },
          { description: 'Gross Earnings', amount: '50,000.00' }
        ],
        deductions: [
          { description: 'Income Tax', amount: '24,000.00' },
          { description: 'Provident Fund', amount: '20.00' },
          { description: 'Professional Tax', amount: '200.00' },
          { description: 'Total Deductions', amount: '24,220.00' }
        ]
      };
  return (
    <section className="flex">
      <Navbar />
      <div className="p-2 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <div className="border-2 border-gray-400 rounded-md h-full p-4 mx-2">
          <div className="flex justify-between border-b border-black items-end">
            <div>
              <h2 className="text-2xl font-medium">VibeCopilot</h2>
              <p className=" text-sm  text-gray-500">
                Address : 314, SAMRUDDHI BUSINESS PARK BEHIND EVERSHINE MALL,
                New Link Rd, Chincholi Bunder, Malad West.
              </p>
            </div>
            <div>
              <h2 className=" font-medium">Payslip For the Month</h2>
              <p className=" text-center  text-gray-700 text-xl font-medium">
                July 2024
              </p>
            </div>
          </div>
          <div className="flex justify-between mx-5">
            <div>
              <h2 className="font-medium my-2">Employee Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <p>Employee Name : </p>
                <p>Kunal Sah</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>Employee ID : </p>
                <p>0001</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>Pay Period : </p>
                <p>July 2024</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>Pay Date: </p>
                <p>: 31/07/2024</p>
              </div>
            </div>
            <div>
              <div className="border border-gray-400 h-30 w-30 rounded-lg m-5 p-2 w-60">
                <div className="border-b-2 border-dotted bg-green-500 bg-opacity-30 rounded-md px-1">

                <p className="text-xl font-medium">45,800.00 </p>
                <p className="text-gray-500">Employee Net Pay</p>
              </div>
              <div>
               <p className="text-sm">
                Paid Days : 30 
                </p> 
               <p className="text-sm">
                LOP Days: 30
                </p> 
              </div>
                </div>
            </div>
            
          </div>
        </div>
        <div className="payslip-table">
      <h2 className="text-lg font-semibold my-2">Earnings and Deductions</h2>

      <div className="mb-4">
        <h3 className="font-bold">EARNINGS</h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-start">Description</th>
              <th className="border-b py-2 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payslipData.earnings.map((item, index) => (
              <tr key={index}>
                <td className="border-b py-2 px-4 ">{item.description}</td>
                <td className="border-b py-2 px-4 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-bold">DEDUCTIONS</h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-start">Description</th>
              <th className="border-b py-2 px-4 text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payslipData.deductions.map((item, index) => (
              <tr key={index}>
                <td className="border-b py-2 px-4">{item.description}</td>
                <td className="border-b py-2 px-4 text-end">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border rounded-lg border-gray-400 my-4 px-2 flex justify-between items-center">
        <div>
        <h2 className="font-medium">Total Payable Amount</h2>
        <h2 className="text-gray-500">Gross earning - Total Deductions</h2>
        </div>
        <div>
        <h2 className="font-medium text-lg bg-green-300 rounded-md p-1">₹45,800.00</h2>
        
        </div>
      </div>
    </div>
      </div>
    </section>
  );
};

export default PayslipData;
