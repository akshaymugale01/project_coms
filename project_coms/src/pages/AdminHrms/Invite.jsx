import React, { useState } from "react";
import AdminHRMS from './AdminHrms';
import { FaTrash } from "react-icons/fa";
import AddEmployeeDetailsList from "./AddEmployeeDetailsList";
import { GrHelpBook } from "react-icons/gr";

const Invite = () => {
    const formFields = [
        'PF Applicable',
        'ESIC Applicable',
        'PT Applicable',
        'LWF Applicable',
        'IT Applicable',
        'Gratuity Applicable',
        'NPS Applicable'
      ];
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
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
        <AddEmployeeDetailsList/>
    <div className= "w-full p-6 bg-white rounded-lg shadow-md">
      
     
     
    

     

       

      
            <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Invite
          </h2>
        

     

      
    </div>
    
    <div className='my-4 mx-2 w-fit'>
      <div className="flex flex-col  shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
          <h2>Tool Tips</h2></div>
    <div className=' '>
             
            </div></div></div>
    </div>
  );
}

export default Invite