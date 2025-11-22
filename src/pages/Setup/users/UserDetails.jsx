import { BiEdit } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFilterUsers, getAllUnits } from "../../../api";

const SetupUserDetails = () => {
  const { id } = useParams();
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    userType: "",
    site_ids: [],
    moving_date: "",
    building_id: null,
    lease_expiry: "",
    lives_here: "",
    profession: "",
    mgl_customer_number: "",
    adani_electricity_account_no: "",
    net_provider_name: "",
    net_provider_id: "",
    blood_group: "",
    no_of_pets: "",
    birth_date: "",
    user_sites: [],
    user_members: [],
    user_vendor: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [userResp, unitsResp] = await Promise.all([
          getFilterUsers(id),
          getAllUnits(),
        ]);
        setFormData(userResp?.data || {});
        setUnits(unitsResp?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  if (loading) {
    return (
      <section className="flex flex-col items-center p-5 bg-gray-700 min-h-screen">
        <div className="flex justify-center items-center h-64 w-full">
          <span className="text-lg font-semibold text-white">Loading...</span>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center p-5 bg-gray-700">
      {/* Page Title */}
      <div class="flex mx-1 bg-white rounded-md flex-col gap-1 overflow-hidden my-1 w-full p-5 mt-2 mb-3">

        <div className="bg-gray-900 text-white p-3 rounded-full w-full flex items-center justify-between">

          <h2 className="text-xl font-bold text-center w-full">User Details</h2>
          <Link
            to={`/setup/users-edit-page/${id}`}
            className="ml-auto text-white text-2xl"
          >
            <BiEdit />
          </Link>
        </div>

        {/* <div className="w-full rounded-md bg-white max-w-2xl p-10 mt-3 mb-3"> */}
        {/* User Details Card */}
        <div className="bg-white shadow-lg p-2 rounded-lg p-6 w-full mt-3 mb-3 border border-gray-900">

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              User Information
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
            <p>
              <span className="font-semibold">First Name:</span>{" "}
              {formData.firstname || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span>{" "}
              {formData.lastname || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {formData.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              {formData.mobile || "N/A"}
            </p>
          </div>
        </div>
        {/* Associated Units */}
        {formData.user_sites.length > 0 && (
          <div class="bg-white shadow-lg rounded-lg p-6 mb-3 w-full mt-5 border border-gray-900">

            {formData.user_sites.map((site, index) => {
              const unit = units.find((u) => u.id === site.unit_id);
              return (
                <div
                  key={index}
                  className="bg-white shadow-lg p-6 w-full mt-3 mb-3 border rounded-md bg-gray-50"
                >
                  {/* <h4 className="font-bold text-gray-700 mb-2">
                    Unit {index + 1}
                  </h4> */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <p>
                      <span className="font-semibold">Unit Name:</span>{" "}
                      {unit?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Building:</span>{" "}
                      {unit?.building_name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Floor:</span>{" "}
                      {unit?.floor_name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Ownership:</span>{" "}
                      {site.ownership || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Lives Here:</span>{" "}
                      {site.lives_here ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="font-semibold">Approved:</span>{" "}
                      {site.is_approved ? "Yes" : "No"}
                    </p>
                  </div>
                  {/* First row: moving date, occupancy type, no of pets */}
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <p>
                      <span className="font-semibold">Moving date:</span>{" "}
                      {formData.moving_date
                        ? formData.moving_date.slice(0, 10)
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Occupancy Type:</span>{" "}
                      {formData.occupancy_type || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">No of Pets:</span>{" "}
                      {formData.no_of_pets || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Blood Group:</span>{" "}
                      {formData.blood_group || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Birth Date:</span>{" "}
                      {formData.birth_date || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Profession:</span>{" "}
                      {formData.profession || "N/A"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div class="bg-white shadow-lg rounded-lg p-6 mb-3 w-full mt-5 border border-gray-900">

          {formData.user_members && formData.user_members.length > 0 && (
            <div class="bg-white shadow-lg rounded-lg p-6 mb-3 w-full mt-5 border border-gray-900">

              <h3 className="text-lg font-semibold text-gray-800">
                Family Members
              </h3>
              {formData.user_members.map((member, idx) => (
                <div
                  key={idx}
                  className="mt-4 p-4 border rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {member.member_type || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {member.member_name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {member.contact_no || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Relation:</span>{" "}
                      {member.relation || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!formData.user_members && (
            <div className="rounded-lg p-6 mb-3 w-full max-w-3xl mt-5 border bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Family Members
              </h3>
              No members found
            </div>
          )}
          <div class="bg-white shadow-lg rounded-lg p-6 mb-3 w-full mt-5 border border-gray-900">

            <p>
              <span className="font-semibold">MGL Customer Number:</span>{" "}
              {formData.mgl_customer_number || "N/A"}
            </p>
            <p>
              <span className="font-semibold">
                Adani Electricity Account Number:
              </span>{" "}
              {formData.adani_electricity_account_no || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Internet Provider Name:</span>{" "}
              {formData.net_provider_name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Internet ID:</span>{" "}
              {formData.net_provider_id || "N/A"}
            </p>
          </div>
          {formData.user_vendor && formData.user_vendor.length > 0 && (
            <div class="bg-white shadow-lg rounded-lg p-6 mb-3 w-full mt-5 border border-gray-900">

              <h3 className="text-lg font-semibold text-gray-800">
                Vendor Services
              </h3>
              {formData.user_vendor.map((vendor, idx) => (
                <div
                  key={idx}
                  className="mt-4 p-4 border rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Service Type:</span>{" "}
                      {vendor.service_type || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {vendor.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Contact:</span>{" "}
                      {vendor.contact_no || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!formData.user_vendor && (
            <div className="rounded-lg p-6 mb-3 w-full max-w-3xl mt-5 border bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Vendor Services
              </h3>
              No vendors found
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SetupUserDetails;
