import React, { useEffect, useState } from "react";
import AdminHRMS from "../AdminHrms";
import { getOrganizationTreeChart } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const OrganizationChart = () => {
  const [users, setUsers] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  // Fetch organization tree data
  const fetchOrganizationTree = async () => {
    try {
      const res = await getOrganizationTreeChart(hrmsOrgId);
      setUsers(res);
    } catch (error) {
      console.error("Error fetching organization tree:", error);
    }
  };

  useEffect(() => {
    fetchOrganizationTree();
  }, [hrmsOrgId]); // Added hrmsOrgId to ensure re-fetching if it changes.

  // Group users by user_type_order and sort by order
  const groupByUserTypeOrder = (users) => {
    return users.reduce((acc, user) => {
      acc[user.user_type_order] = acc[user.user_type_order] || [];
      acc[user.user_type_order].push(user);
      return acc;
    }, {});
  };

//   TreeNode Component
//   const TreeNode = ({ user, children }) => (
//     <div className="flex flex-col items-center">
//       <div className="bg-blue-50 p-4 rounded-md text-center border border-gray-300 min-w-60 shadow-custom-all-sides">
//         <h3 className="font-semibold text-lg">{user.user_type_name}</h3>
//         <p className="text-gray-700">{`${user.first_name} ${user.last_name}`}</p>
//       </div>

//       {children && (
//         <div className="flex justify-center items-center mt-2">
//           <div className="h-8 w-0.5 bg-gray-400"></div>
         
//         </div>
//       )}

//       {children && <div className="flex mt-2 space-x-4">{children}</div>}
//     </div>
//   );
const TreeNode = ({ user, children }) => (
    <div className="flex flex-col items-center">
      {/* Node Content */}
      <div className="bg-blue-50 p-4 rounded-md text-center border border-gray-300 min-w-60 shadow-custom-all-sides">
        <h3 className="font-semibold text-lg">{user.user_type_name}</h3>
        <p className="text-gray-700">{`${user.first_name} ${user.last_name}`}</p>
      </div>
  
      {/* Connector to Children */}
      {children && (
        <>
          {/* Vertical line connecting to the horizontal line */}
          <div className="flex justify-center items-center mt-2">
            <div className="h-8 w-0.5 bg-gray-400"></div>
          </div>
  
          {/* Horizontal line connecting children */}
          <div className="flex items-center justify-center w-full relative">
            {/* <div className="absolute h-0.5 bg-gray-400 w-full"></div> */}
            <div className="flex space-x-4 mt-2 z-10">{children}</div>
          </div>
        </>
      )}
    </div>
  );
  

  // Render the tree recursively
  const renderTree = (level) => {
    const groupedUsers = groupByUserTypeOrder(users);
    const sortedLevels = Object.keys(groupedUsers).sort((a, b) => a - b); // Sort levels by user_type_order

    if (!groupedUsers[sortedLevels[level]]) return null;

    return (
      <div className="flex justify-center items-start space-x-2 mt-2">
        {groupedUsers[sortedLevels[level]].map((user) => (
          <TreeNode key={`${user.id}-${level}`} user={user}>
            {renderTree(level + 1)}
          </TreeNode>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4  min-h-screen ">
      <AdminHRMS />
      <h1 className="ml-20 text-xl font-semibold mb-2 border-b">Organization Tree</h1>
      <div className="ml-20 bg-white-50 min-h-screen max-w-screen overflow-x-auto border border-gray-400 p-2 rounded-xl  flex">
        {users.length > 0 ? (
          renderTree(0) // Start with the lowest user_type_order level (0 for first)
        ) : (
          <p className="text-center text-gray-600">
            Loading organization data...
          </p>
        )}
      </div>
    </div>
  );
};

export default OrganizationChart;
