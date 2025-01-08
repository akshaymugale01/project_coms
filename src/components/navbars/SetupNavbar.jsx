import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getItemInLocalStorage } from '../../utils/localStorage';
import { FaUser, FaBuilding, FaTicketAlt, FaTools, FaCar, FaFileInvoice, FaMeteor, FaMitten, FaCreativeCommonsSampling, FaTachometerAlt, FaVials, FaSpeakap, FaTimes, FaAddressBook, FaRegAddressBook, FaRegAddressCard, FaMoneyBill, FaProjectDiagram, FaWizardsOfTheCoast, FaRProject } from 'react-icons/fa';
import { FaBilibili, FaDiagramProject, FaF, FaFaceAngry, FaMasksTheater, FaMoneyBill1Wave, FaTimeline } from 'react-icons/fa6';
import { FcAbout } from 'react-icons/fc';

const SetupNavbar = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [feat, setFeat] = useState([]);
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
    <div className="flex mt-1 w-full bg-gray-900">
      <div className="w-full mx-4">
        <ul className="p-4 bg-gray-800 rounded-xl mx-2 md:flex grid grid-cols-2 max-w-screen items-center text-white text-sm text-center justify-center flex-wrap gap-4">
          <Link to="/setup/account/floor" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <FaUser /> Account
          </Link>

          {siteId === 10 && (
            <Link to="/setup/User-role" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaBuilding /> User Roles
            </Link>
          )}

          <Link to="/setup/users-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
            <FaUser /> Users
          </Link>

          {feat.includes("assets") && (
            <Link to="/setup/asset-group" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaTools /> Asset/Stock Group
            </Link>
          )}

          {feat.includes("tickets") && (
            <Link to="/setup/ticket-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaTicketAlt /> Ticket
            </Link>
          )}

          {feat.includes("space") && (
            <Link to="/setup/facility" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaTimeline />Amenities
            </Link>
          )}
          {feat.includes("space") && (
            <Link to="/admin/addresses-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaRegAddressBook />Address
            </Link>
          )}
          {feat.includes("communication") && (
            <Link
              to="/admin/communication-access-control"
              className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2"
            >
              <FaSpeakap /> Communication Setup Control
            </Link>
          )}

          {/* {feat.includes("vendors") && (
            <Link to="/setup/supplier-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              Supplier
            </Link>
          )} */}
          {feat.includes("gatepass") && (
            <Link to="/setup/visitor-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaVials /> Visitor
            </Link>
          )}
          {feat.includes("assets") && (
            <Link to="/setup/meter-category-type" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaTachometerAlt /> Meter Category Type
            </Link>
          )}

          {feat.includes("bills") && (
            <Link to="/admin/invoice-approval-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaFileInvoice /> Invoice Approval
            </Link>
          )}

          {feat.includes("cam_bill") && (
            <Link to="/admin/billing-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaMoneyBill1Wave /> Billing
            </Link>
          )}

          {feat.includes("parking") && (
            <Link to="/admin/parking-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaCar /> Parking
            </Link>
          )}

          {feat.includes("incidents") && (
            <Link to="/admin/setup-incidents" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaTools /> Incidents Setup
            </Link>
          )}

          {feat.includes("vendors") && (
            <Link to="/setup/supplier-setup" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaBuilding /> Supplier
            </Link>
          )}

          {feat.includes("vendors") && (
            <Link to="/setup/other_projects" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FaDiagramProject /> Other Projets
            </Link>
          )}

          {feat.includes("about_us") && (
            <Link to="/setup/about_us" className="hover:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
              <FcAbout /> About Us
            </Link>
          )}
        </ul>

        <div className="w-full mt-6 p-8 bg-cover bg-center rounded-xl" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover' }}>
          <div className="bg-black bg-opacity-50 p-4 text-center text-white rounded-lg">
            <h2 className="text-xl font-bold">Setup Overview</h2>
            <p>Your setup section to manage all settings related to the application.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupNavbar;
