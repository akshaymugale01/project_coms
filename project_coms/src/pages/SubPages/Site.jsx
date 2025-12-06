import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Account from "./Account";
import Table from "../../components/table/Table";
import { getSites } from "../../api";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import EditSite from "../Setup/AccountSetup/EditSite";
import { useSelector } from "react-redux";

const Site = () => {
  const [site, setSite] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const fetchSite = async () => {
      try {
        const siteResp = await getSites();
        setSite(siteResp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSite();
  }, []);
  const siteColumn = [
    {
      name: "Company",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Site",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Region",
      selector: (row) => row.region,
      sortable: true,
    },
    {
      name: "Feature",
      selector: (row) =>
        row.feature.map((feat) => feat.feature_name).join(", "),
      sortable: true,
      width: "300px", // Adjust the width as needed
      cell: (row) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.feature.map((feat) => feat.feature_name).join(", ")}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/setup/account/site/site-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/setup/account/site/edit-site/${row.id}`}>
            <BiEdit size={15} />
          </Link>
          {/* {showEditModal && (
            <EditSite onclose={() => setShowEditModal(false)} id={row.id} />
          )} */}
        </div>
      ),
    },
  ];
const themeColor = useSelector((state)=> state.theme.color)
  return (
    <div className="w-full mt-1">
      <Account />
      <div className="flex flex-col mx-10 my-10 gap-2">
        <div className="flex justify-end w-full  ">
          <Link to={"/setup/account/site/create-new-site"} style={{background:themeColor}} className="text-white p-1 rounded-md px-2 font-medium">Create New Site</Link>
        </div>
        {/* <div className="flex justify-center items-center ">
         
          <div className="mt-4 w-screen">
            <table className="border-collapse w-full ">
              <thead>
                <tr>
                  <th className=" border-md p-2 bg-black border-r-2 text-white rounded-l-xl">
                    Country
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Region
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Zone
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Site
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Latitude
                  </th>
                  <th className=" border-md p-2 bg-black border-r-2 text-white ">
                    Longitude
                  </th>
                  <th className="border-md border-r-2 p-2 bg-black text-white">
                    Status
                  </th>
                  <th className="  rounded-r-xl p-2 bg-black text-white">
                    Qr Code
                  </th>
                </tr>
              </thead>
                <tbody>
                    <tr className="border-md border-black border-b-2">
                      <td className="text-center p-2 border-r-2 border-black">Country 1</td>
                      <td className="text-center p-2 border-r-2 border-black">Region 1</td>
                      <td className="text-center p-2 border-r-2 border-black">Zone 1</td>
                      <td className="text-center p-2 border-r-2 border-black"> Kalyan</td>
                      <td className="text-center p-2 border-r-2 border-black">0.0</td>
                      <td className="text-center p-2 border-r-2 border-black">0.0</td>
                      <td className="text-center p-2 border-r-2 border-black"> Active</td>
                      <td className="text-center p-2"> </td>
                    </tr>
                    <tr className="border-md border-black border-b-2">
                      <td className="text-center p-2  border-r-2 border-black">Country 2</td>
                      <td className="text-center p-2  border-r-2 border-black">Region 2</td>
                      <td className="text-center p-2  border-r-2 border-black">Zone 2</td>
                      <td className="text-center p-2 border-r-2 border-black"> Kalyan</td>
                      <td className="text-center p-2 border-r-2 border-black">0.0</td>
                      <td className="text-center p-2 border-r-2 border-black">0.0</td>
                      <td className="text-center p-2 border-r-2 border-black">
                      <Switch/>
                      </td>
                      <td className="text-center p-2"> </td>
                    </tr>
                </tbody>
              
            </table>
          </div>
          
        </div> */}
        <Table columns={siteColumn} data={site} />
      </div>
    </div>
  );
};

export default Site;
