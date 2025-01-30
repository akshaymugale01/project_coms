import { Navbar } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  domainPrefix,
  getAllUnits,
  getSetupUsers,
  getSites,
} from "../../../api";
import { BiEdit } from "react-icons/bi";

const SetupUserDetails = () => {
  const { id } = useParams();
  const [units, setUnits] = useState([]);
  const [sites, setSites] = useState([]);
  const [usersites, setUserSites] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    userType: "",
    site_ids: [],
    user_sites: [
      {
        unit_id: "",
        site_id: "",
        ownership: "",
        ownership_type: "",
        is_approved: true,
        lives_here: "",
      },
    ],
  });

  console.log("id", id);

  const fetchUsers = async () => {
    const response = await getSetupUsers(id);
    const units = await getAllUnits();
    const unitsData = units.data
    setUnits(unitsData);
    const sites = await getSites();
    const sitesData = sites.data
    setUserSites(sitesData);
    const data = response.data;
    console.log("Units", units);
    console.log("Sites", sites);
    const user = data.find((item) => item.id);
    setFormData(user);
    // console.log("Response Id", user);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("formData", formData);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // Add API call here
  };

  console.log("User Data", units)
  console.log("Sites",sites);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [sitesResp, unitsResp] = await Promise.all([
  //         getSites(),
  //         getAllUnits(),
  //       ]);
  //       setSites(
  //         sitesResp.data.map((site) => ({
  //           value: site.id,
  //           label: site.name,
  //         }))
  //       );
  //       setUnits(unitsResp.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log("units", units);

  return (
    <section className="flex">
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex flex-col gap-2">
          <h2
            style={{
              background: "rgb(19 27 32)",
            }}
            className="text-center rounded-full w-full text-white font-semibold text-lg p-2 px-4 mt-2 "
          >
            Users Details
          </h2>
          <div className="flex justify-end gap-2 mx-2 mt-1">
            <Link
              //   to={`/admin/passes/visitors/edit-visitor/${id}`}
              className="border-2 border-black rounded-full px-2 p-1 flex items-center gap-2"
            >
              <BiEdit /> Edit Details
            </Link>
          </div>
          {/* <div className="flex justify-center">
            {details.profile_picture && details.profile_picture !== null ? (
              // details.visitor_files.map((doc, index) => (
              <img
                src={domainPrefix + details.profile_picture}
                alt=""
                className="w-48 h-48 rounded-full cursor-pointer"
                onClick={() =>
                  window.open(domainPrefix + details.profile_picture, "_blank")
                }
              />
            ) : (
              // ))
              <img src={image} alt="" className="w-48 h-48" />
            )}
          </div> */}
          <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4">
            {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Site Name : </p>
            <p className="">{details.site_name}</p>
          </div> */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">First Name : </p>
              <p className="">{formData.firstname}</p>
            </div>
            {/* {details.visit_type === "Support Staff" && ( */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Last Name : </p>
              <p className="">{formData.lastname}</p>
            </div>
            {/* )} */}
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Email : </p>
              <p className="">{formData.email}</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Mobile : </p>
              <p className="">{formData.mobile}</p>
            </div>
            {/* <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">OTP : </p>
            <p className="">{details.otp}</p>
          </div> */}
          </div>
          {formData.user_sites && formData.user_sites.length > 0 && (
            <div className="col-span-2">
              <h3 className="font-semibold text-lg mt-4">Associated Units</h3>
              {formData.user_sites.map((site, index) => {
                // Find the unit corresponding to the site.unit_id
                const unit = units.find((unit) => unit.id === site.unit_id);
                // console.log("Units", unit)
                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 border p-4 mt-3 rounded-md"
                  >
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Unit ID:</p>
                      <p>{site.unit_id}</p>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Unit Name:</p>
                       <p>
                        {unit
                          ? unit.name +
                            "/ Floor Name -" +
                            unit.floor_name +
                            "/ Building Name -" +
                            unit.building_name
                          : "Unit not found"}
                      </p> 
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Site ID:</p>
                      <p>
                        {console.log("Site", usersites)}
                        {`${site.site_id}`}({usersites[0]?.name})
                      </p>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Ownership:</p>
                      <p>{site.ownership}</p>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Ownership Type:</p>
                      <p>{site.ownership_type}</p>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Lives Here:</p>
                      <p>{site.lives_here ? "Yes" : "No"}</p>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <p className="font-semibold text-sm">Approved:</p>
                      <p>{site.is_approved ? "Yes" : "No"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SetupUserDetails;
