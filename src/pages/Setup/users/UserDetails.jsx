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
    user_sites: [],
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
      <div className="flex mx-1 bg-white rounded-md flex-col gap-1 overflow-hidden my-1 w-full rounded-md bg-white max-w-2xl p-5 mt-2 mb-3">
        <div className="bg-gray-900 text-white p-3 rounded-full w-full max-w-2xl flex items-center justify-between">
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
        <div className="bg-white shadow-lg p-2 rounded-lg p-6 w-full max-w-3xl mt-3 mb-3 border border-gray-900">
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
          <div className="bg-white shadow-lg rounded-lg p-6 mb-3 w-full max-w-3xl mt-5 border border-gray-900">
            <h3 className="text-lg font-semibold text-gray-800">
              Associated Units
            </h3>
            {formData.user_sites.map((site, index) => {
              const unit = units.find((u) => u.id === site.unit_id);
              return (
                <div
                  key={index}
                  className="mt-4 p-4 border rounded-md bg-gray-50"
                >
                  <h4 className="font-bold text-gray-700 mb-2">
                    Unit {index + 1}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Unit Name:</span>{" "}
                      {unit?.name || "N/A"}
                    </p>
                    {/* <p><span className="font-semibold">Site Name:</span> {unit?.site_id || "N/A"}</p> */}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SetupUserDetails;
