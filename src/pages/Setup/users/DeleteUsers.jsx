import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { postDeletUsers } from '../../../api';
import { useNavigate } from 'react-router-dom';

const DeleteUsers = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        mobile: "",
        first_name: "",
        last_name: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Validate form fields
        if (!formData.email || !formData.mobile || !formData.first_name || !formData.last_name) {
            toast.error("All fields are required!");
            return;
        }

        // Initialize FormData correctly
        const formDataToSend = new FormData();
        formDataToSend.append("deleted_user[email]", formData.email);
        formDataToSend.append("deleted_user[mobile]", formData.mobile);
        formDataToSend.append("deleted_user[first_name]", formData.first_name);
        formDataToSend.append("deleted_user[last_name]", formData.last_name);

        try {
            const response = await postDeletUsers(formDataToSend);

            if (response.status == 201) {
                toast.success("Your Request Sent Sucessfully. We will revert you Soon!");
                setFormData({
                    email: "",
                    mobile: "",
                    first_name: "",
                    last_name: "",
                });
                navigate("/setup");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to delete user!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };
    return (
        <div>
            <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-md p-6 w-full max-w-lg"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Delete User
                    </h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-medium">
                            Mobile
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>

                    {/* First Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="first_name"
                            className="block text-gray-700 font-medium"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter first name"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="last_name"
                            className="block text-gray-700 font-medium"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Delete User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteUsers