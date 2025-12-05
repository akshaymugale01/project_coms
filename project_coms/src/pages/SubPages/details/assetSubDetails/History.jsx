import React from "react";
import DataTable from "react-data-table-component";

const History = () => {
  const column = [
    {
      name: "Date",

      selector: (row) => row.date,

      sortable: true,
    },
    {
      name: "Type Of Activity",
      selector: (row) => row.activity,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => (
        <div className="flex flex-col my-2">
          <div className="flex gap-1">
            <h2 className="font-medium">Model Number:</h2>
            <p>Changed From: MH02 To: 7801</p>
          </div>
          <div className="flex gap-1">
            <h2 className="font-medium">Purchased On:</h2>
            <p>Changed From: MH02 To: 7801</p>
          </div>
          <div className="flex gap-1">
            <h2 className="font-medium">Wing ID:</h2>
            <p>Changed From: MH02 To: 7801</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    { name: "Performed By", selector: (row) => row.performed, sortable: true },
  ];
  const data = [
    {
      id: 1,
      date: "16/08/2024, 02:32PM",
      activity: "Update",
      description: "Desc A",
      performed: "Karan Singh",
    },
  ];
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",
        fontSize: "12px",
      },
    },
  };

  return (
    <section>
      <div className="m-2">
        <div className="md:border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400 ">
          <div className="border-b border-gray-300 my-2">
            <h2 className="text-lg font-medium">HISTORY IN DETAILS</h2>
          </div>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="grid grid-cols-2">
              <p className="font-medium">Equipment Name:</p>
              <p>Diesel generator</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Manufacturer:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Supplier:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of Purchase:</p>
              <p>01/08/2024</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Capacity:</p>
              <p>1 gallons</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of installation:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of Commisioning:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Model Number:</p>
              <p>7801</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Serial Number:</p>
              <p>535</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Asset Code:</p>
              <p>8dd5571a0f7277cae6b2</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Manufacturer:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Supplier:</p>
              <p>Haven infoline</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of Purchase:</p>
              <p>01/08/2024</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Capacity:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of installation:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Date of Commisioning:</p>
              <p></p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Model Number:</p>
              <p>7801</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Searial Number:</p>
              <p>MUM-CREST-9090</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Asset Code:</p>
              <p>8dd5571a0f7277cae6b2</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="font-medium">Location of Asset:</p>
              <p>
                Site - Lockated Site 1 / Building - Decker Bldg / Wing - A /
                Floor - NA / Area - NA / Room - NA
              </p>
            </div>
          </div>
        </div>
        <div className="md:border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400 ">
          <div className="border-b border-gray-300 mb-5">
            <h2 className="text-lg font-medium">HISTORY IN DETAILS</h2>
          </div>
          <DataTable columns={column} data={data} customStyles={customStyle} />
        </div>
      </div>
    </section>
  );
};

export default History;
