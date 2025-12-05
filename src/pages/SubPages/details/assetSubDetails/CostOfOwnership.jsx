import React from "react";
import Table from "../../../../components/table/Table";

function CostOfOwnership() {
  const column = [
    {
      name: "Sr.No",
      selector: (row) => row.sr_no,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Repaired/Replaced",
      selector: (row) => row.repaired_replaced,
      sortable: true,
    },
    { name: "Cost", selector: (row) => row.cost, sortable: true },
    { name: "Warranty", selector: (row) => row.warranty, sortable: true },
    { name: "Asset Name", selector: (row) => row.asset_name, sortable: true },
  ];
  const data = [
    {
      id: 1,
      date: "",
      repaired_replaced: "",
      cost: "",
      warranty: "",
      asset_name: "",
    },
  ];
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="md:border-2 flex flex-col my-5 p-4 gap-4 rounded-md border-gray-400 ">
        <div className="border-b border-gray-300 mb-5">
          <h2 className="text-lg font-medium">COST DETAILS</h2>
        </div>
        <Table columns={column} data={data} selectableRows={true}/>
      </div>
    </div>
  );
}

export default CostOfOwnership;
