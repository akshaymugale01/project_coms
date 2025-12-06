import React from "react";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";

const EmployeePantry = () => {

    const columns = [
        {
            name: "Action",
            cell: (row) => (
              <div className="flex items-center gap-4">
                <Link to={`/employees/pantry-details/${row.id}`}>
                  <BsEye size={15} />
                </Link>
              </div>
            ),
          },
        {
          name: "Item Name",
          selector: (row) => row.item_name,
          sortable: true,
        },
        {
          name: "stock",
          selector: (row) => row.stock,
          sortable: true,
        },
       
        {
          name: "Action",
          selector: (row) => (
            
              row.stock !== 0 && <button className="text-green-400">Order</button>
           
          ),
          sortable: true,
        },
      ];
    
    const data = [
        {
            id: 1,
          item_name: "Item 1",
            stock: 1,
           
            
        },
        {
            id: 2,
            item_name: "Item 2",
            stock: 0,
            
        },
    ]
    const customStyle = {
        headRow: {
          style: {
            backgroundColor: "black",
            color: "white",
    
            fontSize: "10px",
          },
        },
        headCells: {
          style: {
            textTransform: "upperCase",
          },
        },
      };


  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between my-5">
          <input
            type="text"
            placeholder="Search by level "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
        </div>
        <Table
          responsive
          columns={columns}
          data={data}
          // customStyles={customStyle}
          // pagination
          // fixedHeader
          // // fixedHeaderScrollHeight="450px"
          // selectableRowsHighlight
          // highlightOnHover
        />
      </div>
    </section>
  );
};

export default EmployeePantry;
