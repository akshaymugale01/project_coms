import React, { useState } from "react";
import FBRestaurtantEdit from "./FBResturantEdit";
import EditRestaurtantBooking from "./EditResturantBooking";
import EditRestaurtantOrders from "./EditResturantOrders";
import EditCategorySetup from "./EditCategorySetup";
import EditSubCategorySetup from "./EditSubCategorySetup";
import FBStatusSetup from "./details/FBStatusSetup";
import FBRestaurtantMenu from "./details/FBSubDetails/FBResturantMenu";
// import FBRestaurtantDetails from "./FBRestaurtantDetails";
// import PermitTypeTable from "./PermitTypeTable";
// import PermitActivityTable from "./PermitActivityTable";
// import PermitSubActivityTable from "./PermitSubActivityTable";
// import PermitHazardCategoryTable from "./PermitHazardCatgoryTable";
// import PermitRiskTable from "./PermitRiskTable";
const FBEdit = () => {
  const [page, setPage] = useState("Restaurtant");
return (
  <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">

  <div className=" w-full my-2 flex  overflow-hidden flex-col">
      <h3 className="border-b text-center text-xl border-black mb-6 font-bold">Update F&B </h3>
  <div className="flex w-full">
    <div className=" flex gap-2 p-2 justify-between pb-0 border-b-2 border-gray-200 w-full">
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
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Status Setup")}
      >
        Status 
      </h2>
      <h2
        className={`p-1 ${
          page === "Categories Setup" &&
          "bg-white font-medium text-blue-500 shadow-custom-all-sides"
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Categories Setup")}
      >
        Categories 
      </h2>
      <h2
        className={`p-1 ${
          page === "Sub Categories Setup" &&
          "bg-white font-medium text-blue-500 shadow-custom-all-sides"
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Sub Categories Setup")}
      >
       Sub Categories 
      </h2>
      <h2
        className={`p-1 ${
          page === "Restaurtant Menu" &&
          "bg-white font-medium text-blue-500 shadow-custom-all-sides"
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Restaurtant Menu")}
      >
        Menu
      </h2>
      <h2
        className={`p-1 ${
          page === "Restaurtant Bookings" &&
          "bg-white font-medium text-blue-500 shadow-custom-all-sides"
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Restaurtant Bookings")}
      >
       Bookings
      </h2>
      <h2
        className={`p-1 ${
          page === "Restaurtant Orders" &&
          "bg-white font-medium text-blue-500 shadow-custom-all-sides"
        } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
        onClick={() => setPage("Restaurtant Orders")}
      >
       Orders
      </h2>
    </div>
  </div>
  <div>
    {page === "Restaurtant" && <FBRestaurtantEdit/> }
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

export default FBEdit