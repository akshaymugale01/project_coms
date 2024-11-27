import React, { useState } from "react";

import AddVisitor from "./SubPages/AddVisitor";
import DeliverySupportStaff from "./SubPages/DeliverySupportStaff";
import Cab from "./SubPages/Cab";
import Navbar from "../components/Navbar";

const Visitors = () => {
  const [page, setPage] = useState("visitor");
  return (
    <div className="visitors-page">
      <section className="flex">
        <Navbar />
        <div className=" w-full flex mx-3 flex-col overflow-hidden">
          <div className="flex md:justify-center  my-2">
            <div className="md:flex md:flex-row flex-col gap-5 text-lg font-semibold p-1 md:rounded-full md:w-auto w-full rounded-sm bg-gray-400">
              <h2
                className={`p-1 ${
                  page === "visitor" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("visitor")}
              >
                Visitor
              </h2>
              <h2
                className={`p-1 ${
                  page === "Delivery & Support Staff" &&
                  "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("Delivery & Support Staff")}
              >
                Delivery & Support Staff
              </h2>
              <h2
                className={`p-1 ${
                  page === "cab" && "bg-white text-blue-500"
                } md:rounded-full rounded-sm px-4 cursor-pointer text-center text-sm`}
                onClick={() => setPage("cab")}
              >
                Cab
              </h2>
            </div>
          </div>
          {page === "visitor" && (
            <div>
              <AddVisitor />
            </div>
          )}
          {page === "Delivery & Support Staff" && (
            <div>
              <DeliverySupportStaff />
            </div>
          )}
          {page === "cab" && (
            <div>
              <Cab />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Visitors;
