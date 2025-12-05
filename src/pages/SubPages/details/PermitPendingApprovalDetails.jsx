import React from "react";
import Detail from "../../../containers/Detail";

const PermitPendingApprovalDetails = () => {
  const DeliveryDetails = [
    { title: "Permit Type :", description: "abcd" },
    { title: "Status  :", description: "" },
    { title: "REF NO.  :", description: "56" },
    { title: "Site Name  :", description: "ABC" },
    { title: "Level  :", description: "ASD" },
   
  ];
  return (
    <div className="w-screen">
      <Detail heading={"Penging Approval Details"} details={DeliveryDetails} />
    </div>
  );
};

export default PermitPendingApprovalDetails;