import React from 'react'
import FileInputBox from '../../containers/Inputs/FileInputBox'

const AddGrn = () => {

  return (
    <section>
        <h2 className="text-xl font-semibold mx-5 my-5">
            GRN 
        </h2>
        <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
            <h2 className="text-lg border-black font-semibold text-center">
                GRN DETAILS
            </h2>
            <div className="flex sm:flex-row flex-col justify-around items-center">
                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Purchase Order :
                        </label>
                        <select
                           name=""
                           id=""
                           className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                          <option value="">Select Purchase Order</option>
                          <option value="">10019 - 4500000235</option>
                          <option value="">10020 - 4500000235</option>
                          <option value="">10020 - 4500000235</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold ">
                            Supplier :
                        </label>
                        <select
                           name=""
                           id=""
                           className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                          <option value="">Pratibha Enterprises </option>
                          <option value="">Pratibha Enterprises</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold ">
                            Payment Mode
                        </label>
                        <select
                           name=""
                           id=""
                           className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                          <option value="">Select Payment Mode</option>
                          <option value="">Cheque</option>
                          <option value="">RTGS</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Invoice Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Related To
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Text"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Invoice Amount
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Invoice Date
                        </label>
                        <input
                          type="date"
                          placeholder="Enter Date"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Posting Date
                        </label>
                        <input
                          type="date"
                          placeholder="Enter Date"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Other Expense
                        </label>
                        <input
                          type="text"
                          placeholder="Other Expense"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Loding Expense
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Adjustment Amount
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Notes
                        </label>
                        <textarea
                          name=""
                          id=""
                          cols="5"
                          rows="3"
                          placeholder='Note'
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>  
                </div>
            </div>
        </div>
        <div className="border-2 flex flex-col my-5 mx-3 p-4 gap-4 rounded-md border-gray-400">
            <h2 className=" text-lg border-black font-semibold text-center">
                INVENTORY DETAILS
            </h2>
            <div className="flex sm:flex-row flex-col justify-around items-center">
                <div className="grid md:grid-cols-3 item-start gap-x-4 gap-y-8 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold ">
                            Inventory Type
                        </label>
                        <select
                           name=""
                           id=""
                           className="border p-1 px-4 border-gray-500 rounded-md"
                        >
                          <option value="">Inventory Type</option>
                          <option value=""></option>
                          <option value=""></option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="" className="font-semibold ">
                            Expected Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="4"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold ">
                            Received Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="Received Quantity"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Approved Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="Approved Quantity"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Rejected Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="Rejected Quantity"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Rate
                        </label>
                        <input
                          type="text"
                          placeholder="9300.0"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            CGST Rate
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            CGST Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            SGST Rate
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            SGST Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            IGST Rate
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Number"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            IGST Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            IGST Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            TCS Rate
                        </label>
                        <input
                          type="text"
                          placeholder="0"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            TCS Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Total Taxes
                        </label>
                        <input
                          type="text"
                          placeholder="0"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div> 
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold">
                            Total Amount
                        </label>
                        <input
                          type="text"
                          placeholder="0"
                          className="border p-1 px-4 border-gray-500 rounded-md"
                        />
                    </div> 
                    <button className="bg-black text-white p-2 text-lg rounded-md">
                        Add Batch
                    </button> 
                </div>
            </div>
        </div>
        <div className='my-3 mx-5'>
            <h2 className=" text-lg border-black font-semibold text-start my-5">
                ATTACHMENTS*
            </h2>
            <FileInputBox/>
        </div>
        <div>
            <div className='my-3 mx-5 text-end'>
                <button className="bg-black text-white p-2 text-small rounded-md ">
                    Total Amount:- 0.00
                </button>
            </div>
            <div className='my-10 mx-5 text-center'>
                <button className="bg-black text-white px-8  py-2 text-small rounded-md ">
                    Submit
                </button>
            </div>
        </div>
    </section>
  )
}

export default AddGrn