import React from "react";
import AdminHRMS from "./AdminHrms";
import { Link } from "react-router-dom";
import Node from "./Components/Node";

function OrganizationTree() {
  return (
    <div className="flex h-screen">
      <AdminHRMS />
      <OrgTreeSettings />
    </div>
  );
}

const OrgTreeSettings = () => {
  return (
    <div className="flex gap-10 p-6 ml-20">
      <div>
        <div className="bg-white w-96 rounded-lg border p-2">
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Organisation Tree Activation
            </h3>
            <p className="text-sm mb-4 font-medium">
              In order to activate your org tree, please fix the following
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold ">
                    Step 1
                  </label>
                  <label htmlFor="" className="">
                    Assign Head of Company
                  </label>
                </div>
                <Link
                  to={"/admin/organisation-view1"}
                  className="bg-black mr-1 p-2 mt-4  text-white py-1 px-4 rounded-lg"
                >
                  View
                </Link>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold ">
                    Step 2
                  </label>
                  <label htmlFor="" className="">
                    Assign Department Heads
                  </label>
                </div>
                <Link
                  to={"/admin/organisation-view2"}
                  className="bg-black mr-1  mt-4  text-white py-1 px-4 rounded-lg "
                >
                  View
                </Link>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold ">
                    Step 3
                  </label>
                  <label htmlFor="">Assign Reporting supervisor</label>
                </div>
                <Link
                  to={"/admin/organisation-view3"}
                  className="bg-black mr-1  mt-4  text-white py-1 px-4 rounded-lg"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* <OrganizationTree/> */}
      </div>
    </div>
  );
};

export default OrganizationTree;
