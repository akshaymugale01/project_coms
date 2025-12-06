import React from 'react'
import FileInputBox from '../../../../containers/Inputs/FileInputBox'

const AddResMenu = () => {
  return (
    <div>
        <div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
  <h3 className="border-b text-center text-xl border-black mb-6 font-bold">ADD PRODUCT</h3>
  <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="product-name">Product Name*</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product-name" type="text" placeholder="Product Name" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="sku">SKU*</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sku" type="text" placeholder="SKU" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="master-price">Master Price*</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="master-price" type="text" placeholder="Master Price" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="display-price">Display Price</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="display-price" type="text" placeholder="Display Price" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">Stock</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="text" placeholder="Stock" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="active">Active</label>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="active">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Category*</label>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category">
          <option value="">Select Category</option>
          {/* Category options here */}
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="subcategory">Subcategory</label>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subcategory">
          <option value="">Select Subcategory</option>
          {/* Subcategory options here */}
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="sgst-rate">SGST Rate</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sgst-rate" type="text" placeholder="SGST Rate" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="sgst-amount">SGST Amount</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sgst-amount" type="text" placeholder="SGST Amount" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="cgst-rate">CGST Rate</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cgst-rate" type="text" placeholder="CGST Rate" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="cgst-amount">CGST Amount</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cgst-amount" type="text" placeholder="CGST Amount" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="igst-rate">IGST Rate</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="igst-rate" type="text" placeholder="IGST Rate" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="igst-amount">IGST Amount</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="igst-amount" type="text" placeholder="IGST Amount" />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" />
      </div>
    </div>
    <label htmlFor="">Manual Upload</label>
    <FileInputBox/>
  </div>
</div>

    </div>
  )
}

export default AddResMenu