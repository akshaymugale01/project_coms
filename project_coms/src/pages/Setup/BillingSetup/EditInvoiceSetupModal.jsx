import React from "react";
import ModalWrapper from "../../../containers/modals/ModalWrapper";

function EditInvoiceSetupModal({ onclose }) {
  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10 w-80">
        <h1 className="font-semibold text-center text-xl">Invoice Type</h1>
        <div className="border-b border-gray-300"></div>
        <div className="md:grid grid-cols-1 gap-5">
          {/* Input Field 1 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md px-3 py-1"
              placeholder="Enter Name"
            />
          </div>

          {/* Input Field 2 */}
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="invoice_type" className="text-sm font-medium text-gray-700">
            Invoice Type
            </label>
            <input
              type="text"
              id="invoice_type"
              className="border border-gray-300 rounded-md px-3 py-1"
              placeholder="Enter Invoice Type"
            />
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-1 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default EditInvoiceSetupModal