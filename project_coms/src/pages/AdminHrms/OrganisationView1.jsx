import React, { useEffect, useState } from "react";
import OrganizationTree from "./OrganisationTree";
import { FaTrash } from "react-icons/fa";
import { getMyHRMSEmployees, postHeadOfCompany } from "../../api";
import Select from "react-select";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const OrganisationView1 = () => {
  const [headsOfCompany, setHeadsOfCompany] = useState([1]);
  const [selectedHeads, setSelectedHeads] = useState({});
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  // Add another Head of Company
  const addHeadOfCompany = () => {
    setHeadsOfCompany([...headsOfCompany, headsOfCompany.length + 1]);
  };

  // Delete a Head of Company from the list
  const deleteHeadOfCompany = (indexToDelete) => {
    setHeadsOfCompany(
      headsOfCompany.filter((_, index) => index !== indexToDelete)
    );
    setSelectedHeads((prevSelectedHeads) => {
      const newSelectedHeads = { ...prevSelectedHeads };
      delete newSelectedHeads[indexToDelete];
      return newSelectedHeads;
    });
  };

  // Handle the selection change for each Head of Company
  const handleUserChangeSelect = (selectedOption, index) => {
    setSelectedHeads({
      ...selectedHeads,
      [index]: selectedOption, // Save the selected employee for the given head
    });
  };

  // Fetch the list of employees
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getMyHRMSEmployees(hrmsOrgId);
        const employeesList = res.map((emp) => ({
          value: emp.id,
          label: `${emp.first_name} ${emp.last_name}`,
        }));
        setEmployees(employeesList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, [hrmsOrgId]);

  const themeColor = useSelector((state) => state.theme.color);

  const handleAddHeadOfCompany = async () => {
    const postData = new FormData();
    const selectedEmployeeIds = Object.values(selectedHeads).map(
      (employee) => employee.value
    );
    selectedEmployeeIds.forEach((empId)=>(
      postData.append("head_of_company", empId)

    ))
    postData.append("organization", hrmsOrgId);
    try {
      await postHeadOfCompany(postData);
      toast.success("Head of company added successfully!");
    } catch (error) {
      console.log("Error while submitting data:", error);
    }
  };

  return (
    <section className="flex mb-10">
      <OrganizationTree />
      <div className="w-full flex flex-col overflow-hidden">
        <label htmlFor="" className="mt-5 font-semibold">
          Step-1
        </label>
        <p className="border-b text-center font-medium text-lg">
          Assign Head of Company
        </p>

        {headsOfCompany.map((head, index) => (
          <div key={index} className="flex flex-col gap-2 px-4 py-2">
            <label htmlFor={`headOfCompany${head}`} className="font-medium">
              Select Head of Company {head}
            </label>
            <div className="flex items-center gap-2 w-full">
              <Select
                closeMenuOnSelect={true}
                options={employees}
                noOptionsMessage={() => "No Employee Available"}
                onChange={(selectedOption) =>
                  handleUserChangeSelect(selectedOption, index)
                }
                value={selectedHeads[index] || null} // Make sure the selected employee shows up
                placeholder="Select Employees"
                className="w-full"
              />
              <button
                onClick={() => deleteHeadOfCompany(index)}
                className="ml-2 p-1 text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addHeadOfCompany}
          className="mt-3 p-2 w-64 bg-blue-500 text-white rounded-md"
        >
          Add Head of Company
        </button>

        <div className="flex justify-center">
          <button
            className="p-2 text-white rounded-md px-4"
            style={{ background: themeColor }}
            onClick={handleAddHeadOfCompany}
          >
            Submit
          </button>
        </div>
      </div>
      {/* <OrganizationTree/> */}
    </section>
  );
};

export default OrganisationView1;
