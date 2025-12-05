import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import AssetsDetailsAssociatedModal from "../../../../containers/modals/AssetsDetailsAssociatedModal";

function AssetsDetailsAssociated() {
  const [association, showAssociation] = useState(false);
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="my-5">
        <button className="p-1 border-2 border-black px-4 rounded-md hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-1 w-fit"
         onClick={() => showAssociation(!association)}
        >
          <IoAddCircle size={20} /> Add Association
        </button>
      </div>
      {association && (
        <AssetsDetailsAssociatedModal
          onclose={() => showAssociation(false)}
        />
      )}
    </div>
  );
}

export default AssetsDetailsAssociated;
