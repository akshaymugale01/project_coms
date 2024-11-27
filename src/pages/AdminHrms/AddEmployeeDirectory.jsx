import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";
import { FaTrash } from "react-icons/fa";

const AddEmployeeDirectory = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleDegreeChange = (event) => {
    setShowOtherInput(event.target.value === "Other");
  };
  const [fields, setFields] = useState([{ branchName: "", bankAccount: "" }]);

  const handleAddFields = () => {
    setFields([...fields, { branchName: "", bankAccount: "" }]);
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
    <div className="flex ml-20">
      <AdminHRMS />
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        {/* <h2 className="text-2xl font-bold mb-6">Employee Basic Information</h2> */}
        <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
          Employee Basic Information
        </h2>
        <form>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="First Name"
                required
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Email ID *
              </label>
              <input
                type="email"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Email"
                required
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Mobile Number"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                className="border border-gray-400 p-2 rounded-md"
                required
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Blood Group *
              </label>
              <select
                className="border border-gray-400 p-2 rounded-md"
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O+">O+</option>
              </select>
            </div>

            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                PAN
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="PAN NUMBER"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Aadhar No
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Aadhar Number"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select className="border border-gray-400 p-2 rounded-md">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact Name
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Emergency Contact Name"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact No.
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Emergency Contact Number"
              />
            </div>
          </div>

          {/* <h3 className="text-xl font-bold mt-6 mb-4">Family Information</h3> */}
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Family Information
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Father's Name
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Father's Name"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Mother's Name
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Mother's Name"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Spouse's Name
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Spouse's Name"
              />
            </div>
          </div>

          {/* <h3 className="text-xl font-bold mt-6 mb-4">Address Information</h3> */}
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Address Information
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Address Line 1"
                maxLength="150"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Address Line 2"
                maxLength="150"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Country"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="State/Province"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="City"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label className="block text-sm font-medium text-gray-700">
                Zip / Pin Code
              </label>
              <input
                type="text"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Zip / Pin Code"
              />
            </div>
          </div>

          {/* <h3 className="text-xl font-bold mt-6 mb-4">Payment Information</h3> */}
          {/* <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
        Payment Information
          </h2>
        <div >
          <label className="block text-sm font-medium text-gray-700">Payment Mode *</label>
          <select className="border border-gray-400 mt-2 p-2 w-64 rounded-md" required>
            <option value="cash">Cash</option>
          </select>
        </div> */}
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Education Information
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="highestDegree" className="font-semibold">
                Highest Degree Obtained:
              </label>
              <select
                id="highestDegree"
                className="border border-gray-400 p-2 rounded-md"
                onChange={handleDegreeChange}
              >
                <option value="" disabled selected>
                  Select Highest Degree Obtained
                </option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {showOtherInput && (
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="degreeName" className="font-semibold">
                  Degree Name:
                </label>
                <input
                  type="text"
                  id="otherDegree"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Enter your degree"
                />
              </div>
            )}

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="majorSpecialization" className="font-semibold">
                Major/Specialization:
              </label>
              <input
                type="text"
                id="majorSpecialization"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Major/Specialization"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="universityName" className="font-semibold">
                University/Institution Name:
              </label>
              <input
                type="text"
                id="universityName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter University/Institution Name"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="yearOfGraduation" className="font-semibold">
                Year of Graduation:
              </label>
              <input
                type="text"
                id="yearOfGraduation"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Year of Graduation"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="gradePercentage" className="font-semibold">
                Grade/Percentage:
              </label>
              <input
                type="text"
                id="gradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="gradePercentage" className="font-semibold">
                Degree Certificate:
              </label>
              <input
                type="file"
                id="gradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12UniversityName" className="font-semibold">
                College Name (Class 12):
              </label>
              <input
                type="text"
                id="class12UniversityName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter College Name (Class 12)"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label
                htmlFor="class12YearOfGraduation"
                className="font-semibold"
              >
                Year of Graduation (Class 12):
              </label>
              <input
                type="text"
                id="class12YearOfGraduation"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Year of Graduation (Class 12)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12GradePercentage" className="font-semibold">
                Marks Obtained:
              </label>
              <input
                type="text"
                id="class12GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Marks Obtained (Class 12)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12GradePercentage" className="font-semibold">
                Total Marks:
              </label>
              <input
                type="text"
                id="class12GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Total Marks (Class 12)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12GradePercentage" className="font-semibold">
                Grade/Percentage (Class 12):
              </label>
              <input
                type="text"
                id="class12GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage (Class 12)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="gradePercentage" className="font-semibold">
                12th Certificate:
              </label>
              <input
                type="file"
                id="gradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class10UniversityName" className="font-semibold">
                School Name
              </label>
              <input
                type="text"
                id="class10UniversityName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter School Name"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label
                htmlFor="class10YearOfGraduation"
                className="font-semibold"
              >
                Year of completion (Class 10):
              </label>
              <input
                type="text"
                id="class10YearOfGraduation"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Year of completion (Class 10)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12GradePercentage" className="font-semibold">
                Marks Obtained:
              </label>
              <input
                type="text"
                id="class12GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Marks Obtained (Class 10)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class12GradePercentage" className="font-semibold">
                Total Marks:
              </label>
              <input
                type="text"
                id="class12GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Total Marks (Class 10)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="class10GradePercentage" className="font-semibold">
                Grade/Percentage (Class 10):
              </label>
              <input
                type="text"
                id="class10GradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage (Class 10)"
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="gradePercentage" className="font-semibold">
                10th Certificate:
              </label>
              <input
                type="file"
                id="gradePercentage"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Grade/Percentage"
              />
            </div>
          </div>
          <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            Employment Information
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="companyName" className="font-semibold">
                Company Name:
              </label>
              <input
                type="text"
                id="companyName"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Company Name"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="jobTitle" className="font-semibold">
                Job Title:
              </label>
              <input
                type="text"
                id="jobTitle"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Job Title"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="employmentStartDate" className="font-semibold">
                Employment Start Date:
              </label>
              <input
                type="date"
                id="employmentStartDate"
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="employmentEndDate" className="font-semibold">
                Employment End Date:
              </label>
              <input
                type="date"
                id="employmentEndDate"
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="responsibilities" className="font-semibold">
                Responsibilities:
              </label>
              <textarea
                id="responsibilities"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Responsibilities"
              ></textarea>
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="reasonForLeaving" className="font-semibold">
                Reason for Leaving:
              </label>
              <input
                type="text"
                id="reasonForLeaving"
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Reason for Leaving"
              />
            </div>
          </div>
          {/* <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
        Banking Information
          </h2> */}
          {/* <div >
          <label className="block text-sm font-medium text-gray-700">Payment Mode *</label>
          <select className="border border-gray-400 mt-2 p-2 w-64 rounded-md" required>
            <option value="cash">Cash</option>
          </select>
        </div> */}
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            {/* <div className="grid gap-2 items-center w-full">
          <label htmlFor="companyName" className="font-semibold">
            Branch Name:
          </label>
          <input
            type="text"
            id="companyName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Branch Name"
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="companyName" className="font-semibold">
            Bank Account:
          </label>
          <input
            type="text"
            id="companyName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Bank Account"
          />
        </div> */}
          </div>
          {/* <div className="grid gap-5 mt-5">
      {fields.map((field, index) => (
        <div key={index} className="grid md:grid-cols-4 gap-5">
          <div className="grid gap-2 items-center w-full">
            <label htmlFor={`branchName-${index}`} className="font-semibold">
              Branch Name:
            </label>
            <input
              type="text"
              id={`branchName-${index}`}
              name="branchName"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Branch Name"
              value={field.branchName}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label htmlFor={`bankAccount-${index}`} className="font-semibold">
              Bank Account:
            </label>
            <input
              type="text"
              id={`bankAccount-${index}`}
              name="bankAccount"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Bank Account"
              value={field.bankAccount}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="flex ">
          
            <input
              type="checkbox"
              id={`bankAccount-${index}`}
              name="bankAccount"
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter Bank Account"
              value={field.bankAccount}
              onChange={(event) => handleInputChange(index, event)}
            />
              <label htmlFor={`bankAccount-${index}`} className="mt-6 ml-3 font-semibold">
             Default
            </label>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="bg-gray-500 w-8 h-7 mt-4 text-white p-2 rounded-md"
          >
            <FaTrash size={15}/>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddFields}
        className="bg-blue-500 w-48 text-white p-2 rounded-md mt-5"
      >
        Add Bank Account
      </button>
    </div> */}
          <div className="flex gap-5 justify-center items-center my-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeDirectory;
