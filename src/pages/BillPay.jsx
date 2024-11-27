import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function BillPay() {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        if (activeSection === section) {
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    };

    return (
        <section className='flex'>
            <Navbar />
            <div className='w-full flex m-3 flex-col overflow-hidden'>
                <div className=''>
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Bill Pay</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <button className="bg-gray-100 p-4 rounded" onClick={() => toggleSection('credit')}>
                                <h3 className="text-md font-semibold">Add Credit Card</h3>
                            </button>
                            <button className="bg-gray-100 p-4 rounded" onClick={() => toggleSection('loan')}>
                                <h3 className="text-md font-semibold">Add Loan</h3>
                            </button>
                            <button className="bg-gray-100 p-4 rounded" onClick={() => toggleSection('insurance')}>
                                <h3 className="text-md font-semibold">Add Insurance</h3>
                            </button>
                            <button className="bg-gray-100 p-4 rounded" onClick={() => toggleSection('debit')}>
                                <h3 className="text-md font-semibold">Add Debit Card</h3>
                            </button>
                        </div>
                    </div>
                    {activeSection === 'credit' && (
                        <div>
                            <div className='border-2 border-gray rounded-md mx-5 my-5'>
                                <h2 className='text-lg font-semibold mx-5 my-5'>Credit</h2>
                                <form>
                                    <div className='md:grid grid-cols mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-3 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Name on card
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Expiry date
                                            </label>
                                            <input
                                                type="date"
                                                placeholder="Select Date"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                CVV code
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="***"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-2 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Issuing Bank
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Issuing Bank"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Credit Limit
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Credit Limit"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Phone Number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-start space-x-4 my-5 mx-5">
                                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeSection === 'loan' && (
                        <div>
                            <div className='border-2 border-gray rounded-md mx-5 my-5'>
                                <h2 className='text-lg font-semibold mx-5 my-5'>Add Loan</h2>
                                <form>
                                    <div className='md:grid grid-cols-2 gap-3 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Loan account number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Loan account number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Lender name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Lender name"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-2 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Loan amount
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Loan Amount"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Interest rate
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Interest rate"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Phone Number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-start space-x-4 my-5 mx-4">
                                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeSection === 'insurance' && (
                        <div>
                            <div className='border-2 border-gray rounded-md mx-5 my-5'>
                                <h2 className='text-lg font-semibold mx-5 my-5'>Add Insurance</h2>
                                <form>
                                    <div className='grid grid-cols mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Insurance policy number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Insurance policy number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Insurance provider
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Insurance provider"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Policy type
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Policy type"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Coverage details
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Coverage details"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Phone Number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-start space-x-4 my-5 mx-4">
                                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeSection === 'debit' && (
                        <div>
                            <div className='border-2 border-gray rounded-md mx-5 my-5'>
                                <h2 className='text-lg font-semibold mx-5 my-5'>Debit Card</h2>
                                <form>
                                    <div className='md:grid grid-cols mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-3 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Name on card
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Expiry date
                                            </label>
                                            <input
                                                type="date"
                                                placeholder="Select Date"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                CVV code
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="***"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className='md:grid grid-cols-2 gap-4 mx-5 my-5'>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Issuing Bank
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Issuing Bank"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="accountLinked" className="font-semibold">
                                                Account Linked
                                            </label>
                                            <input
                                              type="text"
                                              placeholder="Account Linked"
                                              className="border p-1 px-4 border-gray-500 rounded-md"
                                              required
                                           />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="" className="font-semibold">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Phone Number"
                                                className="border p-1 px-4 border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-start space-x-4 my-5 mx-5">
                                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" >Cancel</button>
                                        <button  className="bg-indigo-500 text-white px-4 py-2 rounded-md">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className='border-b border-black my-5 mx-5 text-lg font-semibold'>Credit Card</h2>
                    <div className='border-2 border-gray rounded-md mx-5 my-5 md:w-96 bg-green-400' >
                        <div className='md:grid grid-cols px-5 py-5'>
                            <Link to="/admin/bill-pay-details">
                            <div className='flex justify-between'>
                                <h2 className='text-lg font-semibold my-3 text-white'>Credit Card</h2>
                                <h2 className='text-lg font-semibold my-3 text-white'>Bank Name</h2>
                            </div>
                            <div className=' text-white'><BsFillCreditCard2FrontFill size={50} /></div>
                            <div className='mb-3'>
                                <h2 className='text-2xl font-semibold text-white'>xxxxx .... .... xxxx</h2>
                            </div>
                            <div className='flex justify-between'>
                                <div className='mb-3'> 
                                    <h2 className='text-lg font-semibold text-white'>Name on Card:</h2>
                                    <p className='text-white'>Akash</p>
                                </div>
                                <div className='mb-3'>
                                    <h2 className='text-lg font-semibold text-white'>Expiry Date:</h2>
                                    <p className='text-white'>Feb 2025</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>

                   <h2 className='border-b border-black my-5 mx-5 text-lg font-semibold'>Loan</h2>
                    <div className='border-2 border-gray rounded-md mx-5 my-5 md:w-96 bg-blue-400' >
                        <div className='md:grid grid-cols px-5 py-5'>
                           <Link to="/admin/bill-pay-details">
                            <div className='flex justify-between'>
                                <h2 className='text-lg font-semibold my-3 text-white'>Loan</h2>
                                <h2 className='text-lg font-semibold my-3 text-white'>Bank Name</h2>
                            </div>
                            <div className=' text-white'><BsFillCreditCard2FrontFill size={50} /></div>
                            <div className='mb-3'>
                                <h2 className='text-2xl font-semibold text-white'>xxxxx .... .... xxxx</h2>
                            </div>
                            <div className='flex justify-between'>
                                <div className='mb-3'> 
                                    <h2 className='text-lg font-semibold text-white'>Name on Card:</h2>
                                    <p className='text-white'>Akash</p>
                                </div>
                                <div className='mb-3'>
                                    <h2 className='text-lg font-semibold text-white'>Expiry Date:</h2>
                                    <p className='text-white'>Feb 2025</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='border-b border-black my-5 mx-5 text-lg font-semibold'>Insurance</h2>
                    <div className='border-2 border-gray rounded-md mx-5 my-5 md:w-96 bg-yellow-600'>
                        <div className='md:grid grid-cols px-5 py-5'>
                            <Link to="/admin/bill-pay-details">
                            <div className='flex justify-between'>
                                <h2 className='text-lg font-semibold my-3 text-white'>Insurance</h2>
                                <h2 className='text-lg font-semibold my-3 text-white'>Bank Name</h2>
                            </div>
                            <div className=' text-white'><BsFillCreditCard2FrontFill size={50} /></div>
                            <div className='mb-3'>
                                <h2 className='text-2xl font-semibold text-white'>xxxxx .... .... xxxx</h2>
                            </div>
                            <div className='flex justify-between'>
                                <div className='mb-3'> 
                                    <h2 className='text-lg font-semibold text-white'>Name on Card:</h2>
                                    <p className='text-white'>Akash</p>
                                </div>
                                <div className='mb-3'>
                                    <h2 className='text-lg font-semibold text-white'>Expiry Date:</h2>
                                    <p className='text-white'>Feb 2025</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='border-b border-black my-5 mx-5 text-lg font-semibold'>Debit Card</h2>
                    <div className='border-2 border-gray rounded-md mx-5 my-5 md:w-96 bg-gray-400' >
                        <div className='md:grid grid-cols px-5 py-5'>
                        <Link to="/admin/bill-pay-details">
                            <div className='flex justify-between'>
                                <h2 className='text-lg font-semibold my-3 text-white'>Debit Card</h2>
                                <h2 className='text-lg font-semibold my-3 text-white'>Bank Name</h2>
                            </div>
                            <div className=' text-white'><BsFillCreditCard2FrontFill size={50} /></div>
                            <div className='mb-3'>
                                <h2 className='text-2xl font-semibold text-white'>xxxxx .... .... xxxx</h2>
                            </div>
                            <div className='flex justify-between'>
                                <div className='mb-3'> 
                                    <h2 className='text-lg font-semibold text-white'>Name on Card:</h2>
                                    <p className='text-white'>Akash</p>
                                </div>
                                <div className='mb-3'>
                                    <h2 className='text-lg font-semibold text-white'>Expiry Date:</h2>
                                    <p className='text-white'>Feb 2025</p>
                                </div>
                            </div>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default BillPay;