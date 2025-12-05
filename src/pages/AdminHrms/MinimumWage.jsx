import React, { useState } from 'react';
import PayrollSettingDetailsList from './PayrollSettingDetailsList';
import { GrHelpBook } from "react-icons/gr";

const MinimumWage = () => {
  const [LIN, setLIN] = useState('');
  const [isESIC, setIsESIC] = useState(false);
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

    <div className="w-2/3 p-8 bg-white shadow-md rounded-lg">
      <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mb-6">Minimum wage Settings</h2>
      <button 
        onClick={() => setIsEditing(!isEditing)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {isEditing ? 'Save' : 'Edit'}
      </button></div>
      {/* <div className="mb-4">
        <label className="block mb-2 font-semibold">What LIN number have you registered your Company with?</label>
        <input 
          type="text" 
          value={LIN} 
          onChange={(e) => setLIN(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div> */}
    
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basis">
            On what basis will minimum wage be calculated?
          </label>
          <select
            id="basis"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            disabled={!isEditing}          // value={basis}
            // onChange={(e) => setBasis(e.target.value)}
          >
            <option>Basic + DA + Special Separately</option>
            <option>Basic + DA</option>
            <option>Basic + Special</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Would you like to interchange DA and Special where applicable?
          </label>
          <div className="flex items-center">
            <input
              id="interchange-yes"
              type="radio"
              className="form-radio"
              disabled={!isEditing}
            //   checked={interchange === true}
            //   onChange={() => setInterchange(true)}
            />
            <label htmlFor="interchange-yes" className="ml-2">
              Yes
            </label>
            <input
              id="interchange-no"
              type="radio"
              className="form-radio ml-6"
              disabled={!isEditing}
            //   checked={interchange === false}
            //   onChange={() => setInterchange(false)}
            />
            <label htmlFor="interchange-no" className="ml-2">
              No
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hra-components">
            Minimum HRA calculated on what components?
          </label>
          <select
            id="hra-components"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing ? 'bg-gray-200' : ''}`} 
            disabled={!isEditing}          // value={hraComponents}
            // onChange={(e) => setHraComponents(e.target.value)}
          >
            <option>Basic + DA</option>
            <option>Basic</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Do you want to stop the creation or updation of CTC in case of a minimum wage violation?
          </label>
          <div className="flex items-center">
            <input
              id="stop-ctc-yes"
              type="radio"
              className="form-radio"
            //   checked={stopCtc === true}
            //   onChange={() => setStopCtc(true)}
            disabled={!isEditing}
            />
            <label htmlFor="stop-ctc-yes" className="ml-2">
              Yes
            </label>
            <input
              id="stop-ctc-no"
              type="radio"
              className="form-radio ml-6"
              disabled={!isEditing}
            //   checked={stopCtc === false}
            //   onChange={() => setStopCtc(false)}
            />
            <label htmlFor="stop-ctc-no" className="ml-2">
              No
            </label>
          </div></div>
     
    </div> 
    <div className="my-4 mx-2 w-fit">
      <div className="flex flex-col shadow-custom-all-sides bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
        <div className="flex  gap-4 font-medium">
        <GrHelpBook size={20} />
        <h2>Help Center</h2>
        </div>
    <div className=' mt-1'>
              {/* <p className="font-medium">Help Center</p> */}
              <ul style={listItemStyle} className="flex flex-col gap-2">
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    The parameters for the minimum wage calculation can be selected here. </li>                </ul>
                </li>
                <li>
                  <ul style={listItemStyle}>
                    <li>
                    While adding CTC in system, you can able to see flag if there is any violation in minimum wage norms.           </li>
                  </ul>
                </li>
                {/* <li>
                  <ul style={listItemStyle}>
                    <li>
                    While running Payroll you can view the calculated value in Settlement and Recovery step and confirm to considered the same in salary
                    </li>
                  </ul>
                </li> */}

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

export default MinimumWage;