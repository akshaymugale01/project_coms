import React, { useState } from 'react';

const permissions = [
  'Broadcast', 'Tickets', 'Documents', 'Supplier', 'Tasks', 'Schedule', 'Service',
  'Meters', 'AMC', 'Asset', 'Materials', 'PO', 'WO', 'Report', 'Attendance', 'Business Directory',
  'PO Approval', 'Bi Reports', 'Dashboard', 'Tracing', 'Restaurants', 'My Ledgers', 'Letter Of Intent',
  'Wo Invoices', 'Bill', 'Engineering Reports', 'Events', 'Customers', 'QuikGate Report', 'Task Management',
  'CEO Dashboard', 'Operational Audit', 'Mom Details', 'Pms Design Inputs', 'Vendor Audit', 'Permits',
  'Pending Approvals', 'Accounts', 'Customer Bills', 'My Bills', 'Water', 'STP', 'Daily Readings',
  'Utility Consumption', 'Utility Request', 'Space', 'Project Management', 'Pms Incidents', 'Site Dashboard',
  'Stepathone Dashboard', 'Transport', 'Waste Generation', 'GDN', 'Parking', 'GDN Dispatch', 'EV Consumption',
  'Msafe', 'EV Consumption', 'Permit Extend', 'Masters', 'GRN', 'SRNS', 'Accounts', 'Consumption',
  'Account', 'User & Roles', 'Meter Types', 'Asset Groups', 'Ticket', 'Email Rule', 'FM Groups',
  'Export', 'SAC/HSN Setup', 'Addresses', 'Master Checklist', 'Visitors', 'R Vehicles', 'G Vehicles',
  'Staffs', 'Goods In Out', 'Patrolling'
];

const allFunctionsRange = permissions.slice(0, permissions.indexOf('Permit Extend') + 1);
const inventoryRange = permissions.slice(permissions.indexOf('Masters'), permissions.indexOf('Consumption') + 1);
const setupRange = permissions.slice(permissions.indexOf('Account'), permissions.indexOf('Master Checklist') + 1);
const quickgateRange = permissions.slice(permissions.indexOf('Visitors'), permissions.indexOf('Patrolling') + 1);

const AddRole = () => {
  const [checkedState, setCheckedState] = useState(
    permissions.map(() => ({ all: false, add: false, view: false, edit: false, disable: false }))
  );

  const toggleGroup = (range, value) => {
    const newCheckedState = checkedState.map((row, i) => {
      if (range.includes(permissions[i])) {
        return {
          all: value,
          add: value,
          view: value,
          edit: value,
          disable: value,
        };
      }
      return row;
    });
    setCheckedState(newCheckedState);
  };

  const toggleRow = (index) => {
    const newCheckedState = checkedState.map((row, i) => {
      if (i === index) {
        const newAll = !row.all;
        return {
          all: newAll,
          add: newAll,
          view: newAll,
          edit: newAll,
          disable: newAll,
        };
      }
      return row;
    });
    setCheckedState(newCheckedState);
  };

  const toggleCheckbox = (index, checkboxType) => {
    const newCheckedState = checkedState.map((row, i) => {
      if (i === index) {
        return { ...row, [checkboxType]: !row[checkboxType] };
      }
      return row;
    });
    setCheckedState(newCheckedState);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex items-center mb-5">
        <label htmlFor="rowTitle" className="mr-2">Row title</label>
        <input type="text" id="rowTitle" className="border border-gray-400 p-2 rounded-md w-48" />
      </div>
      <div className="overflow-x-auto overflow-y-auto w-full h-[800px]">
        <table className="bg-white border-4 border-gray-600 min-w-max w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-2"></th>
              <th className="px-4 py-2 border-2">Functions</th>
              <th className="px-4 py-2 border-2">All</th>
              <th className="px-4 py-2 border-2">Add</th>
              <th className="px-4 py-2 border-2">View</th>
              <th className="px-4 py-2 border-2">Edit</th>
              <th className="px-4 py-2 border-2">Disable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border" rowSpan={allFunctionsRange.length + 1}>
                <input
                  type="checkbox"
                  onChange={(e) => toggleGroup(allFunctionsRange, e.target.checked)}
                  checked={allFunctionsRange.every(permission => {
                    const index = permissions.indexOf(permission);
                    return checkedState[index]?.all;
                  })}
                />&nbsp;
                <label htmlFor="">All functions</label>
              </td>
              {/* <td className="px-4 py-2 border">All Functions</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td> */}
            </tr>
            {allFunctionsRange.map((permission, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{permission}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].all}
                    onChange={() => toggleRow(permissions.indexOf(permission))}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].add}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'add')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].view}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'view')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].edit}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'edit')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].disable}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'disable')}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 border" rowSpan={quickgateRange.length + 1}>
                <input
                  type="checkbox"
                  onChange={(e) => toggleGroup(quickgateRange, e.target.checked)}
                  checked={quickgateRange.every(permission => {
                    const index = permissions.indexOf(permission);
                    return checkedState[index]?.all;
                  })}
                />&nbsp;
                <label htmlFor="">Quickgate</label>
              </td>
              {/* <td className="px-4 py-2 border">Quickgate</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td> */}
            </tr>
            {quickgateRange.map((permission, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{permission}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].all}
                    onChange={() => toggleRow(permissions.indexOf(permission))}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].add}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'add')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].view}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'view')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].edit}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'edit')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].disable}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'disable')}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 border" rowSpan={setupRange.length + 1}>
                <input
                  type="checkbox"
                  onChange={(e) => toggleGroup(setupRange, e.target.checked)}
                  checked={setupRange.every(permission => {
                    const index = permissions.indexOf(permission);
                    return checkedState[index]?.all;
                  })}
                />&nbsp;
                <label htmlFor="">Setup</label>
              </td>
              {/* <td className="px-4 py-2 border">Setup</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td> */}
            </tr>
            {setupRange.map((permission, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{permission}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].all}
                    onChange={() => toggleRow(permissions.indexOf(permission))}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].add}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'add')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].view}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'view')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].edit}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'edit')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].disable}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'disable')}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 border" rowSpan={inventoryRange.length + 1}>
                <input
                  type="checkbox"
                  onChange={(e) => toggleGroup(inventoryRange, e.target.checked)}
                  checked={inventoryRange.every(permission => {
                    const index = permissions.indexOf(permission);
                    return checkedState[index]?.all;
                  })}
                />&nbsp;
                <label htmlFor="">Inventory</label>
              </td>
              {/* <td className="px-4 py-2 border">Inventory</td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td>
              <td className="px-4 py-2 border"></td> */}
            </tr>
            {inventoryRange.map((permission, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{permission}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].all}
                    onChange={() => toggleRow(permissions.indexOf(permission))}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].add}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'add')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].view}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'view')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].edit}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'edit')}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={checkedState[permissions.indexOf(permission)].disable}
                    onChange={() => toggleCheckbox(permissions.indexOf(permission), 'disable')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mb-10'>
      <button className="mt-5 bg-black p-2 px-4 text-white rounded-md">Submit</button>
      </div>
    </div>
  );
};

export default AddRole;