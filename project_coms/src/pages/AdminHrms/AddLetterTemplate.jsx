import React, { useState } from 'react';
import DocumentDetailsList from './DocumentDetailsList';
import AdminHRMS from './AdminHrms';
import FileInputBox from '../../containers/Inputs/FileInputBox';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const AddLetterTemplate = () => {
  const [documentName, setDocumentName] = useState('');
  const [templateLabel, setTemplateLabel] = useState('');
  const [letterType, setLetterType] = useState('');
  const [approvalLevel, setApprovalLevel] = useState('Auto Approval');
  const [linkWithEmployeeDocs, setLinkWithEmployeeDocs] = useState(false);
  const [linkWithDocs, setLinkWithDocs] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const employees = [{value:'Roster Upload',label:'Roster Upload'},{ value:'Attendance audit format',label:'Attendance audit format'}];
  const employeesname = [{value:'Mittu Panda',label:'Mittu Panda'},{ value:'Akhil Nayak',label:'Akhil Nayak'}];
  const statusopt = [{value:'Failed',label:'Failed'},{ value:'Completed',label:'Completed'}];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      documentName,
      templateLabel,
      letterType,
      approvalLevel,
      linkWithEmployeeDocs,
    });
  };

  return (
    <div className='flex ml-20'>
        {/* <DocumentDetailsList/> */}
<AdminHRMS/>
    <div className="mt-10 w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Letter Template Creation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="documentName">
            Document Name
          </label>
          <input
            id="documentName"
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-md"
            placeholder=' Document Name'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="templateLabel">
            Template Label
          </label>
          <input
            id="templateLabel"
            type="text"
            value={templateLabel}
            onChange={(e) => setTemplateLabel(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-md"
            placeholder='Template Label'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="letterType">
            Type of Letter
          </label>
          <select
            id="letterType"
            value={letterType}
            onChange={(e) => setLetterType(e.target.value)}
            className="border border-gray-400 p-2 w-full rounded-md"
            required
          >
            <option value="" disabled>
              Please Select Letter Type
            </option>
            <option value="Type 1">General Letter</option>
            <option value="Type 2">Onboarding Letter</option>
            <option value="Type 3">Offboarding Letter</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Who can generate the letter?
          </label>
          <Select
        id="categories"
        isMulti
        // value={selectedOptions}
        // onChange={handleChange}
        options={employeesname}
        className="basic-multi-select w-full p-2 border border-gray-300 rounded"
        classNamePrefix="select"
      />
          <label htmlFor="" className="block text-gray-700 font-bold mb-2">How many levels of approvals you want to add?</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="autoApproval"
              name="approvalLevel"
              value="Auto Approval"
              checked={approvalLevel === 'Auto Approval'}
              onChange={() => setApprovalLevel('Auto Approval')}
              className="mr-2"
            />
            <label htmlFor="autoApproval" className="mr-4">
              Auto Approval
            </label>
            <input
              type="radio"
              id="1Level"
              name="approvalLevel"
              value="1 Level"
              checked={approvalLevel === '1 Level'}
              onChange={() => setApprovalLevel('1 Level')}
              className="mr-2"
            />
            <label htmlFor="1Level" >
              1 Level
            </label>&nbsp;&nbsp;
            <input
              type="radio"
              id="2Levels"
              name="approvalLevel"
              value="2 Levels"
              checked={approvalLevel === '2 Levels'}
              onChange={() => setApprovalLevel('2 Levels')}
              className="mr-2"
            />&nbsp;
            <label htmlFor="2Levels">
              2 Levels
            </label>
          </div>
        </div>
        {approvalLevel === '1 Level' && (
        <div>
          <label htmlFor="primaryApprover" className="block text-gray-700 font-bold mb-2 mr-4">
            Please select the primary approver for this letter template *
          </label>
          <select
            type="text"
            id="primaryApprover"
            name="primaryApprover"
            className="border border-gray-400 p-2 mt-1 w-full rounded-md"

          ><option value="">Mittu panda</option></select>
        </div>
      )}
       {approvalLevel === '2 Levels' && (
        <div>
          <label htmlFor="primaryApprover" className="block mt-4 text-gray-700 font-bold mb-2 mr-4">
            Please select the primary approver for this letter template *
          </label>
          <select
            type="text"
            id="primaryApprover"
            name="primaryApprover"
            className="border border-gray-400 p-2 mt-1  w-full rounded-md"

          ><option value="">Mittu panda</option></select>
       
        
         <label htmlFor="primaryApprover" className="block mt-2 text-gray-700 font-bold mb-2 mr-4">
           Please select the secondary approver for this letter template *
         </label>
         <select
           type="text"
           id="primaryApprover"
           name="primaryApprover"
           className="border border-gray-400 p-2 mt-1 w-full rounded-md"

         ><option value="">Mittu panda</option></select>
       </div>
      )}
        <div className="mb-4">
      <label className="block text-gray-700 mt-2 font-bold mb-2">
        Do you want to link with the existing employee documents field?
      </label>
      <div>
        <input
          type="radio"
          name="group1"
          className="mr-2"
          value="yes"
          onChange={() => setLinkWithDocs(true)}
        />
        <span>Yes</span>
        &nbsp;&nbsp;
        <input
          type="radio"
          name="group1"
          className="mr-2"
          value="no"
          onChange={() => setLinkWithDocs(false)}
        />
        <span>No</span>
      </div>
      {linkWithDocs === true && (
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">
            Please select Employee Document Field
          </label>
          <input
            type="text"
            className="border p-2 border-black rounded-md w-full py-2 px-3 text-gray-700"
            placeholder="Enter Employee Document Field"
          />
        </div>
      )}
    </div>
        <FileInputBox/>
        <p className='mt-2 '>Click here to Upload your document here .docx format {"<"} 15MB.You can insert dynamic placeholders into the document.
          To view the dynamic employee fields,click on the below button to copy/paste into your .docx file.
        </p>
        {/* <button             className="px-4 py-2 mt-2 bg-black text-white rounded-md"
        >View Dynamic Employee Fields</button> */}
        <div className="flex gap-2 mt-4 mb-2 justify-center">
        <Link
        to={"/admin/document/letter-template"}
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div></div>
  );
};

export default AddLetterTemplate