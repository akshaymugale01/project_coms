import React, { useEffect, useState } from "react";
import { getSiteAsset, getRoutineTask} from "../../api";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { dateFormat } from "../../utils/dateUtils";

const AssetWidgets = () => {
  const [breakdownCount, setBreakdownCount] = useState([]);
  const [inUseCount, setInUseCount] = useState([]);
  const [totalAsset, setTotalAsset] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showData, setShowData] = useState("");
  const [breakDown, setBreakDown] = useState([]);
  const [inUse, setInUse] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  // const [routineTaskFilter, setRoutineTaskFilter] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSiteAsset();
        const assets = response.data.site_assets;
        setFilteredData(assets);
        setTotalAsset(assets.length);
        const sortedData = assets.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        const breakdownAssets = assets.filter(
          (asset) => asset.breakdown === true
        );
        const inUseAssets = assets.filter(
          (asset) => asset.breakdown === false || asset.breakdown === null
        );
        setAllAssets(assets);
        setBreakDown(breakdownAssets);
        setInUse(inUseAssets);
        setBreakdownCount(breakdownAssets.length);
        console.log(breakdownAssets.length);
        setInUseCount(inUseAssets.length);
        console.log(inUseAssets.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // const fetchRoutineTask = async () => {
    //   try {
    //     const taskResponse = await getRoutineTask();
    //     const completeRoutineFilter = taskResponse.filter(
    //       (routine) => routine.status === true
    //     );
    //     setRoutineTaskFilter(completeRoutineFilter)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    fetchData();
    // fetchRoutineTask();
  }, []);

  const showFilteredAssets = () => {
    if (showData === "breakdown") {
      setFilteredData(breakDown);
    } else if (showData === "inUse") {
      setFilteredData(inUse);
    } else {
      setFilteredData(allAssets);
    }
  };

  useEffect(() => {
    showFilteredAssets();
  }, [showData, allAssets, inUse, breakDown]);

  const column = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/assets/asset-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/assets/edit-asset/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },

    { name: "Floor", selector: (row) => row.floor_name, sortable: true },
    { name: "Unit", selector: (row) => row.unit_name, sortable: true },

    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "OEM Name",
      selector: (row) => row.oem_name,
      sortable: true,
    },

    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
    },

    {
      name: "Model Number",
      selector: (row) => row.model_number,
      sortable: true,
    },

    {
      name: "Group",
      selector: (row) => row.group_name,
      sortable: true,
    },
    {
      name: "Sub Group",
      selector: (row) => row.sub_group_name,
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: (row) => row.purchased_on,
      sortable: true,
    },

    {
      name: "Purchase Cost",
      selector: (row) => row.purchase_cost,
      sortable: true,
    },

    {
      name: "Critical",
      selector: (row) => (row.critical ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.breakdown ? (
          <p className="bg-red-400 p-1 px-2 rounded-full text-white">
            Breakdown
          </p>
        ) : (
          <p className="bg-green-400 p-1 px-2 rounded-full text-white">
            In Use
          </p>
        ),
      sortable: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) => dateFormat(row.created_at),
      sortable: true,
    },
    {
      name: "Updated On",
      selector: (row) => dateFormat(row.updated_at),
      sortable: true,
    },
    {
      name: "Warranty",
      selector: (row) => (row.warranty_start === null ? "No" : "Yes"),
      sortable: true,
    },
    {
      name: "W Start",
      selector: (row) => row.warranty_start,
      sortable: true,
    },

    {
      name: "Installation Date",
      selector: (row) => row.installation,
      sortable: true,
    },
    {
      name: "W Expiry",
      selector: (row) => row.warranty_expiry,
      sortable: true,
    },

    {
      name: "Meter Configured",
      selector: (row) => (row.is_meter ? "Yes" : "No"),
      sortable: true,
    },

    {
      name: "Supplier",
      selector: (row) => row.vendor_name,
      sortable: true,
    },
  ];
  return (
    <section className="flex ">
      <Navbar />
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <div className="flex gap-4 items-center overflow-auto p-2">
          <p 
            className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
              ${ 
                showData === "all"
                ? "bg-blue-400 text-white border-blue-400"
                : "bg-white text-blue-400 border-blue-400"
              }
              hover:bg-blue-400 hover:backdrop-blur-sm hover:bg-opacity-45 cursor-pointer`}
              onClick={() => setShowData("all")}
              >
                Total Assets
                <span className="font-medium text-base text-black">
                  {totalAsset}
                </span>
              </p>
              <p
                className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
                  ${
                    showData === "inUse"
                    ? "bg-green-400 text-white border-green-400"
                    : "bg-white text-green-400 border-green-400"
                  }
                  hover:bg-green-400 hover:backdrop-blur-sm hover:bg-opacity-45 cursor-pointer`}
                  style={{ color: "#155724" }}
                  onClick={() => setShowData("inUse")}
                >
                  Assets in Use
                  <span className="font-medium text-base text-black">
                  {inUseCount}
                </span>
              </p>
              <p
                className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
                  ${
                    showData === "breakdown"
                    ? "bg-red-400 text-white border-red-400" 
                    : "bg-white text-red-400 border-red-400"
                  }
                  hover:bg-red-400 hover:backdrop-blur-sm hover:bg-opacity-45 cursor-pointer`}
                style={{ color: "#721c24" }}
                onClick={() => setShowData("breakdown")}
              >
                Assets in Breakdown
                <span className="font-medium text-base text-black">
                  {breakdownCount}
                </span>
              </p>
              <p
                className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
                  ${
                    showData === "activities"
                    ? "bg-yellow-400 text-white border-yellow-400"
                    : "bg-white text-yellow-500 border-yellow-400"
                  }
                  cursor-pointer`}
                onClick={() => setShowData("activities")}
              >
                Activities Performed
                <span className="font-medium text-base text-black">0</span>
              </p>
              <p
               className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
                ${
                  showData === "ppm"
                  ? "bg-cyan-400 text-white border-cyan-400"
                  : "bg-white text-cyan-500 border-cyan-400"
                }
                cursor-pointer`}
                onClick={() => setShowData("ppm")}
              >
                PPM Performed
              <span className="font-medium text-base text-black">0</span>
            </p>
            <p
             className={`min-w-44 shadow-custom-all-sides p-4 rounded-md flex flex-col border-4 items-center text-sm w-fit font-medium transition-all duration-300 
              ${
                showData === "amc"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-orange-500 border-orange-500"
              }
              cursor-pointer`}
              onClick={() => setShowData("amc")}
            >
            AMC Performed
            <span className="font-medium text-base text-black">0</span>
          </p>
        </div>
        <div className="my-5">
          {filteredData.length !== 0 ? (
            <Table
              selectableRows
              columns={column}
              data={filteredData}
              fixedHeader
              // fixedHeaderScrollHeight="450px"
              isPagination={true}
            />
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
      </div>
    </section>
  );
};

export default AssetWidgets;
