import React from "react";
import Detail from "../../../containers/Detail";


const EmployeeCabDetails = () => {
  const cabDetails = [
    { title: "Vehicle Number  :", description: "76" },
    { title: "Expected Date  :", description: "27/10/2024" },
    { title: "Expected Time  :", description: "5:30 PM" },
  ];
  return (
    <div className="w-screen">
      <Detail heading={"Cab Details"} details={cabDetails} />
    </div>
  );
};


export default EmployeeCabDetails;



