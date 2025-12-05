import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper';
import { BiFilterAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AddFmGroupSetupModal = ({ onclose} ) => {
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [items, setItems] = useState([
        { id: 1, label: 'Lockated Demo', isChecked: false },
        { id: 2, label: 'Abdul G', isChecked: false },
        { id: 3, label: 'Kiran Sharma', isChecked: false },
        { id: 4, label: 'Rajnish Patil', isChecked: false },
        { id: 5, label: 'Dinesh Shinde', isChecked: false },
      ]);
      const handleCheckboxChange = (id) => {
        const updatedItems = items.map(item =>
          item.id === id ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updatedItems);

        // Check if all items are now selected or not
        const allSelected = updatedItems.every(item => item.isChecked);
        setIsAllSelected(allSelected);
      };


      const handleSelectAllClick = () => {
        const newSelectAll = !isAllSelected;
        const updatedItems = items.map(item => ({
          ...item,
          isChecked: newSelectAll,
        }));
        setItems(updatedItems);
        setIsAllSelected(newSelectAll);
      };
    return (
        <ModalWrapper onclose={onclose}>
            <div className="flex flex-col justify-center ">
                <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
                    Add Group
                </h2>
                <div className='border-t border-black'>
                    <div className='md:grid grid-cols gap-2 my-3 '>
                        <div className="flex flex-col my-2">
                            <input
                              type='search'
                              name=""
                              id=""
                              placeholder='Enter Group Name'
                              className="border p-1 py-2 border-gray-500 rounded-md "
                            >
                            </input>
                        </div>
                    </div>
                    <div className=' mb-5 border-t border-black'>
                        <div className=''>
                            <h2 className="flex gap-4 items-center justify-start font-medium text-base my-2">
                                Add Members
                            </h2>
                        </div>
                        <div className='flex gap-3'>
                            <Link to="" className=" font-normal border-2 border-black px-3 p-1 flex gap-2 items-center rounded-md">
                              <BiFilterAlt />Filter
                            </Link>
                            <Link to="" className=" font-noemal border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md" onClick={handleSelectAllClick} >
                               {isAllSelected ? 'De-Select All Member' : 'Select All Member'}
                            </Link>
                        </div>
                    </div>
                    <div className='border-t border-black'>
                        {items.map(item => (
                            <div key={item.id}>
                                <div className='md:grid grid-cols gap-2 my-2 '>
                                    <div className="flex gap-3 ">
                                        <input
                                          type="checkbox"
                                          checked={item.isChecked}
                                          onChange={() => handleCheckboxChange(item.id)}
                                        />
                                       <label>{item.label}</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t-2 border-black my-2"></div>
                <div className="flex justify-center">
                    <button className="bg-black p-1 px-4 py-1 border-2 rounded-md text-white font-medium border-black ">
                        Submit 
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};


export default AddFmGroupSetupModal