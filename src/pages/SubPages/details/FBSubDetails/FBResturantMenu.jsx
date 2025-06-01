import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import FBDetails from "../FBDetails";
import { FiDownload } from "react-icons/fi";
import FileInputBox from "../../../../containers/Inputs/FileInputBox";
import { useParams } from "react-router-dom";
import { getRestaurtantMenu } from "../../../../api";

const FBRestaurtantMenu = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state)=> state.theme.color)
  const [setshowImport, setShowImportModal] = useState(false);
  const openModalImport = () => setShowImportModal(true);
  const closeModalImport = () => setShowImportModal(false);
  const {id} = useParams();
  const [fbmenu, setFbmenu] = useState([]);
  useEffect(() => {
    const fetchFB = async () => {
      try {
        const fbRes = await getRestaurtantMenu(id);
        console.log(fbRes);
        setFbmenu(fbRes.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchFB();
  }, [id]);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };
  const columns = [
    {
      name: "Action",
      cell: (row) => (

        <div className="flex items-center gap-4">
             <Link to={`/admin/fb-resmenudetails/${id}/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-resmenu/${id}/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      sortable: true,
    },

      {
        name: "Products",
        selector: (row) => row.name,
        sortable: true,
      },

      {
        name: "Master Price",
        selector: (row) => row.master_price,
        sortable: true,
      },
      {
        name: "Display Price",
        selector: (row) => row.price,
        sortable: true,
      },

      {
        name: "Category",
        selector: (row) => row.category_name,
        sortable: true,
      },
      {
        name: "SubCategory",
        selector: (row) => row.sub_category_name,
        sortable: true,
      },
      {
        name: "Created On",
        selector: (row) => formatDate(row.created_at),
      },
      {
        name: "Updated On",
        selector: (row) => formatDate(row.updated_at),
      },
      {
        name: "Status",
        selector: (row) => (
          <div className="flex items-center gap-4">
            <input type="checkbox" checked={row.active}/>
          </div>
        ),
        sortable: true,
      },
        
     



    // {
    //   name: "Cancellation",
    //   selector: (row) => (row.status === "Upcoming" && <button className="text-red-400 font-medium">Cancel</button>),
    //   sortable: true,
    // },
  ];

 




  

  return (
    <section className="flex">
<FBDetails/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-end mt-10 my-2">
          {/* <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcoming"
                name="status"
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcoming" ||
                  selectedStatus === "upcoming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcoming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                //   onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="completed" className="text-sm">
                Cancelled
              </label>
            </div>
          </div> */}
          <span className="flex gap-4">
            <Link
                to={`/admin/fb-res-menu/${id}`}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                
            >
                <PiPlusCircle size={20} />
                Add
            </Link>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"  onClick={openModalImport}>
              <FiDownload/>  Import
            </button>
            {/* <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Filter
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                History
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                All
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                In
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Out
            </button> */}
        </span>
        </div>
        <Table

          columns={columns}
          data={fbmenu}

          isPagination={true}

        />
         {setshowImport && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold text-center mb-4">Bulk Upload</h2>
            {/* Advanced Filter Fields */}
         {/* <FileInputBox handleChange={handleFileChange} fieldName="checklist" isMulti={true}/> */}
         <FileInputBox/>
            <div className="mt-4 flex justify-end space-x-4">
              <button
              // onClick={handleDownload}
              className="bg-red-500 text-white px-4 py-2 rounded"
              style={{ background: themeColor }}
              >
                Download Sample Format
              </button>
              <button
                onClick={closeModalImport}
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
              >
                Cancel
              </button>
              <button
                
                className="bg-green-500 text-white px-4 py-2 rounded"
                style={{ background: themeColor }}
                // onClick={handleImportChecklist}
              >
                Import
              </button>
            </div>
            {/* {importStatus && <p className="mt-4 text-center">{importStatus}</p>} */}
        </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default FBRestaurtantMenu