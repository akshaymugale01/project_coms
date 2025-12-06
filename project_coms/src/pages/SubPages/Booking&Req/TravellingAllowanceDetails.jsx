import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTravellingAllowanceRequestDetails } from '../../../api';

import { useParams } from "react-router-dom";
const TravelingAllowanceDetails = () => {
 
  const {id}= useParams()
  const themeColor = useSelector((state) => state.theme.color);
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    expense_category: "",
    date_of_expense: "",
    description_of_expense: "",
    amount_spent: "",
    approval_status: "",
    reimbursement_amount: "",
    reimbursement_method: "",
    manager_approval: false,
    reimbursement_confirmation_email: ""
});
useEffect(() => {
  const fetchTravelAllowanceDetails = async () => {
    try{
    const HotelreqDetailsResponse = await getTravellingAllowanceRequestDetails(id);
    const data = HotelreqDetailsResponse.data;
    console.log(data);
    setFormData({
      ...formData,
     
      employee_id: data.employee_id,
    employee_name: data.employee_name,
    expense_category: data.expense_category,
    date_of_expense: data.date_of_expense,
    description_of_expense: data.description_of_expense,
    amount_spent: data.amount_spent,
    approval_status: data.approval_status,
    reimbursement_amount: data.reimbursement_amount,
    reimbursement_method:data.reimbursement_method,
    manager_approval: data.manager_approval,
    reimbursement_confirmation_email: data.reimbursement_confirmation_email
    });
  }catch (error) {
    console.log(error);
  }
  };
  fetchTravelAllowanceDetails();
}, []);
  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4 max-h-screen overflow-y-auto">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
          Traveling Allowance Details
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Employee Name:</label>
    <p>{formData.employee_name}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Employee ID:</label>
    <p>{formData.employee_id}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Expense Category:</label>
    <p>{formData.expense_category}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Date of Expense:</label>
    <p>{formData.date_of_expense}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Description of Expense:</label>
    <p>{formData.description_of_expense}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Amount Spent:</label>
    <p>{formData.amount_spent}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Supporting Documents:</label>
  
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Approval Status:</label>
    <p>{formData.approval_status}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Reimbursement Amount:</label>
    <p>{formData.reimbursement_amount}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Reimbursement Method:</label>
    <p>{formData.reimbursement_method}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Manager Approval:</label>
    <p>{formData.manager_approval?"Yes":"No"}</p>
  </div>

  <div className="flex gap-2 items-center w-full">
    <label className="font-semibold">Reimbursement Confirmation Email:</label>
    <p>{formData.reimbursement_confirmation_email}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default TravelingAllowanceDetails;