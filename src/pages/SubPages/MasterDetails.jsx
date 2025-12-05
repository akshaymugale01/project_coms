import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import {
  getMastersDetails,
  getHsnDetails,
  getAssetGroupsDetails,
  getAssetSubGroups,
  getSiteAssetDetails,
} from "../../api";

const MasterDetails = () => {
  const { id } = useParams();
  const [masterDetails, setMasterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hsn, setHsn] = useState(null);
  const [assetGroupName, setAssetGroupName] = useState("");
  const [assetSubGroupName, setAssetSubGroupName] = useState("");
  const [assetInfo, setAssetInfo] = useState(null);

  useEffect(() => {
    const fetchMastersDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getMastersDetails(id);
        const data = res?.data || {};
        setMasterDetails(data);

        // Fetch HSN details if available
        if (data?.hsn_id) {
          try {
            const hsnRes = await getHsnDetails(data.hsn_id);
            setHsn(hsnRes?.data || null);
          } catch (e) {
            // non-blocking
          }
        }

        // Fetch Asset Group and Subgroup names
        if (data?.asset_group_id) {
          try {
            const grpRes = await getAssetGroupsDetails(data.asset_group_id);
            const gName = grpRes?.data?.name || grpRes?.data?.group_name || "";
            setAssetGroupName(gName);

            // For subgroup name: fetch list for group and find matching id
            if (data?.asset_sub_group_id) {
              try {
                const subRes = await getAssetSubGroups(data.asset_group_id);
                const list = Array.isArray(subRes) ? subRes : [];
                const found = list.find((s) => String(s.id) === String(data.asset_sub_group_id));
                setAssetSubGroupName(found?.name || "");
              } catch (e) {
                // ignore subgroup fetch errors
                console.debug("Failed to fetch subgroup list", e);
              }
            }
          } catch (e) {
            // ignore group errors
          }
        }

        // Fetch linked Asset information (name, building, floor, unit)
        if (data?.asset_id) {
          try {
            const assetRes = await getSiteAssetDetails(data.asset_id);
            setAssetInfo(assetRes?.data || null);
          } catch (e) {
            // ignore asset fetch errors
            console.debug("Failed to fetch linked asset", e);
          }
        }
      } catch (e) {
        console.log(e);
        setError("Failed to fetch master details");
      } finally {
        setLoading(false);
      }
    };
    fetchMastersDetails();
  }, [id]);

  const dateFormat = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toDateString();
  };

  const fmtRate = (val) => {
    if (val === null || val === undefined || val === "") return "-";
    const match = String(val).match(/[-+]?[0-9]*\.?[0-9]+/);
    return match ? `${match[0]}%` : String(val);
  };
  return (
    <section className="flex">
    <Navbar />
    <div className=" w-full p-2 flex mx-3 flex-col overflow-hidden">
    <h2
          style={{
            background: "rgb(3 19 35)",
          }}
          className="text-center rounded-full w-full text-white font-semibold text-lg p-2 px-4 mb-2 "
        >
          Master Details
        </h2>
        {loading && (
          <div className="p-4 text-center">Loading...</div>
        )}
        {!loading && error && (
          <div className="p-4 text-center text-red-600">{error}</div>
        )}
        {!loading && !error && masterDetails && (
        
      <div className="flex flex-col gap-2">
        
        
      <h2 className="border-b-2 border-black text font-medium ">
                      Inventory Details
                    </h2>
        
       
        <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4 my-4">
          
       
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Name : </p>
            <p className="">{masterDetails?.name || "N/A"}</p>
          </div>
          
            <div className="grid grid-cols-2 ">
              <p className="font-semibold text-sm">Type : </p>
              <p className="">{String(masterDetails?.inventory_type) === "1" ? "Spares" : "Consumable"}</p>
              </div>
         
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Criticality : </p>
            <p className="">{String(masterDetails?.criticality) === "1" ? "Critical" : "Non-Critical"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Code : </p>
            <p className="">{masterDetails?.code || "N/A"}</p>
          </div>
          
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Serial Number: : </p>
            <p className="">{masterDetails?.serial_number || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Quantity : </p>
            <p className="">{masterDetails?.quantity ?? "-"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Unit : </p>
            <p className="">{masterDetails?.unit || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Category : </p>
            <p className="">{masterDetails?.category || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Min.Stock Level: : </p>
            <p className="">{masterDetails?.min_stock_level ?? "-"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Min.Order Level: : </p>
            <p className="">{masterDetails?.min_order_level ?? "-"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">SAC/HSN Code : </p>
            <p className="">{hsn?.code || masterDetails?.hsn_id || "N/A"}</p>
          </div>
          

          
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Cost : </p>
            <p className="">{masterDetails?.cost ?? "-"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">CGST Rate : </p>
            <p className="">{fmtRate(masterDetails?.cgst_rate ?? hsn?.cgst_rate)}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">SGST Rate : </p>
            <p className="">{fmtRate(masterDetails?.sgst_rate ?? hsn?.sgst_rate)}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">IGST Rate : </p>
            <p className="">{fmtRate(masterDetails?.igst_rate ?? hsn?.igst_rate)}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Site : </p>
            <p className="">{masterDetails?.site_id || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Expiry Date : </p>
            <p className="">{dateFormat(masterDetails?.expiry_date)}</p>
          </div>
          

          
         
         
        </div>

        <h2 className="border-b-2 border-black text font-medium ">
                      Asset Information
                    </h2>
                    <div className="md:grid  px-4 flex flex-col grid-cols-3 gap-5 gap-x-4 my-4">
                    <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Name : </p>
            <p className="">{assetInfo?.name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Group : </p>
            <p className="">{assetGroupName || assetInfo?.group_name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">SubGroup : </p>
            <p className="">{assetSubGroupName || assetInfo?.sub_group_name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Site : </p>
            <p className="">{assetInfo?.site_name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Building : </p>
            <p className="">{assetInfo?.building_name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Floor : </p>
            <p className="">{assetInfo?.floor_name || "N/A"}</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-sm">Area : </p>
            <p className="">{assetInfo?.unit_name || "N/A"}</p>
          </div>
                        </div>
      </div>
        )}
    </div>
   
  </section>
  )
}

export default MasterDetails