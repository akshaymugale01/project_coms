import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io'
import Select from "react-select";
import Navbar from '../../../components/Navbar';

function EditInvoiceApprovalsSetup() {
    const [invoiceApproval, setInvoiceApproval] = useState([]);
    const handleAddInvoiceApproval = (event) => {
        event.preventDefault();
        setInvoiceApproval([...invoiceApproval, { nameLevel: '', order: '' }]);
    };
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInvoiceApproval = [...incident];
        newInvoiceApproval[index][name] = value;
        setInvoiceApproval(newInvoiceApproval);
    };
    const handleRemoveInvoiceApproval = (index) => {
        const newInvoiceApproval = [...invoiceApproval];
        newInvoiceApproval.splice(index, 1);
        setInvoiceApproval(newInvoiceApproval);
    };
    const [formData, setFormData] = useState({
        users:[],
        repeat: false,
      });
    const options = [
        {
          value: "Akshat",
          label: "Akshat",
          email: "akshat.shrawat@vibecopilot.ai",
        },
        { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
        { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
      ];
  return (
    <section className='flex'>
        <div className='hidden md:block'>
            <Navbar/>
        </div>
        <div className="w-full flex  flex-col overflow-hidden ">
            <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white mx-5 ">
                Edit Invoice Approval
            </h2>
            <div className='flex justify-center my-5'>
            <div className='w-3/4 border-2 mb-5 border-black rounded-md'>
            <div className='md:grid grid-cols-4 gap-5 mx-5'>
                <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold  my-2">
                       Function
                    </label>
                    <select className="border p-1 px-4 border-gray-500 rounded-md">
                        <option value="">Select Function</option>
                        <option value="">Purchase Order</option>
                        <option value="">GRN</option>
                        <option value="">Work Order</option>
                        <option value="">Work Order Invoice</option>
                    </select>
                </div>
            </div>
            <h2 className=" text-lg border-black border-b font-semibold mx-5 my-3">
                Approval Levels
            </h2>
            <div className='md:grid grid-cols-2 item-start gap-x-4 mx-5 '>
                <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold my-2">
                        Order 
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Order"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="" className="font-semibold my-2">Name of Level
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Order"
                      className="border p-1 px-4 border-gray-500 rounded-md"
                    />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="" className="font-semibold ">
                        Users 
                    </label>
                    <Select
                      className=' p-1 rounded-md z-10'
                      options={options}
                      isMulti
                      value={formData.users}
                      onChange={(selectedOption) =>
                      setFormData({ ...formData, users: selectedOption })}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-3 md:my-8">
                        <input type="checkbox" name="occupant_user" id="Helpdesk"/>
                        <label htmlFor="Helpdesk" className='font-semibold'>Active</label>
                    </div>
                </div>
            </div>
            <div>
                {invoiceApproval.map((invoiceApproval1, index) => (
                    <div key={index}>
                        <div className='md:grid grid-cols-2 item-start gap-x-4 mx-5 '>
                            <div className="flex flex-col ">
                                <label htmlFor="" className="font-semibold my-2">
                                    Order 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Order"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={invoiceApproval.order}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor="" className="font-semibold my-2">
                                    Name of Level 
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter Name of Level"
                                  className="border p-1 px-4 border-gray-500 rounded-md"
                                  value={invoiceApproval.levelName}
                                  onChange={(event) => handleInputChange(index, event)}
                                />
                            </div>
                            <div className="flex flex-col my-2"> 
                                <label htmlFor="" className="font-semibold">
                                    Users 
                                </label>
                                <div className='flex gap-3'>
                                <Select
                                  className=' p-1 rounded-md z-20 w-full'
                                  options={options}
                                  isMulti
                                  value={formData.users}
                                  onChange={(selectedOption) =>
                                  setFormData({ ...formData, users: selectedOption })}
                                />
                                <button onClick={() => handleRemoveInvoiceApproval(index)}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-5" onClick={handleAddInvoiceApproval} >
                    <IoMdAdd /> 
                </button>
            </div>
            <div className='flex gap-3 my-3 justify-center mr-5 '>
                <button to="" className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md "  >
                    Update
                </button>
            </div>
            </div>
            </div>
        </div>
    </section>
  )
}
export default EditInvoiceApprovalsSetup