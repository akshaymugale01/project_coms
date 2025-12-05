import React from 'react'
import { useSelector } from "react-redux";
import Table from '../../../../components/table/Table';
import { IoMdPrint } from 'react-icons/io'
import { MdFeed } from 'react-icons/md'

const ResOrderDetails = () => {
    const themeColor = useSelector((state)=> state.theme.color)
    const column = [



        { name: "Date", selector: (row) => row.SGST_Rate, sortable: true },
        { name: "Status", selector: (row) => row.SGST_Rate, sortable: true },
        { name: "Comments", selector: (row) => row.SGST_Rate, sortable: true },
        { name: "Updated by", selector: (row) => row.SGST_Rate, sortable: true },



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
  <h3 className="border-b text-center text-xl border-black mb-6 font-bold">RESTAURTANT ORDER DETAILS</h3>
  <div className='flex mr-5'>
                <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md mx-3'>
                    <MdFeed/>
                    feeds
                </button> 
                <button className='font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md'>
                    <IoMdPrint />
                    Print
                </button>
            </div>
  <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
  <h3 className="border-b text-center text-xl border-black mb-6 font-bold">HAVEN CAFE</h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Delivery Address:</p>
      <p className="text-gray-700">Aquil Husain</p>
      <p className="text-gray-700">GoPhygital</p>
      <p className="text-gray-700">Manager</p>
      <p className="text-gray-700">91 98202261424</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Order ID:</p>
      <p className="text-gray-700">1205</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Order Date:</p>
      <p className="text-gray-700">21/05/2024 12:28 PM</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Payment Mode:</p>
      <p className="text-gray-700">[Payment Mode]</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Payment Status:</p>
      <p className="text-gray-700">[Payment Status]</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Transaction ID:</p>
      <p className="text-gray-700">[Transaction ID]</p>
    </div>
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-2">Preferred Time:</p>
      <p className="text-gray-700">[Preferred Time]</p>
    </div>
    </div>
  </div>
</div>

<div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
<div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
  <h3 className="border-b text-center text-xl border-black mb-6 font-bold">ORDER SUMMARY</h3>
  <div className="w-full mx-3 my-5 p-5 shadow-lg rounded-lg border border-gray-300">
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-gray-700 font-bold">Item List</th>
          <th className="py-2 px-4 border-b-2 border-gray-300 text-right text-gray-700 font-bold">Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300 text-gray-700">Upma With Chutney & Sambar</td>
          <td className="py-2 px-4 border-b border-gray-300 text-right text-gray-700">40.0 x 1</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300 text-gray-700 font-bold">Sub Total :</td>
          <td className="py-2 px-4 border-b border-gray-300 text-right text-gray-700">40.00</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300 text-gray-700 font-bold">GST :</td>
          <td className="py-2 px-4 border-b border-gray-300 text-right text-gray-700">0.00</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border-b border-gray-300 text-gray-700 font-bold">Delivery Charge :</td>
          <td className="py-2 px-4 border-b border-gray-300 text-right text-gray-700">0.00</td>
        </tr>
        <tr>
          <td className="py-2 px-4 text-gray-700 font-bold">TOTAL :</td>
          <td className="py-2 px-4 text-right text-gray-700 font-bold">40.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</div>
<div className="md:mx-20 my-5 mb-10 sm:border border-gray-400 p-5 px-10 rounded-lg sm:shadow-xl">
<h3 className="border-b text-center text-xl border-black mb-6 font-bold">GST </h3>
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
  )
}

export default ResOrderDetails