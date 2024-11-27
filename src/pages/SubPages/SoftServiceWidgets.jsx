import React, { useEffect, useState } from "react";
import { getSoftServices,getServicesChecklist, getServicesTaskList } from "../../api"; 
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { DNA } from "react-loader-spinner";


const SoftServiceWidgets = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [filteredRoutineData, setFilteredRoutineData] = useState("");
    const [filteredChecklistData, setFilteredChecklistData] = useState([]);
    const [pendingCount, setPendingCount] = useState(0); 
const [completeCount, setCompleteCount] = useState(0);
const [overdueCount, setOverdueCount] = useState(0);
useEffect(() => {
  try {
    const fetchServicesChecklist = async () => {
      const checklistResponse = await getServicesChecklist();
      const sortedChecklists = checklistResponse.data.checklists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFilteredChecklistData(sortedChecklists);
      // setChecklists(sortedChecklists);
      console.log(checklistResponse);
    };
    fetchServicesChecklist();
  } catch (error) {
    console.log(error);
  }
}, []);
    useEffect(() => {
      const fetchServiceRoutine = async () => {
        try {
          const ServiceRoutineResponse = await getServicesTaskList();
         console.log("soft services dashboard",ServiceRoutineResponse)
         setFilteredRoutineData(ServiceRoutineResponse.data)
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchServiceRoutine();
    }, []);
    
    useEffect(() => {
        const fetchService = async () => {
          try {
            const serviceResponse = await getSoftServices();
            const sortedServiceData = serviceResponse.data.sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            });
            setFilteredData(sortedServiceData);
            // setServices(sortedServiceData);
            console.log(serviceResponse);
          } catch (error) {
            console.log(error);
          }
        };
        fetchService();
      }, []);
      const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
      };
      const column = [
        {
          name: "Action",
          cell: (row) => (
            <div className="flex items-center gap-4">
              <Link to={`/services/service-details/${row.id}`}>
                <BsEye size={15} />
              </Link>
              <Link to={`/services/edit-service/${row.id}`}>
                <BiEdit size={15} />
              </Link>
            </div>
          ),
        },
    
        {
          name: "Service Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Building",
          selector: (row) => row.building_name,
          sortable: true,
        },
        {
          name: "Floor",
          selector: (row) => row.floor_name,
          sortable: true,
        },
        {
          name: "Unit",
          selector: (row) => row?.units.map((unit)=>(
            <div className="flex gap-2">
              <p key={unit.id}>{unit.name},</p>
            </div>
          )),
          sortable: true,
        },
    
        {
          name: "Created by",
          selector: (row) => row.user_name,
          sortable: true,
        },
    
        {
          name: "Created On",
          selector: (row) => dateFormat(row.created_at),
          sortable: true,
        },
      ];
  return (
    <section className="flex ">
    <Navbar />
    <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
      <div className="flex gap-4 items-center overflow-auto p-2 ">
        <p
          className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col hover:bg-blue-400 hover:backdrop-blur-sm hover:bg-opacity-45 border-blue-400 cursor-pointer text-blue-400 border-4 items-center  text-sm w-fit font-medium transition-all duration-300"
          onClick={() => setShowData("all")}
        >
          Total services
          <span className="font-medium text-base text-black">
          {filteredRoutineData.total_services}
          </span>
        </p>
        {/* <p
          className="bg-white min-w-44 shadow-custom-all-sides p-4 hover:bg-green-400 hover:backdrop-blur-sm hover:bg-opacity-45 border-green-400 rounded-md flex flex-col cursor-pointer border-4 items-center text-gray-500 text-sm w-fit font-medium transition-all duration-300"
          style={{ color: "#155724" }}
          onClick={() => setShowData("inUse")}
        >
          Services in Use
          <span className="font-medium text-base text-black">
           9
          </span>
        </p> */}
        <p
            className="bg-white min-w-44 shadow-custom-all-sides p-4 hover:bg-green-400 hover:backdrop-blur-sm hover:bg-opacity-45 border-green-400 rounded-md flex flex-col cursor-pointer border-4 items-center text-gray-500 text-sm w-fit font-medium transition-all duration-300"
            style={{ color: "#721c24" }}
          onClick={() => setShowData("breakdown")}
        >
          Checklist
          <span className="font-medium text-base text-black">
          {filteredRoutineData.checklist}
          </span>
        </p>
        <p
            className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col hover:bg-red-400 hover:backdrop-blur-sm hover:bg-opacity-45 border-4 items-center cursor-pointer border-red-400 text-gray-500 text-sm w-fit font-medium transition-all duration-300"
            style={{ color: "#721c24" }}
            onClick={() => setShowData("breakdown")}
          >
            Tasks
            <span className="font-medium text-base text-black">
            {filteredRoutineData.tasks}
            </span>
          </p>
        <p className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center cursor-pointer border-yellow-400 text-yellow-500 text-sm w-fit font-medium">
        Tasks Pending
            <span className="font-medium text-base text-black">  {filteredRoutineData.by_status?.pending || 0}</span>
          </p>
          <p className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center cursor-pointer border-cyan-400 text-cyan-500 text-sm w-fit font-medium">
          Tasks Completed
            <span className="font-medium text-base text-black">{filteredRoutineData.by_status?.complete || 0}</span>
          </p>
          <p className="bg-white min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center cursor-pointer border-orange-500 text-orange-500 text-sm w-fit font-medium">
          Tasks Overdue
            <span className="font-medium text-base text-black">{filteredRoutineData.by_status?.overdue || 0}</span>
          </p>
      </div>
      {filteredData.length !== 0 ? (
          <Table columns={column} data={filteredData} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <DNA
              visible={true}
              height="120"
              width="120"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
    </div>
  </section>
  )
}

export default SoftServiceWidgets