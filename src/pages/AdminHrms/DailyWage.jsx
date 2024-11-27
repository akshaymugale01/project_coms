import React, { useState } from 'react';
import PayrollSettingDetailsList from './PayrollSettingDetailsList';
import { GrHelpBook } from "react-icons/gr";

const DailyWage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <div className='flex gap-4 ml-20'>
        <PayrollSettingDetailsList/>

    <div className="w-2/3  p-8 bg-white shadow-md rounded-lg">
      {/* <h2 className="text-2xl font-bold mb-6">Daily wage Settings</h2> */}
    
     
     
      <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mb-6">Daily wage Settings</h2>
      <button 
        onClick={() => setIsEditing(!isEditing)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {isEditing ? 'Save' : 'Edit'}
      </button></div>
    <div className="grid md:grid-cols-1 gap-5 mt-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          January:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          February:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div> <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          March:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div> <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          April:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div> 
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          May:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          June:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          July:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          August:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          September:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          october:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          November:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div> <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
          December:
          </label>
          <input
            type="number"
            id="firstName"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            readOnly={!isEditing}
          />
        </div>
        </div>
      
    
    </div> 
    <div className="my-4 mx-2 w-fit">
      <div className="flex flex-col shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
        <h2>Help Center</h2>
        </div>
    <div className=''>
             
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    If you have daily wage worker then you can set Payable days for the month. </li>                </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    If Payable days are less then set days then subtract Payable days from Set days then and enter difference as LOP days while running payroll.      </li>
                  </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                  E.g. Set Days are 26 and Payable days are 25 then enter 1 days as LOP in LOP step
                    </li>
                  </ul>
                </li>

                {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
                    You can also set password for your salary register and the password will be suffix (@MMYYYY) with your entered password. E.g. If you enter password as abcd in Payroll Setting then password for salary register for month of April 2022 would be abcd@042022
                  </p>
                </li> */}
              </ul>
            </div></div></div>
    </div>
  );
};

export default DailyWage;