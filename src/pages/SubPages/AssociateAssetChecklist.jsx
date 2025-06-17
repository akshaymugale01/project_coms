import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAssignedTo,
  getAssociationList,
  getSiteAsset,
  postAssetAssociation,
} from "../../api";
import Select from "react-select";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner";

const AssociateAssetChecklist = () => {
  const [assets, setAssets] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [association, setAssociation] = useState([]);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const { id } = useParams();

  const column = [
    { name: "Asset Name", selector: (row) => row.asset_name, sortable: true },
    { name: "Assigned To", selector: (row) => row.user_name, sortable: true },
  ];

  useEffect(() => {
    const fetchAssetsList = async () => {
      const assetListResp = await getSiteAsset();
      const asset = assetListResp.data.site_assets;
      const assetList = asset.map((a) => ({
        value: a.id,
        label: a.name,
      }));
      setAssets(assetList);
    };

    const fetchAssignedTo = async () => {
      const assignedToList = await getAssignedTo();
      const user = assignedToList.data.map((u) => ({
        value: u.id,
        label: `${u.firstname} ${u.lastname}`,
      }));
      setAssignedTo(user);
    };

    const fetchAssociationList = async () => {
      setListLoading(true);
      try {
        const assoResp = await getAssociationList(id);
        const sortedData = assoResp.data.associated_with.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        setAssociation(sortedData);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch associated checklist data.");
      } finally {
        setListLoading(false);
      }
    };

    fetchAssetsList();
    fetchAssignedTo();
    fetchAssociationList();
  }, [added]);

  const handleAddAssociate = async () => {
    const payload = {
      asset_ids: selectedOption.map((option) => option.value),
      activity: { checklist_id: id },
      assigned_to: selectedUserOption.map((opt) => opt.value),
    };

    try {
      setLoading(true);
      toast.loading("Associating Checklist");
      await postAssetAssociation(payload);
      toast.dismiss();
      toast.success("Checklist Associated");

      setAdded(true);
      setSelectedOption([]);
      setSelectedUserOption([]);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to associate checklist.");
    } finally {
      setLoading(false);
      setTimeout(() => setAdded(false), 500);
    }
  };

  return (
    <section className="flex">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="p-4 overflow-hidden w-full my-2 flex mx-3 flex-col">
        <h2 className="text-lg font-medium border-b-2 border-gray-400 mb-2">
          Associate Checklist
        </h2>
        <div className="grid md:grid-cols-3 items-center gap-4">
          <div className="w-full z-20">
            <Select
              isClearable={false}
              closeMenuOnSelect={false}
              isMulti
              onChange={setSelectedOption}
              options={assets}
              noOptionsMessage={() => "No Assets Available"}
              placeholder="Select Assets"
              value={selectedOption}
            />
          </div>
          <div className="w-full z-20">
            <Select
              closeMenuOnSelect={false}
              isMulti
              onChange={setSelectedUserOption}
              options={assignedTo}
              noOptionsMessage={() => "No Users Available"}
              placeholder="Select Users"
              value={selectedUserOption}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="border-2 border-black p-1 px-4 rounded-md"
              onClick={handleAddAssociate}
              disabled={loading}
            >
              {loading ? "Processing..." : "Create Activity"}
            </button>
            {loading && (
              <DNA
                visible={true}
                height={40}
                width={40}
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
              />
            )}
          </div>
        </div>
        <div className="my-4 min-h-[100px]">
          {listLoading ? (
            <div className="flex justify-center items-center h-32">
              <DNA
                visible={true}
                height={60}
                width={60}
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <Table columns={column} data={association} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AssociateAssetChecklist;
