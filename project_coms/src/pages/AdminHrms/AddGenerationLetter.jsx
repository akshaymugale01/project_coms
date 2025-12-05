import React, { useState } from 'react';
import AdminHRMS from './AdminHrms';
import Select from 'react-select';

const AddGenerationLetter = () => {
  const [employeeSelection, setEmployeeSelection] = useState('All Employees');
  const [ccEmployees, setCcEmployees] = useState([]);
  const [bccEmployees, setBccEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [someEmployees, setsomeEmployees] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const employees = [{value:'John Doe',label:'John Doe'},{ value:'Jane Smith',label:'Jane Smith'}];

  const handleEmployeeSelectionChange = (e) => {
    setEmployeeSelection(e.target.value);
  };

  const handleCcChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setCcEmployees(selected);
  };

  const handleBccChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setBccEmployees(selected);
  };

  const handleSpecificEmployeesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedEmployees(selected);
  };

  return (
    <div className='flex ml-20'>
       <AdminHRMS/>
    <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold mb-6">Letter Generation</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">How will you be generating this letter *</label>
        <select 
          className="block w-full p-2 border border-gray-300 rounded"
          value={employeeSelection}
          onChange={handleEmployeeSelectionChange}
        >
         
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Please Select</label>
        <select 
          className="block w-full p-2 border border-gray-300 rounded"
          value={employeeSelection}
          onChange={handleEmployeeSelectionChange}
        >
          <option value="All Employees">All Employees</option>
          <option value="Some Employees">Some Employees</option>
          <option value="Specific Employees">Specific Employees</option>
        </select>
      </div>


      {employeeSelection === 'Some Employees' && (
        <div className="mb-4">
         
              
    <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={()=>setsomeEmployees(!someEmployees)}>Filter</button>
{someEmployees && (
  <div><input type="text" className='border p-2 mt-1 border-black rounded-md'/></div>
)}
        </div>
      )}
      {employeeSelection === 'Specific Employees' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Employee(s)</label>
              
      <Select
        id="categories"
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={employees}
        className="basic-multi-select w-full p-2 border border-gray-300 rounded"
        classNamePrefix="select"
      />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Employee(s) to mark CC whenever a letter goes to an employee:</label>
        <select 
          className=" w-full p-2 border border-gray-300 rounded" 
          
        //   value={ccEmployees}
        //   onChange={handleCcChange}
        >
          {/* {employees.map((employee) => (
            <option key={employee} value={employee}>{employee}</option>
          ))} */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Employee(s) to mark BCC whenever a letter goes to an employee:</label>
        <select 
          className=" w-full p-2 border border-gray-300 rounded" 
          
        //   value={bccEmployees}
        //   onChange={handleBccChange}
        >
          {/* {employees.map((employee) => (
            <option key={employee} value={employee}>{employee}</option>
          ))} */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Download and Preview:</label>
        <select 
          className=" w-full p-2 border border-gray-300 rounded" 
          
        //   value={bccEmployees}
        //   onChange={handleBccChange}
        >
          {/* {employees.map((employee) => (
            <option key={employee} value={employee}>{employee}</option>
          ))} */}
        </select>
      </div>

      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Cancel</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create Letter</button>
      </div>
    </div></div>
  );
};

export default AddGenerationLetter;
