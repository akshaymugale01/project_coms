import React from "react";
import Detail from "../../../containers/Detail";
import image from "/profile.png"
import { useSelector } from "react-redux";
import Table from "../../../components/table/Table";

const EmployeeStaffDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const columns = [


    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.contact_no,
      sortable: true,
    },
  ]
 const data = [
  {
    Name:"Mittu Panda",
    contact_no:"7637820933"
  }
 ]
  return (   
    <div className="w-screen p-4">
      <div className="flex flex-col gap-2">
      <h2
          style={{
            background: themeColor,
          }}
          className="text-center w-full text-white font-semibold text-lg p-2 px-4 "
        >
          Staff Details
        </h2>

        <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4">
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">ID : </p>
            <p className="">1</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Name  : </p>
            <p className="">Rajnish Patil</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Unit : </p>
            <p className="">78</p>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Vehicle Type : </p>
            <p className="">Hatchback</p>
          </div> */}
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">department: </p>
            <p className="">Security</p>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">OTP : </p>
            <p className="">{details.otp}</p>
          </div> */}
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Email : </p>
            <p className="">rajnish@gmail.com</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Mobile : </p>
            <p className="">8965456123</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Staff Id : </p>
            <p className="">178</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Work Type : </p>
            <p className="">Driver</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Vendor name : </p>
            <p className="">Rakesh</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Status : </p>
            <p className="">Rejected</p>
          </div>
          {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Status : </p>
            <p className="">Active</p>
          </div>
          
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Qr Code : </p>
              <p className="">
               123
              </p>
            </div> */}

            {/* <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Pass End Date : </p>
              <p className="">
                4/3/2024
              </p>
            </div>
         
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Check In : </p>
            <p className="">
             2:00
            </p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Check Out : </p>
            <p className="">
             3:00
            </p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Created By : </p>
            <p className="">Ramesh</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Created On : </p>
            <p className="">3/5/2024</p>
          </div>
        
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Permitted Days : </p>
              <p className="">10</p>
            </div> */}

        </div>
        {/* <div className="my-4 ">
          <h2 className="font-medium border-b-2 text-lg border-black px-4 ">
            Additional Visitors Info
          </h2>
          <div className="m-4 mx-20 ">
            <Table columns={columns} data={data} />
            </div>
            </div> */}
      </div>
    </div>
  );
};


export default EmployeeStaffDetails;