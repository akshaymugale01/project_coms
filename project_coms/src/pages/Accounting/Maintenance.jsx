import React from "react";

const Maintenance = () => {
  const tableA = [
    { code: "A", label: "Advance Maintenance charges received", amount: 97200 },
    { code: "B", label: "Less: Transfer to Apex Body (Proposed)", amount: 19440 },
    { code: "C", label: "Balance for Building Maintenance Charges", amount: 77760 },
  ];

  const expenses = [
    { sr: 1, item: "Electricity", amt: 19802 },
    { sr: 2, item: "Event Management", amt: 20 },
    { sr: 3, item: "Housekeeping Material", amt: 443 },
    { sr: 4, item: "Housekeeping Services", amt: 7025 },
    { sr: 5, item: "Insurance", amt: 1006 },
    { sr: 6, item: "Management Services (Society 123)", amt: 44 },
    { sr: 7, item: "OWC Operation", amt: 99 },
    { sr: 8, item: "Pest Control", amt: 240 },
    { sr: 9, item: "Repair & Maint (Misc)", amt: 483 },
    { sr: 10, item: "Security Services", amt: 8385 },
    { sr: 11, item: "Stationary Charges", amt: 107 },
    { sr: 12, item: "STP AMC", amt: 3750 },
    { sr: 13, item: "Water Charges", amt: 21970 },
    { sr: 14, item: "WTP AMC", amt: 3265 },
    { sr: 15, item: "Soc. Mgmt Fee @ 8%", amt: 5331 },
  ];

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 w-[900px] shadow-lg border border-gray-300">

        {/* Title Box */}
        <div className="border border-gray-600 text-center p-4 mb-6">
          <p className="font-bold text-lg">J P INFRA REALTY PVT. LTD.</p>
          <p className="text-sm">
            401-402, Viraj Tower, Western Express Highway,<br />
            Near WEH Metro Station,<br />
            Andheri (East), Mumbai 400 093.
          </p>
          <p className="text-sm font-bold mt-1 text-red-600">
            NORTH GARDEN CITY ELARA PROJECT
          </p>
        </div>

        {/* Statement Heading */}
        <div className="border border-gray-600 text-center py-2 font-semibold text-sm mb-4">
          STATEMENT OF COMMON AREA MAINTENANCE EXPENSES
        </div>

        {/* Info Box */}
        <table className="w-full border border-gray-600 text-sm mb-6">
          <tbody>
            <tr>
              <td className="border border-gray-600 px-2 py-1 font-medium w-1/2">
                Period: May 2021 to December, 2022
              </td>
              <td className="border border-gray-600 px-2 py-1 font-medium w-1/2">
                No.: NGC/F/2022-23/133
              </td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-2 py-1 font-medium">
                Flat No: 4A-*****
              </td>
              <td className="border border-gray-600 px-2 py-1 font-medium">
                Date: 25/01/2023
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                className="border border-gray-600 px-2 py-1 font-medium"
              >
                Name: XYZ
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border border-gray-600 text-sm mb-6">
  <thead>
    <tr className="bg-gray-100 font-semibold">
      <th className="border border-gray-600 px-2 py-1">Sr. No.</th>
      <th className="border border-gray-600 px-2 py-1">Particulars</th>
      <th className="border border-gray-600 px-2 py-1"></th>
      <th className="border border-gray-600 px-2 py-1">
        Amount(Rs.)
      </th>
    </tr>
  </thead>

  <tbody>
    {/* Section A B C */}
    {tableA.map((row, idx) => (
      <tr key={`A-${idx}`}>
        <td className="border border-gray-600 px-2 py-1 font-bold">
          {row.code}
        </td>
        <td className="border border-gray-600 px-2 py-1">
          {row.label}
        </td>

        {/* Empty Amt column for A,B,C */}
        <td className="border border-gray-600 px-2 py-1 text-right"></td>

        {/* Amount column */}
        <td className="border border-gray-600 px-2 py-1 text-right font-medium">
          {row.amount}
        </td>
      </tr>
    ))}
       
         <tr className="bg-gray-100 font-semibold">
            <td className="border border-gray-600 px-2 py-1">Sr. No.</td>
            <td className="border border-gray-600 px-2 py-1">Particulars</td>
            <td className="border border-gray-600 px-2 py-1">Amt (Rs.)</td>
            <td className="border border-gray-600 px-2 py-1"></td>
        </tr>

    {/* Expenses */}
    {expenses.map((e) => (
      <tr key={`E-${e.sr}`}>
        <td className="border border-gray-600 px-2 py-1 text-center">
          {e.sr}
        </td>
        <td className="border border-gray-600 px-2 py-1">
          {e.item}
        </td>

        {/* Amt Column */}
        <td className="border border-gray-600 px-2 py-1 text-right">
          {e.amt}
        </td>

        {/* Final Amount Column (same value) */}
        {/* <td className="border border-gray-600 px-2 py-1 text-right">
          {e.amt}
        </td> */}
        <td className="border border-gray-600 px-2 py-1 text-right"></td>
      </tr>
    ))}

    {/* Total Expenses */}
    <tr>
      <td className="border border-gray-600 px-2 py-1 font-bold">D</td>
      <td className="border border-gray-600 px-2 py-1 font-semibold">Total Expenses</td>

      {/* Empty Amt column for total */}
      <td className="border border-gray-600 px-2 py-1 text-right font-semibold"></td>

      <td className="border border-gray-600 px-2 py-1 text-right font-semibold">
        71970
      </td>
    </tr>

    {/* Balance */}
    <tr>
      <td className="border border-gray-600 px-2 py-1 font-bold">E</td>
      <td className="border border-gray-600 px-2 py-1 font-semibold">Balance (C - D)</td>

      {/* Empty Amt column */}
      <td className="border border-gray-600 px-2 py-1 text-right font-semibold"></td>

      <td className="border border-gray-600 px-2 py-1 text-right font-semibold">
        5790
      </td>
    </tr>
  </tbody>
</table>


        {/* Notes */}
        <ul className="text-xs leading-5 mt-4">
          <li>1) Any Debit / Credit of expenses will be adjusted in next statement of expenses.</li>
          <li>2) This is computer generated statement, signature is not required.</li>
          <li>3) For queries write to XYZ</li>
          <li>4) These are consolidated expenses for the period mentioned above.</li>
        </ul>
      </div>
    </div>
  );
};

export default Maintenance;