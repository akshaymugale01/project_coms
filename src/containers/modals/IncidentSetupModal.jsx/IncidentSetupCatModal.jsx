import React from 'react'
import ModalWrapper from '../ModalWrapper';

const IncidentSetCategoryModal = ({ onclose} ) => {
    return (
      <ModalWrapper onclose={onclose}>
        <div className="flex flex-col w-64 justify-center">
          <h2 className="flex gap-4 items-center justify-center font-bold text-lg my-2">
              Incident Category
          </h2>
          <div className="border-t-2 border-black">
              <div className="flex flex-col my-5">
                  <input
                      type='text'
                      name=""
                      id=""
                      placeholder='name'
                      className="border p-1 py-3 border-gray-500 rounded-md w-full"
                    >
                    </input>
              </div>
          </div>
          <div className="border-t-2 border-black my-4"></div>
          <div className="flex justify-end">
            <button className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black ">
              Submit
            </button>
          </div>
        </div>
      </ModalWrapper>
    );
  };

export default IncidentSetCategoryModal