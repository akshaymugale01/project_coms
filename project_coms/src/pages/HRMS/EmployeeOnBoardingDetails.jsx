import React from 'react';

const EmployeeOnboardingDetails = () => {
  // Sample data (for demonstration purposes)
  const employee = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'American',
    emailAddress: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    permanentAddress: '123 Main St, Springfield',
    currentAddress: '456 Elm St, Springfield',
    emergencyContactName: 'Jane Doe',
    emergencyContactRelationship: 'Spouse',
    emergencyContactPhoneNumber: '+1987654321',
    emergencyContactEmailAddress: 'jane.doe@example.com',
    nationalIdentificationNumber: '123-456-789',
    highestDegreeObtained: 'Bachelor of Science',
    degreeName: 'Computer Science',
    majorSpecialization: 'Software Engineering',
    universityInstitutionName: 'University of Example',
    yearOfGraduation: '2012',
    gradePercentage: '3.8 GPA',
    companyName: 'Example Corp',
    jobTitle: 'Software Engineer',
    employmentStartDate: '2013-01-01',
    employmentEndDate: '2020-12-31',
    responsibilities: 'Developed web applications using React and Node.js',
    reasonForLeaving: 'Career advancement',
  };

  return (
    <div className="flex justify-center items-center my-5 w-full p-4">
      <div className="border border-gray-300 rounded-lg p-4 w-full mx-4">
        <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white">
          New Employee Details
        </h2>
        <div className='flex gap-3 item-center my-3 mx-5 flex-wrap'>
          <p className='text-sm font-bold'>HR Approval:</p>
          <button className='bg-green-400 px-2 py-1 rounded-md text-white text-sm'>
            Approved
          </button>
          {/* <p className='text-sm font-bold'>FM Admin Head Approval:</p>
          <button className='bg-green-400 px-2 py-1 rounded-md text-white text-sm'>
            Approved
          </button>
          <p className='text-sm font-bold'>FM HOD Approval:</p>
          <button className='bg-green-400 px-2 py-1 rounded-md text-white text-sm'>
            Approved
          </button>
          <p className='text-sm font-bold'>Site Accounts Team Approval:</p>
          <button className='bg-orange-400 px-2 py-1 rounded-md text-white text-sm'>
            Pending
          </button> */}
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Personal Information</h3>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">First Name:</label>
            <p className="text-sm font-normal">{employee.firstName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Last Name:</label>
            <p className="text-sm font-normal">{employee.lastName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Date of Birth:</label>
            <p className="text-sm font-normal">{employee.dateOfBirth}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Gender:</label>
            <p className="text-sm font-normal">{employee.gender}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Marital Status:</label>
            <p className="text-sm font-normal">{employee.maritalStatus}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Nationality:</label>
            <p className="text-sm font-normal">{employee.nationality}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Email Address:</label>
            <p className="text-sm font-normal">{employee.emailAddress}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Phone Number:</label>
            <p className="text-sm font-normal">{employee.phoneNumber}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Permanent Address:</label>
            <p className="text-sm font-normal">{employee.permanentAddress}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Current Address:</label>
            <p className="text-sm font-normal">{employee.currentAddress}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Emergency Contact Name:</label>
            <p className="text-sm font-normal">{employee.emergencyContactName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Emergency Contact Relationship:</label>
            <p className="text-sm font-normal">{employee.emergencyContactRelationship}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Emergency Contact Phone Number:</label>
            <p className="text-sm font-normal">{employee.emergencyContactPhoneNumber}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Emergency Contact Email Address:</label>
            <p className="text-sm font-normal">{employee.emergencyContactEmailAddress}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">National Identification Number:</label>
            <p className="text-sm font-normal">{employee.nationalIdentificationNumber}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Educational Qualifications</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Highest Degree Obtained:</label>
            <p className="text-sm font-normal">{employee.highestDegreeObtained}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Degree Name:</label>
            <p className="text-sm font-normal">{employee.degreeName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Major/Specialization:</label>
            <p className="text-sm font-normal">{employee.majorSpecialization}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">University/Institution Name:</label>
            <p className="text-sm font-normal">{employee.universityInstitutionName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Year of Graduation:</label>
            <p className="text-sm font-normal">{employee.yearOfGraduation}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Grade/Percentage:</label>
            <p className="text-sm font-normal">{employee.gradePercentage}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Employment History</h3>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Company Name:</label>
            <p className="text-sm font-normal">{employee.companyName}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Job Title:</label>
            <p className="text-sm font-normal">{employee.jobTitle}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Employment Start Date:</label>
            <p className="text-sm font-normal">{employee.employmentStartDate}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Employment End Date:</label>
            <p className="text-sm font-normal">{employee.employmentEndDate}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Responsibilities:</label>
            <p className="text-sm font-normal col-span-2">{employee.responsibilities}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Reason for Leaving:</label>
            <p className="text-sm font-normal col-span-2">{employee.reasonForLeaving}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label className="font-semibold">Attachment:</label>
            {/* <p className="text-sm font-normal col-span-2">{employee.reasonForLeaving}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOnboardingDetails;