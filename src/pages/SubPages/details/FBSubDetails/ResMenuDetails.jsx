import React from "react";
import { useSelector } from "react-redux";
import { IoMdPrint } from "react-icons/io";
import { MdFeed } from "react-icons/md";
import Table from "../../../../components/table/Table";

const ResMenuDetails = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const column = [
    { name: "SGST Rate", selector: (row) => row.SGST_Rate, sortable: true },
    { name: "SGST Amount", selector: (row) => row.SGST_Rate, sortable: true },
    { name: "CGST Rate", selector: (row) => row.SGST_Rate, sortable: true },
    { name: "CGST Amount", selector: (row) => row.SGST_Rate, sortable: true },
    { name: "IGST Rate", selector: (row) => row.SGST_Rate, sortable: true },
    { name: "IGST Amount", selector: (row) => row.SGST_Rate, sortable: true },
  ];
  const data = [
    {
      id: 1,

      SGST_Rate: "%",
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
        color: "white",

        fontSize: "14px",
      },
    },
  };
  return (
    <div>
      <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
          PRODUCT SETUP DETAILS
        </h3>
        <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
          <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
            OTHER INFO
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-name"
              >
                Product Name:Upma With Chutney & Sambar
              </label>
              {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product-name" type="text" placeholder="Product Name" value="Upma With Chutney & Sambar" /> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="sku"
              >
                SKU:Upma With Chutney & Sambar
              </label>
              {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sku" type="text" placeholder="SKU" value="Upma With Chutney & Sambar" /> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="master-price"
              >
                Master Price:40
              </label>
              {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="master-price" type="text" placeholder="Master Price" value="40" /> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="display-price"
              >
                Display Price:40
              </label>
              {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="display-price" type="text" placeholder="Display Price" value="40" /> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="stock"
              >
                Stock:5
              </label>
              {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="text" placeholder="Stock" value="5" /> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="active"
              >
                Active:Yes
              </label>
              {/* <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="active">
          <option value="yes" selected>Yes</option>
          <option value="no">No</option>
        </select> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category:Breaskfast
              </label>
              {/* <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
          <option value="breakfast" selected>Breakfast</option>
        </select> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="subcategory"
              >
                Subcategory:Breaskfast
              </label>
              {/* <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcategory">
          <option value="breakfast" selected>Breakfast</option>
        </select> */}
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              {/* <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description">Upma With Chutney & Sambar</textarea> */}
            </div>
          </div>
        </div>
      </div>

      <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
          Images{" "}
        </h3>
      </div>
      <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
        <h3 className="border-b text-center text-xl border-black mb-6 font-bold">
          GST{" "}
        </h3>
        <Table
          columns={column}
          data={data}
          customStyles={customStyle}
          responsive
          fixedHeader
          fixedHeaderScrollHeight="500px"
          pagination
          selectableRowsHighlight
          highlightOnHover
          omitColumn={column}
        />
      </div>
    </div>
  );
};

export default ResMenuDetails;
