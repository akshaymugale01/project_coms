import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const BookFitness = () => {
  const [behalf, setbehalf] = useState("self");
  const [formData, setFormData] = useState({
    patientName: "",
    relationship: "",
    age: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    preference: "",
    location: "",
    doctor: "",
    reportType: "",
    reason: "",
    selectedFiles: [],
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      filesToAdd: Array.from(event.target.files),
    }));
  };

  const addFiles = () => {
    const filesWithReport = formData.filesToAdd.map((file) => ({
      file,
      report: formData.reportType,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedFiles: [...prevFormData.selectedFiles, ...filesWithReport],
      filesToAdd: [],
      reportType: "",
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedFiles: prevFormData.selectedFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center my-5 overflow-x-auto w-full sm:w-full">
        <div className="border border-gray-300 rounded-lg w-full mx-5 px-8 flex flex-col gap-5">
          <h2 className="text-center md:text-xl font-bold my-2 p-2 bg-black rounded-full text-white">
            Book Fitness Appointment
          </h2>

          <div className="grid grid-cols-4 items-center">
            <p className="font-semibold">For :</p>
            <div className="flex gap-5">
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "self" && "bg-black text-white"
                }`}
                onClick={() => setbehalf("self")}
              >
                Self
              </p>
              <p
                className={`border-2 p-1 px-6 border-black font-medium rounded-full cursor-pointer ${
                  behalf === "others" && "bg-black text-white"
                }`}
                onClick={() => setbehalf("others")}
              >
                Others
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="patientName" className="font-semibold">
                Name :
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Patient Name"
              />
            </div>

            <div className="grid gap-2 items-center w-full">
              <label htmlFor="relationship" className="font-semibold ">
                Relationship :
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">
                  {behalf === "others" ? "Select Relationship" : "Self"}
                </option>
                {behalf === "others" && (
                  <>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>
            <div className="grid  gap-2 items-center w-full">
              <label htmlFor="age" className="font-semibold">
                Age :
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
                placeholder="Enter Patient's Age"
              />
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="gender" className="font-semibold">
                Gender :
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid gap-2  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Marital Status :
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Date :
              </label>
              <input
                type="date"
                name=""
                id=""
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Mobile :
              </label>

              <input
                type="tel"
                name=""
                id=""
                className="border border-gray-400 p-2 rounded-md"
              />
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="preference" className="font-semibold">
                Preference :
              </label>
              <select
                name="preference"
                value={formData.preference}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Preference</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            {formData.preference === "offline" && (
              <div className="grid gap-2  items-center w-full">
                <label htmlFor="location" className="font-semibold">
                  Location :
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border border-gray-400 p-2 rounded-md"
                >
                  <option value="">Select Location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                </select>
              </div>
            )}
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="doctor" className="font-semibold">
                Trainer :
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md"
              >
                <option value="">Select Trainer</option>
                <option value="Doctor 1">Trainer 1</option>
                <option value="Doctor 2">Trainer 2</option>
              </select>
            </div>
          </div>
          <div className="grid gap-2  items-center w-full">
            <label htmlFor="reason" className="font-semibold">
              Reason for Appointment :
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 rounded-md"
              placeholder="Enter reason for appointment"
            ></textarea>
          </div>

          <div className="flex gap-5 justify-center items-center my-4">
            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-700 font-semibold text-xl py-1 px-4 rounded"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-400 text-black hover:bg-black hover:text-white font-semibold text-xl py-1 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};




export default BookFitness
