import React, { useState } from "react";

const AddOnBoarding = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleDegreeChange = (event) => {
    setShowOtherInput(event.target.value === 'Other');
  };
  return(




  <div className="flex justify-center items-center my-5 w-full p-4">
    <form className="border border-gray-300 rounded-lg p-4 w-full mx-4">
      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
        New Employee Information
      </h2>
      <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            PERSONAL INFORMATION
          </h2>
      <div className="grid md:grid-cols-3 gap-5 mt-5">
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="firstName" className="font-semibold">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter First Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="lastName" className="font-semibold">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Last Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="dob" className="font-semibold">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            className="border border-gray-400 p-2 rounded-md"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="gender" className="font-semibold">
            Gender:
          </label>
          <select id="gender" className="border border-gray-400 p-2 rounded-md">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="maritalStatus" className="font-semibold">
            Marital Status:
          </label>
          <select id="maritalStatus" className="border border-gray-400 p-2 rounded-md">
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="nationality" className="font-semibold">
            Nationality:
          </label>
          <input
            type="text"
            id="nationality"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Nationality"
          />
        </div>

        {/* <div className="grid gap-2 items-center w-full">
          <label htmlFor="passportNumber" className="font-semibold">
            Passport Number:
          </label>
          <input
            type="text"
            id="passportNumber"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Passport Number"
          />
        </div> */}
         <div className="grid gap-2 items-center w-full">
          <label htmlFor="email" className="font-semibold">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Email Address"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="phone" className="font-semibold">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Phone Number"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="permanentAddress" className="font-semibold">
            Permanent Address:
          </label>
          <input
            type="text"
            id="permanentAddress"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Permanent Address"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="currentAddress" className="font-semibold">
            Current Address:
          </label>
          <input
            type="text"
            id="currentAddress"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Current Address"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactName" className="font-semibold">
            Emergency Contact Name:
          </label>
          <input
            type="text"
            id="emergencyContactName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Emergency Contact Name"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactRelationship" className="font-semibold">
            Emergency Contact Relationship:
          </label>
          <input
            type="text"
            id="emergencyContactRelationship"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Emergency Contact Relationship"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactPhone" className="font-semibold">
            Emergency Contact Phone Number:
          </label>
          <input
            type="tel"
            id="emergencyContactPhone"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Emergency Contact Phone Number"
          />
        </div>

        <div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactEmail" className="font-semibold">
            Emergency Contact Email Address:
          </label>
          <input
            type="email"
            id="emergencyContactEmail"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Emergency Contact Email Address"
          />
        </div>
        <div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactEmail" className="font-semibold">
          National Identification Number
          </label>
          <input
            type="email"
            id="emergencyContactEmail"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter National Identification Number"
          />
        </div><div className="grid gap-2 items-center w-full">
          <label htmlFor="emergencyContactEmail" className="font-semibold">
            Emergency Contact Email Address:
          </label>
          <input
            type="email"
            id="emergencyContactEmail"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Emergency Contact Email Address"
          />
        </div>
</div>
        <h2 className="border-b text-center text-xl border-black mb-6 font-bold mt-2">
            EDUCATION INFORMATION
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

      {/* <div className="grid gap-2 items-center w-full">
          <label htmlFor="degreeName" className="font-semibold">
            Degree Name:
          </label>
          <input
            type="text"
            id="degreeName"
            className="border border-gray-400 p-2 rounded-md"
            placeholder="Enter Degree Name"
          />
        </div> */}

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
  <label htmlFor="class12YearOfGraduation" className="font-semibold">
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
  <label htmlFor="class10YearOfGraduation" className="font-semibold">
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
              EMPLOYMENT INFORMATION
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
      <div className="flex gap-5 justify-center items-center my-4">
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
    </form>

  </div>
  );
};

export default AddOnBoarding;