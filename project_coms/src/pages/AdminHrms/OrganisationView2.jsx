import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import OrganizationTree from "./OrganisationTree";
import { getMyOrgDepartments } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const OrganisationView2 = () => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Head Of Department",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          {/* <button onClick={() => handleEditModal(row.id)}>
            <BiEdit size={15} />
          </button> */}
          {/* <button
            onClick={() => handleDeleteDepartment(row.id)}
            className="text-red-400"
          >
            <FaTrash size={15} />
          </button> */}
        </div>
      ),
    },
  ];
    const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const fetchMyDepartments = async () => {
    try {
      const departmentRes = await getMyOrgDepartments(hrmsOrgId);
      setFilteredDepartments(departmentRes);
      setDepartments(departmentRes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyDepartments();
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const filteredResult = departments.filter(
        (department) =>
          department.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          `${department.first_name} ${department.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      setFilteredDepartments(filteredResult);
    }
  };

  return (
    <section className="flex">
      <OrganizationTree />
      <div className="mt-5 w-full flex mx-2 flex-col overflow-hidden">
        <p className="font-semibold">Step-2</p>
        <p className=" font-semibold text-center border-b">Assign Head of Department</p>
        <div className="flex justify-between my-2">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-full placeholder:text-sm rounded-lg p-2"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <Table columns={columns} data={filteredDepartments} isPagination={true} />
      </div>
    </section>
  );
};

export default OrganisationView2;
