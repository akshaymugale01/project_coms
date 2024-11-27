import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import POTable from "./SubPages/POTable";
// import WOTable from "./SubPages/WOTable";
import LOIPOTable from "./SubPages/LOIPOTable";
import LOIWOTable from "./SubPages/LOIWOTable";
// import GdnDetails from "./SubPages/GDNDetails";
// import GdnPending from "./SubPages/GDNPending";

// import GdnPanding from "./SubPages/GdnPanding";

function LetterOfIndent() {
  const [page, setPage] = useState("PO");
  return (
    <section className="flex">
      {/* <Navbar /> */}
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center my-2">
          {/* <div className="flex flex-row gap-5 text-sm font-semibold p-1 rounded-full bg-gray-400">
            <h2
              className={`p-1 ${
                page === "PO" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer`}
              onClick={() => setPage("PO")}
            >
              PO
            </h2>
            <h2
              className={`p-1 ${
                page === "WO" && "bg-white text-blue-500"
              } rounded-full px-4 cursor-pointer`}
              onClick={() => setPage("WO")}
            >
              WO
            </h2>
          </div> */}
        </div>
         {page === "PO" && (
             <div>
           <LOIPOTable/>
          </div>
        )}

        {page === "WO" && (
          <div>
            <LOIWOTable/>
          </div>
        )}
      </div>
    </section>
  );
}

export default LetterOfIndent;