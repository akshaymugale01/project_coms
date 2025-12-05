import React, { useState } from "react";
import List from "../../containers/List";

const AccessRight = () => {
  const [tab, setTab] = useState("all");

  const handleAllTab = () => {
    setTab("all");
  };
  const handleInvTab = () => {
    setTab("inv");
  };
  const handlesetupTab = () => {
    setTab("setup");
  };
  const handlesQuickgateTab = () => {
    setTab("quick");
  };
  return (
    <div>
      <div>
        <ul className="flex justify-around border-b p-2">
          <li
            className={`${
              tab === "all" && "bg-black text-white"
            } p-2 rounded-full px-4 cursor-pointer`}
            onClick={handleAllTab}
          >
            All Function
          </li>
          <li
            className={`${
              tab === "inv" && "bg-black text-white"
            } p-2 rounded-full px-4 cursor-pointer`}
            onClick={handleInvTab}
          >
            Inventory
          </li>
          <li
            className={`${
              tab === "setup" && "bg-black text-white"
            } p-2 rounded-full px-4 cursor-pointer`}
            onClick={handlesetupTab}
          >
            Setup
          </li>
          <li
            className={`${
              tab === "quick" && "bg-black text-white"
            } p-2 rounded-full px-4 cursor-pointer`}
            onClick={handlesQuickgateTab}
          >
            Quickgate
          </li>
        </ul>
        {tab === "all" && <List title="Broadcast" title2="Ticket" />}
        {tab === "inv" && <List title="Master" title2="GRN" />}
        {tab === "setup" && <List title="Account" title2="User Role" />}
        {tab === "quick" && <List title="Visitor" title2="R Vehicle" />}
      </div>
    </div>
  );
};

export default AccessRight;
