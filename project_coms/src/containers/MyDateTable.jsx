import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { differenceInDays, addDays, format } from "date-fns";

const MyDateTable = ({ startDate, endDate }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const daysDifference = differenceInDays(
      new Date(endDate),
      new Date(startDate)
    );

    // Generate date columns dynamically
    const dynamicColumns = [];
    for (let i = 0; i <= daysDifference; i++) {
      const currentDate = format(addDays(new Date(startDate), i), "yyyy-MM-dd");
      dynamicColumns.push({
        name: currentDate,
        selector: currentDate,
        sortable: true,
      });
    }

    // Update state with dynamic columns
    setColumns(dynamicColumns);
    const staticData = [
      {
        "2024-05-05": "Data 1",
        "2024-05-06": "Data 2",
        "2024-05-07": "Data 3",
      },
      {
        "2024-05-05": "Data 4",
        "2024-05-06": "Data 5",
        "2024-05-07": "Data 6",
      },
      // More static rows
    ];
    setData(staticData);

    // Fetch data based on startDate and endDate
    // fetchData(startDate, endDate)
    //   .then(response => {
    //     setData(response);
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
  }, [startDate, endDate]);

  const fetchData = async (startDate, endDate) => {
    // Fetch data logic here based on startDate and endDate
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      // Additional props as per your requirement
    />
  );
};

export default MyDateTable;
