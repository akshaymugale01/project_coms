import React, { useState, useRef } from "react";
import EmployeeSections from "./EmployeeSections";
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import Collapsible from "react-collapsible";
import CustomTrigger from "../../containers/CustomTrigger";
const SectionLog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const column = [
    // {
    //   name: "view",

    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/admin/grn-detail/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    { name: "Transaction Type", selector: (row) => row.year, sortable: true },
    { name: "Initiated By", selector: (row) => row.td, sortable: true },
    { name: "Last Activity", selector: (row) => row.od, sortable: true },

    { name: "Status", selector: (row) => row.rd, sortable: true },
    { name: "Dates", selector: (row) => row.tp, sortable: true },
    // { name: "Actions", selector: (row) => row.ti, sortable: true },
  ];

  const data = [
    {
      year: "loan",
      td: "0",
      od: "0",
      rd: "0",
      tp: "0",
      ti: "0",
    },
  ];

  return (
    <div className="flex flex-col ml-20">
      <EditEmployeeDirectory />

      <div className="flex">
        <div className="">
          <EmployeeSections empId={id} />
        </div>

        <div className="w-full">
          <div className="bg-white rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-bold mb-6">Change Logs</h2>
            <div className="flex items-center mb-2">
              {/* <div className="flex-shrink-0">
          <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="Admin Avatar" />
        </div> */}
              <div className="ml-2 flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-800">Test</div>
                <div className="text-xs text-gray-600">
                  05-09-2023, 11:53:39 AM IST
                </div>
              </div>
            </div>
            {/* <div className="text-sm text-gray-700">Onboard welcome message:You Have Been Invited By Bodyprocoach Pvt Ltd To Activate Your Account</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLog;
