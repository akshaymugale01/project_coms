import React from "react";
import Detail from "../../../containers/Detail";

const DeliveryStaffDetails = () => {
  const DeliveryDetails = [
    { title: "Mobile Number  :", description: "1234567890" },
    { title: "Visitor Name  :", description: "ABC" },
    { title: "Vehicle Number  :", description: "76" },
    { title: "Notes :", description: "abcd" },
    { title: "Expected Date  :", description: "27/10/2024" },
    { title: "Expected Time  :", description: "5:30 PM" },
   
  ];
  return (
    <div className="w-screen">
      <Detail heading={"Delivery Details"} details={DeliveryDetails} />
    </div>
  );
};

export default DeliveryStaffDetails;