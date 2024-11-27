import React, { useState } from "react";
import FBRestaurtantDetails from "./FBSubDetails/FBResturantsDetails";
import EditRestaurtantBooking from "../EditResturantBooking";
import EditRestaurtantOrders from "../EditResturantOrders";
import EditCategorySetup from "../EditCategorySetup";
import EditSubCategorySetup from "../EditSubCategorySetup";
import FBStatusSetup from "./FBStatusSetup";
import FBRestaurtantMenu from "./FBSubDetails/FBResturantMenu";

// import PermitTypeTable from "./PermitTypeTable";
// import PermitActivityTable from "./PermitActivityTable";
// import PermitSubActivityTable from "./PermitSubActivityTable";
// import PermitHazardCategoryTable from "./PermitHazardCatgoryTable";
// import PermitRiskTable from "./PermitRiskTable";
const FBDetails = () => {
    const [page, setPage] = useState("Restaurtant");
  return (
    <div className="mx-5 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">

    <div className=" w-full my-2 flex  overflow-hidden flex-col">
        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">F&B DETAILS</h3>
    <div className="flex w-full">
      <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
        <h2
          className={`p-1 ${
            page === "Restaurtant" &&
            `bg-white font-medium text-blue-500 shadow-custom-all-sides`
          } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
          onClick={() => setPage("Restaurtant")}
        >
          Restaurtant
        </h2>
        <h2
          className={`p-1 ${
            page === "Status Setup" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4  cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Status Setup")}
        >
          Status Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Categories Setup" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Categories Setup")}
        >
          Categories Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Sub Categories Setup" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Sub Categories Setup")}
        >
         Sub Categories Setup
        </h2>
        <h2
          className={`p-1 ${
            page === "Restaurtant Menu" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Restaurtant Menu")}
        >
         Restaurtant Menu
        </h2>
        <h2
          className={`p-1 ${
            page === "Restaurtant Bookings" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Restaurtant Bookings")}
        >
         Restaurtant Bookings
        </h2>
        <h2
          className={`p-1 ${
            page === "Restaurtant Orders" &&
            "bg-white font-medium text-blue-500 shadow-custom-all-sides"
          } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
          onClick={() => setPage("Restaurtant Orders")}
        >
         Restaurtant Orders
        </h2>
      </div>
    </div>
    <div>
      {page === "Restaurtant" && <FBRestaurtantDetails/> }
      {page === "Categories Setup" && <EditCategorySetup/> }
      {page === "Status Setup" && <FBStatusSetup/> }
      {page === "Restaurtant Menu" && <FBRestaurtantMenu/> }
      {page === "Sub Categories Setup" && <EditSubCategorySetup/> }
      {page === "Restaurtant Bookings" && <EditRestaurtantBooking/> }
      {page === "Restaurtant Orders" && <EditRestaurtantOrders/> }

    </div>
  </div>
  </div>
  )
}

export default FBDetails