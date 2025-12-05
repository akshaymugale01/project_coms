import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Select from "react-select";
import FileInput from "../../Buttons/FileInput";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import FileInputBox from "../../containers/Inputs/FileInputBox";

const EditProject = () => {
  const options = [
    {
      value: "Akshat",
      label: "Akshat",
      email: "akshat.shrawat@vibecopilot.ai",
    },
    { value: "Kunal", label: "Kunal", email: "kunal.sah@vibecopilot.ai" },
    { value: "Anurag", label: "Anurag", email: "anurag.sharma@vibecopilot.ai" },
  ];

  const [customFields, setCustomFields] = useState([]);
  const [fieldTitle, setFieldTitle] = useState("");

  const handleAddField = () => {
    if (fieldTitle === "") {
      return toast.error("Please Enter field Title !");
    }
    if (fieldTitle.trim()) {
      setCustomFields([...customFields, { title: fieldTitle, value: "" }]);
      setFieldTitle("");
    }
  };

  const handleFieldChange = (index, event) => {
    const newFields = customFields.map((field, i) => {
      if (i === index) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setCustomFields(newFields);
  };

  const handleRemoveField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  return (
    <section className="min-h-screen p-4 sm:p-0 flex flex-col md:flex-row">
      <div className="fixed hidden sm:block left-0 top-0 h-full md:static md:h-auto md:flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex justify-center  overflow-x-auto w-full  sm:w-full">
        <div
          className="border border-gray-300 my-2 rounded-lg sm:w-[60rem] p-8 flex flex-col gap-5"
          // onSubmit={handleSubmit}
        >
          <h2 className="text-center text-xl font-semibold p-2 bg-black rounded-full text-white">
            Edit Project
          </h2>
          <div className="flex flex-col gap-3  justify-between items-center">
            <div className="grid md:grid-cols-3 w-full gap-5">
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="ProjectTitle" className="font-semibold">
                  Project Title :
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Project Title"
                />
              </div>
              <div className="grid gap-2  items-center w-full">
                <label htmlFor="gender" className="font-semibold">
                  Priority :
                </label>
                <select
                  name="gender"
                  className="border border-gray-400 p-2 rounded-md"
                >
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="grid gap-2  items-center w-full">
                <label htmlFor="maritalStatus" className="font-semibold">
                  Start Date :
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
                  End Date :
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="border border-gray-400 p-2 rounded-md"
                />
              </div>

              <div className="grid gap-2 items-center w-full">
                <label htmlFor="budget" className="font-semibold">
                  Budget :
                </label>
                <input
                  type="text"
                  name="budget"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Budget"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="dependencies" className="font-semibold">
                  Dependencies :
                </label>
                <input
                  type="text"
                  name="dependiencies"
                  className="border border-gray-400 p-2 rounded-md"
                  placeholder="Enter Dependencies"
                />
              </div>
              <div className="grid gap-2 items-center w-full">
                <label htmlFor="dependencies" className="font-semibold">
                  Status :
                </label>
               <select className="border border-gray-400 p-2 rounded-md">
                <option value="">Selcet Status</option>
                <option value="">WIP</option>
                <option value="">COmpleted</option>
               </select>
              </div>
              {customFields.map((field, index) => (
                <div key={index} className="grid  gap-2 items-center w-full">
                  <span className="font-semibold">{field.title} :</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleFieldChange(index, e)}
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <span
                      onClick={() => handleRemoveField(index)}
                      className="bg-red-400 text-white p-1 px-4 rounded-md flex items-center cursor-pointer"
                    >
                      <CgClose />
                    </span>
                  </div>
                </div>
              ))}
              <div className="grid gap-2 items-center w-full">
                <label className="font-semibold">Add Fields :</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fieldTitle}
                    onChange={(e) => setFieldTitle(e.target.value)}
                    className="border border-gray-400 p-2 rounded-md"
                    placeholder="Field Title"
                  />
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="p-1 px-4 border-2 border-black rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-2  items-center w-full">
              <label htmlFor="maritalStatus" className="font-semibold">
                Assign To :
              </label>
              <Select
                options={options}
                isMulti
                //   value={formData.Attendees}
                //   onChange={(selectedOption) =>
                //     setFormData({ ...formData, Attendees: selectedOption })
                //   }
              />
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="notes" className="font-semibold">
                Addtional Notes :
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="3"
                className="border border-gray-400 p-2 rounded-md"
              ></textarea>
            </div>
            <div className="w-full">
              <h2 className="font-medium ">Attachments</h2>
              <div className="border border-black w-full mb-2" />
              {/* <FileInput multiple={true} /> */}
              <FileInputBox />
            </div>
          </div>
          <div className="flex justify-center my-5">
            <button className="bg-black p-1 px-4 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProject;
