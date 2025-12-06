import React, { useEffect, useState } from "react";
import { getStandardUnits } from "../../../api";

const StandardUnit = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchStandardUnit = async () => {
      const standardUnit = await getStandardUnits();
      const sortedData = standardUnit.data.sort((a,b)=> {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      setUnits(sortedData);
    };
    fetchStandardUnit();
  }, []);

  const column = [
    {
      name: "Sr.no.",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Unit Name",
      cell: (row) => unit_name,
      sortable: true,
    },
  ];

  return <div></div>;
};

export default StandardUnit;
