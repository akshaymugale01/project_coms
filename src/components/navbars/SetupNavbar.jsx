import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from '../../utils/localStorage';
const SetupNavbar = () => {
  const themeColor = useSelector((state)=> state.theme.color)
  const [feat, setFeat] = useState("");
  const siteId = getItemInLocalStorage("SITEID");

  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    if (storedFeatures) {
      setFeat(storedFeatures.map((feature) => feature.feature_name));
    }
  };
  useEffect(() => {
  
    getAllowedFeatures();
  }, []);
  return (
    <div className="flex mt-1 w-full">
    <div className='w-full mx-4'>  
      {/* <ul className="p-4 bg-black rounded-xl mx-2 md:flex grid grid-cols-2 items-center text-white text-sm text-center justify-center overflow-x-auto  gap-2 "> */}
      <ul
      style={{background: themeColor}}
      className="p-4 rounded-xl mx-2 md:flex w-full grid grid-cols-2 max-w-screen items-center text-white text-sm text-center justify-center flex-wrap gap-2 ">
        <Link to={"/setup/account/floor"} className="hover:bg-white hover:text-black p-2 rounded-lg ">
          Account
        </Link>
    
        {siteId === 10 && <Link to={"/setup/User-role"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">User Roles</Link>}
        <Link to={"/setup/users-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Users</Link>
        {/* <Link  to={"/admin/fm-user"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">FM User</Link> */}
        {/* <Link to={"/admin/occupant-user-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Occupant User</Link> */}
        {/* <Link to={"/admin/setup-meter-type"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Meter Types</Link> */}
        {feat.includes("assets") && ( <Link to={"/setup/asset-group"}  className="hover:bg-white hover:text-black  p-2 rounded-lg ">Asset/Stock Group</Link>)}
        {/* <Link to={"/admin/checklist-group"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Checklist Group</Link> */}
        {feat.includes("tickets") && (<Link to={"/setup/ticket-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Ticket</Link>)}
        {feat.includes("contacts") && ( <Link to={"/business/setup-category"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Contact Category</Link>)}
        {feat.includes("space") && ( <Link to={"/setup/facility"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Facility</Link>)}
        {feat.includes("bills") && ( <Link to={"/admin/invoice-approval-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Invoice Approval</Link>)}
        {feat.includes("parking") && (  <Link to={"/admin/parking-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Parking</Link>)}
        {/* <Link  to={"/admin/email-rule"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Email Rule</Link> */}
        {/* <Link to={"/admin/fm-groups-setup"}  className="hover:bg-white hover:text-black  p-2 rounded-lg ">FM Groups</Link> */}
        {/* <Link to={"/admin/master-checklist-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Master Checklist</Link> */}
        {feat.includes("purchase_order") && (  <Link to={"/admin/sac-hsn-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">SAC/HSN Setup</Link>)}
        {feat.includes("purchase_order") && ( <Link  to={"/admin/addresses-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Addresses</Link>)}
        {/* <Link className="hover:bg-white hover:text-black  p-2 rounded-lg ">Export</Link> */}
        {/* <Link to={"/setup/insights/"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Insights</Link> */}
        {/* <Link to={"/setup/permit-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Permit</Link> */}
        {/* <Link to={"/setup/parking-setup"} className="hover:bg-white hover:text-black  p-2 rounded-lg ">Parking</Link> */}
        {feat.includes("incidents") &&(<Link to={"/admin/setup-incidents"}className="hover:bg-white hover:text-black  p-2 rounded-lg ">Incidents Setup</Link>)}
        {feat.includes("communication") && ( <Link to={"/admin/communication-access-control"}className="hover:bg-white hover:text-black  p-2 rounded-lg ">Communication Setup Control</Link>)}
        {feat.includes("vendors") && ( <Link to={"/setup/supplier-setup"}className="hover:bg-white hover:text-black  p-2 rounded-lg ">Supplier</Link>)}
        {feat.includes("gatepass") && ( <Link to={"/setup/visitor-setup"}className="hover:bg-white hover:text-black  p-2 rounded-lg ">Visitor</Link>)}
        {feat.includes("assets") && ( <Link to={"/setup/meter-category-type"}  className="hover:bg-white hover:text-black  p-2 rounded-lg ">Meter Category Type</Link>)}
      </ul>
    </div>
  </div>
  )
}

export default SetupNavbar
