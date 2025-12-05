import React, { useState } from "react";
import AdminHRMS from './AdminHrms';
import { FaTrash } from "react-icons/fa";

const AddBankAccount = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleDegreeChange = (event) => {
    setShowOtherInput(event.target.value === 'Other');
  };
  const [fields, setFields] = useState([{ branchName: '', bankAccount: '' }]);

  const handleAddFields = () => {
    setFields([...fields, { branchName: '', bankAccount: '' }]);
  };

  const handleRemoveFields = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleInputChange = (index, event) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  return (
    <div className='flex ml-20'>
        <AdminHRMS/>
    <div className= "w-full p-6 bg-white rounded-lg shadow-md">
   

      <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
        Banking Information
          </h2>
    
     
        <div className="grid gap-5 mt-5">
      {fields.map((field, index) => (
        <div key={index} className="grid md:grid-cols-6 gap-5">
            <div className="grid gap-2 items-center w-full">
            <label htmlFor={`branchName-${index}`} className="font-semibold">
              Account Holder Name:
            </label>
            <input
              type="text"
              id={`branchName-${index}`}
              name="branchName"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter  Name"
            
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor={`branchName-${index}`} className="font-semibold">
              Bank Name:
            </label>
            <input
              type="text"
              id={`branchName-${index}`}
              name="branchName"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Branch Name"
            
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor={`bankAccount-${index}`} className="font-semibold">
              Bank Account Number:
            </label>
            <input
              type="text"
              id={`bankAccount-${index}`}
              name="bankAccount"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Bank Account"
              value={field.bankAccount}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor={`bankAccount-${index}`} className="font-semibold">
              IFSC Code:
            </label>
            <input
              type="text"
              id={`bankAccount-${index}`}
              name="bankAccount"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter IFSC Code"
              value={field.bankAccount}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="flex ">
          
            <input
              type="checkbox"
              id={`bankAccount-${index}`}
              name="bankAccount"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Bank Account"
              value={field.bankAccount}
              onChange={(event) => handleInputChange(index, event)}
            />
              <label htmlFor={`bankAccount-${index}`} className="mt-6 ml-3 font-semibold">
             Default
            </label>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            // className="bg-gray-500 w-8 h-7 mt-4 text-white p-2 rounded-md"
          >
            <FaTrash size={15}/>
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={handleAddFields}
        className="bg-blue-500 w-48 text-white p-2 rounded-md mt-5"
      >
        Add Bank Account
      </button>
    </div>
        <div className="flex gap-5 justify-center items-center my-4">
        {/* <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Edit</button> */}

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        </div>
      
    </div></div>
  );
}

export default AddBankAccount