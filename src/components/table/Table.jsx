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
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Table = ({
  columns,
  title,
  height,
  pagination = true,
  data,
  customStyles,
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [10, 20, 30, 50],
  paginationTotalRows = 0,
  onChangePage,
  onChangeRowsPerPage,
  selectableRow = false,
  onSelectedRows,
  paginationServer = false,
  currentPage = 1,
}) => {
  // Track internal page state and sync with external currentPage
  const [internalPage, setInternalPage] = useState(currentPage);

  // Update internal page when external currentPage changes
  useEffect(() => {
    setInternalPage(currentPage);
  }, [currentPage]);

  const customStyle = {
    headRow: {
      style: {
        background: "rgb(17, 24, 39)",
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
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        whiteSpace: "nowrap",
        fontSize: "14px",
        lineHeight: "24px",
        width: "200px",
        color: "#4b5260",
        fontWeight: 450,
      },
    },
  };

  const handleSelectedRowsChange = ({ selectedRows }) => {
    if (onSelectedRows) {
      onSelectedRows(selectedRows);
    }
  };

  const handlePageChange = (page) => {
    console.log("Table: handlePageChange called with page:", page);
    setInternalPage(page);
    if (onChangePage) {
      onChangePage(page);
    }
  };

  const handlePerRowsChange = (newPerPage, page) => {
    console.log("Table: handlePerRowsChange called with:", { newPerPage, page });
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(newPerPage, page);
    }
  };

  // Add key to force re-render when currentPage changes
  const tableKey = `table-${currentPage}-${paginationPerPage}`;

  return (
    <div className="rounded">
      <DataTable
        key={tableKey}
        title={title}
        responsive
        columns={columns}
        data={data}
        customStyles={customStyles || customStyle}
        pagination={pagination}
        paginationServer={paginationServer}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationTotalRows={paginationTotalRows}
        paginationDefaultPage={internalPage}
        fixedHeader
        fixedHeaderScrollHeight={height}
        selectableRowsHighlight
        selectableRows={selectableRow}
        highlightOnHover
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        onSelectedRowsChange={handleSelectedRowsChange}
      />
    </div>
  );
};

export default Table;
