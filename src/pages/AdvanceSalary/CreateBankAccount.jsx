import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

function CreateBankAccount() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form data submitted:', formData);
    //     // Add form submission logic here
    // };

    return (
        <section className='flex'>
            <Navbar />
            <div className='w-full flex flex-col overflow-hidden'>
                <h2 className="text-center text-lg font-bold p-2 mx-10 my-3 bg-black rounded-full text-white">
                    Create Bank Account
                </h2>
                <div className='flex justify-center'>
                    <div className='border-2 border-gray-500 rounded-md my-5 mx-5 md:w-4/5'>
                        <div className='md:grid grid-cols-3 gap-5 mx-5 my-5'>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="birth">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="birth"
                                    name="birth"
                                    value={formData.birth}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <div className='flex gap-5'>
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            id="male"
                                            name='gender'
                                            value='male'
                                            checked={formData.gender === 'male'}
                                            onChange={handleChange}
                                            className="checked:accent-black"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="radio"
                                            id="female"
                                            name='gender'
                                            value='female'
                                            checked={formData.gender === 'female'}
                                            onChange={handleChange}
                                            className="checked:accent-black"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">
                                    City
                                </label>
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                >
                                    <option value="">Select a city</option>
                                    <option value="New York">New York</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="Houston">Houston</option>
                                    <option value="Phoenix">Phoenix</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">
                                    State
                                </label>
                                <select
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                >
                                    <option value="">Select a state</option>
                                    <option value="NY">New York</option>
                                    <option value="CA">California</option>
                                    <option value="IL">Illinois</option>
                                    <option value="TX">Texas</option>
                                    <option value="AZ">Arizona</option>
                                </select>
                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="zip">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className='md:grid grid-cols mx-5 my-5'>
                            <div className='flex flex-col'>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="border p-1 py-2 border-gray-500 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex justify-center mb-5 '>
                            <button type='submit' className='border-2 border-gray-500 rounded-md p-1 px-5'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateBankAccount;