// import React from "react";
// import DataTable from "react-data-table-component";
// import { useSelector } from "react-redux";

// const Table = ({ columns, data, selectRows, isPagination, title, height }) => {
//   const themeColor = useSelector((state) => state.theme.color);

//   const customStyle = {
//     headRow: {
//       style: {
//         background: themeColor,
//         color: "white",
//         fontSize: "10px",
//       },
//     },
//     headCells: {
//       style: {
//         textTransform: "upperCase",
//       },
//     },
//     cells: {
//       style: {
//         fontWeight: "bold",
//         fontSize: "10px",
//       },
//     },
//   };
//   return (
//     <div className="rounded-md mb-5 shadow-custom-all-sides">
//     <DataTable
//       title={title}
//       responsive
//       selectableRows={selectRows}
//       columns={columns}
//       data={data}
//       customStyles={customStyle}
//       pagination={isPagination}
//       fixedHeader
//       fixedHeaderScrollHeight={height}
//       selectableRowsHighlight
//       highlightOnHover
//       paginationT

//     />
//     </div>
//   );
// };

// export default Table;

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import axios from "axios";
import { getAdminPerPageComplaints } from "../../api";

const Table = ({
  columns,
  title,
  height,
  pagination = true,
  data,
  apiEndpoint,
  customStyles,
  onChangePage,
  selectableRow,
  onSelectedRows 
}) => {
  const themeColor = useSelector((state) => state.theme.color);

  
  const customStyle = {
    headRow: {
      style: {
        background: themeColor,
        color: "white",
        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "uppercase",
        paddingLeft: "16px",
        paddingRight: "16px",
        width: "150px",
        
      },
    },
    // cells: {
    //   style: {
    //
    //   },
    // },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        whiteSpace: "nowrap",
        fontSize: "14px",
        lineHeight: "24px",
        width: "150px",
        // color: "#6b7280",
        color: "#4b5260",
        fontWeight: 450
      },
    },
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    // Call the parent's callback with the selected rows
    if (onSelectedRows) {
      onSelectedRows(selectedRows);
    }
  };

  return (
    <div className="rounded">
      <DataTable
        title={title}
        responsive
        columns={columns}
        data={data}
        customStyles={customStyles || customStyle}
        pagination={pagination}
        // paginationServer
        fixedHeader
        selectableRowsHighlight
        selectableRows={selectableRow}
        highlightOnHover
        onChangePage={onChangePage}
        onSelectedRowsChange={handleSelectedRowsChange}
      />
    </div>
  );
};

export default Table;
