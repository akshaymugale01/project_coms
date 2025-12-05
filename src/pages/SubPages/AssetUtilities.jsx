import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const AssetUtilities = () => {
  const [page, setPage] = useState("energy");
  const themeColor = useSelector((state) => state.theme.color);
  const EnergyColumn = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/assets/asset-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/assets/edit-asset/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
      name: "Building",
      selector: (row) => row.building_name,
      sortable: true,
    },

    { name: "Floor", selector: (row) => row.floor_name, sortable: true },
    { name: "Unit", selector: (row) => row.unit_name, sortable: true },

    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Asset Code",
      selector: (row) => row.oem_name,
      sortable: true,
    },

    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
    },

    {
      name: "Model Number",
      selector: (row) => row.model_number,
      sortable: true,
    },

    {
      name: "Equipment Id",
      selector: (row) => row.equipmentId,
      sortable: true,
    },
    // {
    //   name: "Sub Group",
    //   selector: (row) => row.sub_group_name,
    //   sortable: true,
    // },
    {
      name: "Purchase Date",
      selector: (row) => row.purchased_on,
      sortable: true,
    },

    {
      name: "Purchase Cost",
      selector: (row) => row.purchase_cost,
      sortable: true,
    },

    // {
    //   name: "Critical",
    //   selector: (row) => (row.critical ? "Yes" : "No"),
    //   sortable: true,
    // },
    {
      name: "Status",
      selector: (row) =>
        row.breakdown ? (
          <p className="bg-red-400 p-1 px-2 rounded-full text-white">
            Breakdown
          </p>
        ) : (
          <p className="bg-green-400 p-1 px-2 rounded-full text-white">
            In Use
          </p>
        ),
      sortable: true,
    },
    {
      name: "Meter Type",
      selector: (row) => row.meter_type,
      sortable: true,
    },
    // {
    //   name: "Capacity",
    //   selector: (row) => row.capacity,
    //   sortable: true,
    // },

    // {
    //   name: "Created On",
    //   selector: (row) => dateFormat(row.created_at),
    //   sortable: true,
    // },
    // {
    //   name: "Updated On",
    //   selector: (row) => dateFormat(row.updated_at),
    //   sortable: true,
    // },
    // {
    //   name: "Warranty",
    //   selector: (row) => (row.warranty_start === null ? "No" : "Yes"),
    //   sortable: true,
    // },
    // {
    //   name: "W Start",
    //   selector: (row) => row.warranty_start,
    //   sortable: true,
    // },

    // {
    //   name: "Installation Date",
    //   selector: (row) => row.installation,
    //   sortable: true,
    // },
    // {
    //   name: "W Expiry",
    //   selector: (row) => row.warranty_expiry,
    //   sortable: true,
    // },

    // {
    //   name: "Meter Configured",
    //   selector: (row) => (row.is_meter ? "Yes" : "No"),
    //   sortable: true,
    // },

    // {
    //   name: "Supplier",
    //   selector: (row) => row.vendor_name,
    //   sortable: true,
    // },
  ];

  //   Action	ID	Asset name					 		Date
  const readingColumn = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/assets/asset-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/assets/edit-asset/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },

    {
      name: "Asset Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parameter Name",
      selector: (row) => row.oem_name,
      sortable: true,
    },

    {
      name: "Opening",
      selector: (row) => row.serial_number,
      sortable: true,
    },

    {
      name: "Reading",
      selector: (row) => row.model_number,
      sortable: true,
    },

    {
      name: "Consumption",
      selector: (row) => row.equipmentId,
      sortable: true,
    },
    // {
    //   name: "Sub Group",
    //   selector: (row) => row.sub_group_name,
    //   sortable: true,
    // },
    {
      name: "Total",
      selector: (row) => row.purchased_on,
      sortable: true,
    },

    {
      name: "Consumption",
      selector: (row) => row.purchase_cost,
      sortable: true,
    },

    // {
    //   name: "Critical",
    //   selector: (row) => (row.critical ? "Yes" : "No"),
    //   sortable: true,
    // },

    {
      name: "Customer Name",
      selector: (row) => row.meter_type,
      sortable: true,
    },
  ];
  const utilityColumn = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/assets/asset-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/assets/edit-asset/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
      name: "Client Name",
      selector: (row) => row.client_name,
      sortable: true,
    },

    {
      name: "Meter No.",
      selector: (row) => row.meter_no,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },

    {
      name: "Reading Type",
      selector: (row) => row.reading_type,
      sortable: true,
    },

    {
      name: "Adjustment Factor",
      selector: (row) => row.adjust,
      sortable: true,
    },

    {
      name: "Rate/KWH",
      selector: (row) => row.rate,
      sortable: true,
    },

    {
      name: "Actual Consumption",
      selector: (row) => row.conmp,
      sortable: true,
    },

    {
      name: "Total Consumption",
      selector: (row) => row.totalConm,
      sortable: true,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
  ];
  const EVColumn = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/assets/asset-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/assets/edit-asset/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
      name: " Date",
      selector: (row) => row.transactionDate,
      sortable: true,
    },

    {
      name: " Id",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Site",
      selector: (row) => row.site,
      sortable: true,
    },

    {
      name: "Units Consumed	",
      selector: (row) => row.unitCon,
      sortable: true,
    },

    {
      name: "Rate/KWH",
      selector: (row) => row.rate,
      sortable: true,
    },

    {
      name: "Tariff Rate",
      selector: (row) => row.tariffRate,
      sortable: true,
    },

    {
      name: "Sale of Energy",
      selector: (row) => row.Sale,
      sortable: true,
    },

    {
      name: "Tax Percentage",
      selector: (row) => row.tax,
      sortable: true,
    },
    {
      name: "Tax Amount",
      selector: (row) => row.taxAmount,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.total,
      sortable: true,
    },
  ];

  // 								Reading type
  const utilityReq = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/assets/asset-details/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //       <Link to={`/assets/edit-asset/${row.id}`}>
    //         <BiEdit size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },

    {
      name: "Entity",
      selector: (row) => row.entity,
      sortable: true,
    },

    {
      name: "From date",
      selector: (row) => row.from_date,
      sortable: true,
    },
    {
      name: "To date",
      selector: (row) => row.to_date,
      sortable: true,
    },

   

    {
      name: "Total consumption",
      selector: (row) => row.total_consumption,
      sortable: true,
    },

    {
      name: "Rate/KWH",
      selector: (row) => row.rate,
      sortable: true,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },

    {
      name: "Plant detail",
      selector: (row) => row.plant_detail,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Reading type",
      selector: (row) => row.reading_type,
      sortable: true,
    },
   
   
  ];

  const data = [
    {
      id: 1,
      building_name: "Tower A",
      floor_name: "Ground Floor",
      unit_name: "SUBSTATION",
      name: "MAIN ENERGY METER 99",
      oem_name: "1b1b593a52829233480e",
      serial_number: "sr5644",
      model_number: "md8668",
      equipmentId: "10058279",
      purchased_on: "02/03/2024",
      meter_type: "Sub Meter",
      breakdown: false,
    },
    {
      id: 1,
      building_name: "Tower B",
      floor_name: "Terrace",
      unit_name: "Double Height Area",
      name: "MAIN ENERGY METER 98",
      oem_name: "1b1b593a52829233483e",
      serial_number: "sr5643",
      model_number: "md8667",
      equipmentId: "10058279",
      purchased_on: "02/03/2023",
      meter_type: "Sub Meter",
      breakdown: false,
    },
  ];
  const waterData = [
    {
      id: 1,
      building_name: "Tower A",
      floor_name: "Terrace",
      unit_name: "SUBSTATION",
      name: "Water Treatment Systems",
      oem_name: "1b1b593a52829233480e",
      serial_number: "sr5666",
      model_number: "md8678",
      equipmentId: "10058277",
      purchased_on: "02/05/2024",
      meter_type: "Sub Meter",
      breakdown: false,
    },
    {
      id: 1,
      building_name: "Tower B",
      floor_name: "floor 4",
      unit_name: "Double Height Area",
      name: "Injection Molding Machines",
      oem_name: "1b1b593a52829233483e",
      serial_number: "sr5643",
      model_number: "md8667",
      equipmentId: "10058279",
      purchased_on: "02/03/2023",
      meter_type: "Sub Meter",
      breakdown: false,
    },
  ];
  const readingData = [
    {
      id: 1,
      building_name: "Tower A",
      floor_name: "Terrace",
      unit_name: "SUBSTATION",
      name: "MAIN ENERGY METER 85	",
      oem_name: "DGKVAH",
      serial_number: "0.0",
      model_number: "0.0",
      equipmentId: "0.0",
      date: "02/05/2024",
      meter_type: "Sub Meter",
      breakdown: false,
    },
    {
      id: 1,
      building_name: "Tower B",
      floor_name: "Terrace",
      unit_name: "SUBSTATION",
      name: "MAIN ENERGY METER 84	",
      oem_name: "DGKVBH",
      serial_number: "0.0",
      model_number: "0.0",
      equipmentId: "0.0",
      date: "02/05/2024",
      meter_type: "Sub Meter",
      breakdown: false,
    },
  ];
  const utilityData = [
    {
      id: 1,
      client_name: "Streamland Media Inda Pvt. Ltd.",
      meter_no: "MAIN ENERGY METER 72",
      location:
        "Building - TOWER B / Wing - CORE 2 / Floor - FIFTH FLOOR / Area - NA / Room - ELECTRICAL ROOM	",
      reading_type: "DGKVAH",
      adjust: "1.01509",
      rate: "37.61",
      conmp: "120.0",
      totalConm: "121.81",
      amount: "4581.29",
    },
    {
      id: 1,
      client_name: "Sransunion Global Technology.",
      meter_no: "MAIN ENERGY METER 71",
      location:
        " Building - TOWER B / Wing - CORE 1 / Floor - SECOND FLOOR / Area - NA / Room - ELECTRICAL ROOM",
      reading_type: "DGKVAH",
      adjust: "1.01509",
      rate: "37.61",
      conmp: "120.0",
      totalConm: "121.81",
      amount: "9162.57",
    },
  ];
  const EvData = [
    {
      id: 1,
      transactionDate: "28/06/2024",
      transactionId: "1b1b593a52829233480e",
      name: "EV",
      site: "Nyati",
      unitCon: "1.01509",
      rate: "37.61",
      tariffRate: "120.0",
      Sale: "12181",
      tax: "5%",
      taxAmount: "609",
      total: "12790",
    },
  ];
  const utilityReqData = [
    {
      id: 1,
      entity: "SIFY TECHNOLOGIES LTD",
      from_date: "2024-05-01",
      to_date: "2024-05-31",
      site: "Nyati",
      total_consumption: "35.93",
      rate: "28.78	",
      amount: "1033.95	",
      plant_detail: "12181",
      status: "pending",
      reading_type: "DGKVAH"
    },
  ];

  return (
    <section
      className="flex"
      //   style={{
      //     background: `url(${selectedImage})no-repeat center center / cover`,
      //   }}
    >
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "energy" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("energy")}
          >
            Energy Meter
          </h2>
          <h2
            className={`p-1 ${
              page === "water" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("water")}
          >
            Water
          </h2>
          <h2
            className={`p-1 ${
              page === "STP" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("STP")}
          >
            STP
          </h2>
          <h2
            className={`p-1 ${
              page === "Daily Readings" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Daily Readings")}
          >
            Daily Readings
          </h2>
          <h2
            className={`p-1 ${
              page === "utilityConsumption" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("utilityConsumption")}
          >
            Utility Consumption
          </h2>
          <h2
            className={`p-1 ${
              page === "EV Consumption" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("EV Consumption")}
          >
            EV Consumption
          </h2>
          <h2
            className={`p-1 ${
              page === "req" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("req")}
          >
            Utility Request
          </h2>
        </div>
        <div className="my-5">
        <div className=" flex justify-end my-2">
                <Link
                  to={"/assets/add-asset"}
                  style={{ background: themeColor }}
                  className="px-4 py-2  font-medium text-white rounded-md flex gap-2 items-center justify-center"
                >
                  <IoAddCircleOutline />
                  Add Asset
                </Link>
              </div>
          {page === "energy" && (
            <>
             
              <Table
                selectableRows
                columns={EnergyColumn}
                data={data}
                fixedHeader
                // fixedHeaderScrollHeight="450px"
                isPagination={true}
              />
            </>
          )}
          {page === "water" && (
            <>
             
              <Table
                selectableRows
                columns={EnergyColumn}
                data={waterData}
                fixedHeader
                // fixedHeaderScrollHeight="450px"
                isPagination={true}
              />
            </>
          )}
          {page === "STP" && (
            <>
              
              <Table
                selectableRows
                columns={EnergyColumn}
                data={data}
                fixedHeader
                // fixedHeaderScrollHeight="450px"
                isPagination={true}
              />
            </>
          )}
          {page === "Daily Readings" && (
            <Table
              selectableRows
              columns={readingColumn}
              data={readingData}
              fixedHeader
              // fixedHeaderScrollHeight="450px"
              isPagination={true}
            />
          )}
          {page === "utilityConsumption" && (
            <Table
              selectableRows
              columns={utilityColumn}
              data={utilityData}
              fixedHeader
              // fixedHeaderScrollHeight="450px"
              isPagination={true}
            />
          )}
          {page === "EV Consumption" && (
            <Table
              selectableRows
              columns={EVColumn}
              data={EvData}
              fixedHeader
              // fixedHeaderScrollHeight="450px"
              isPagination={true}
            />
          )}
          {page === "req" && (
            <Table
              selectableRows
              columns={utilityReq}
              data={utilityReqData}
              fixedHeader
              // fixedHeaderScrollHeight="450px"
              isPagination={true}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AssetUtilities;
