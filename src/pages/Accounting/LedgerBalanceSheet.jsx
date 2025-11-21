import React from "react";

const LedgerBalanceSheet = ({ data, onClose }) => {
  const { ledger, data: balanceData } = data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Balance Sheet - {ledger.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ledger Code</p>
              <p className="font-medium">{ledger.code || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Group</p>
              <p className="font-medium">{ledger.account_group?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Opening Balance</p>
              <p className="font-medium">₹{parseFloat(ledger.opening_balance || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Balance</p>
              <p className="font-medium text-lg text-blue-600">
                ₹{parseFloat(balanceData.current_balance || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {balanceData.transactions && balanceData.transactions.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Recent Transactions</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Debit
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Credit
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {balanceData.transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {transaction.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        {transaction.debit ? `₹${parseFloat(transaction.debit).toFixed(2)}` : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        {transaction.credit ? `₹${parseFloat(transaction.credit).toFixed(2)}` : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                        ₹{parseFloat(transaction.balance).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LedgerBalanceSheet;