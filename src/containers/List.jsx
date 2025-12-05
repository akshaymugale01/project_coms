import React, { useState } from "react";
import DataTable from "react-data-table-component";
const List = ({title, title2}) => {

  const columns = [
    {
      name: "",
      selector: (row) => row.title,
    },
    {
      name: "All",
      cell: (row) => <input type="checkbox" />,
    },
    {
      name: "Add",
      cell: (row) => <input type="checkbox" />,
    },
    {
      name: "View",
      cell: (row) => <input type="checkbox" />,
    },
    {
      name: "Edit",
      cell: (row) => <input type="checkbox" />,
    },
    {
      name: "Disable",
      cell: (row) => <input type="checkbox" />,
    },
  ];

  const data = [
    {
      id: 1,
      title: title,
    },
    {
      id: 2,
      title: title2,
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default List;
