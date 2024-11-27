import React from "react";
import Detail from "../../../containers/Detail";
import { BiEdit, BiPlusCircle } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Table from "../../../components/table/Table";

const ProjectDetails = () => {
  const { id } = useParams();
  const ticketDetails = [
    { title: "Title :", description: "" },
    { title: "Priority :", description: "" },
    { title: "Start Date :", description: "" },
    { title: "End Date :", description: "" },
    { title: "Budget :", description: "" },
    { title: "Dependencies :", description: "" },
    { title: "Status :", description: "" },
    { title: "Assigned To :", description: "" },
  ];
  const themeColor = useSelector((state) => state.theme.color);

  const taskColumns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Task",
      selector: (row) => row.task,
      sortable: true,
    },
    {
      name: "Sub Task",
      selector: (row) => row.subTask,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
      sortable: true,
    },
  ];

  const taskData = [
    {
      title: "IT",
      task: "Asset Module",
      subTask: "Add Asset",
      assignedTo: "Kunal",
    },
  ];

  return (
    <div className="flex flex-col justify-around mb-10 ">
      <div className="flex justify-end m-1">
        <Link
          to={`/admin/edit-project/${id}`}
          className="border-2 border-black flex gap-2 p-1 rounded-md items-center px-4 "
        >
          <BiEdit size={20} />
          Edit
        </Link>
      </div>
      <div className="">
        <Detail details={ticketDetails} heading={"Project Details"} />
        <div>
          
        </div>
        <h2
          style={{
            background: themeColor,
          }}
          className="text-center w-screen text-white font-semibold text-lg p-2 px-4 my-2"
        >
          Additional Info
        </h2>
        <div className="flex flex-col px-4">
          <p className="font-medium">Description :</p>
          <p className="bg-gray-300 p-2 rounded-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
            praesentium ut, ea laudantium assumenda tempora!
          </p>
        </div>
        <h2
          style={{
            background: themeColor,
          }}
          className="text-center w-screen text-white font-semibold text-lg p-2 px-4 my-2"
        >
          Attachments
        </h2>
        <div className="flex flex-col px-4">
          <p className="font-medium">No Attachments</p>
        </div>
        {/* table for tasks, subtasks add task modal */}
        <div>
          <div className="flex justify-end m-1 mt-2">
            <Link
              to={`/admin/project-management/add-task/${id}`}
              className="border-2 border-black flex gap-2 p-1 rounded-md items-center px-4 "
            >
              <BiPlusCircle size={20} />
              Add Task
            </Link>
          </div>
          <Table columns={taskColumns} data={taskData} title={"Task List"} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
