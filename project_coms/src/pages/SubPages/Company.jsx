import React, { useState } from "react";
import Account from "./Account";
import profile from "/profile.png";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import { createCompany } from "../../api";

const Company = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
const userId = getItemInLocalStorage("userId")
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (selectedFile && companyName) {
     const formData = new FormData()
     formData.append("company[name]", companyName)
     formData.append("company[created_by]",userId )
    //  formData.append('logo', selectedFile);
     try {
      const comapnyResp = await createCompany(formData)
      console.log(comapnyResp)
     } catch (error) {
      console.log(error)
     }
    } else {
      toast.error("Please select a file and enter a company name.");
    }
  };

  return (
    <div className="w-full mt-1">
      <Account />
      <div className="flex flex-col items-center justify-center my-10">
        <form className="flex flex-col  h-fit gap-4 " onSubmit={handleSubmit}>
          <div className="flex gap-4 ">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer border-2 border-black  bg-transparent rounded-md font-medium py-2 px-4 transition duration-300 ease-in-out hover:bg-black hover:border-white hover:text-white "
            >
              <span>Upload Logo</span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            {selectedFile && (
              <p className="text-sm w-32">Selected file: {selectedFile.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="company-name"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e)=>setCompanyName(e.target.value)}
              className=" p-2 border-b-[1px]  focus:outline-none  w-64"
              placeholder="Enter company name"
              required
            />
          </div>
          {/* <div className="flex gap-2 items-center ">
            <input type="checkbox" name="removeLogo" id="logo" />
            <label htmlFor="logo">Remove Company Logo</label>
          </div>
          <div className="flex gap-2 items-center ">
            <input type="checkbox" name="dailyHelpDesk" id="helpDesk" />
            <label htmlFor="helpDesk">Daily Help Desk Report Email</label>
          </div> */}
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Company;
