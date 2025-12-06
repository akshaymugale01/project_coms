import React from 'react'
import { useSelector } from 'react-redux';
import ModalWrapper from '../../../../containers/modals/ModalWrapper';

const DeleteSectionModal = ({onclose, handleDeleteSection, title}) => {
 
    const themeColor = useSelector((state)=> state.theme.color)
    return (
        <ModalWrapper style={{background: themeColor, color:"white"}} onclose={onclose}>
          <div className="flex flex-col justify-center w-[20rem] md:w-[30rem]">
          <h4 className='font-medium text-white text-xl'>{title} </h4>
          <hr style={{ borderColor: "#fff" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }} className='gap-5 text-white my-2'>
            <button
              onClick={handleDeleteSection}
              className="font-lg font-medium shadow-custom-all-sides p-2 px-4 rounded-md hover:bg-white hover:text-black hover:border-black border-2 transition duration-200"
            >
              Yes
            </button>
            <button onClick={onclose} className="font-lg font-medium shadow-custom-all-sides p-2 px-4 rounded-md hover:bg-white hover:text-black hover:border-black border-2 transition duration-200">
              No
            </button>
          </div>
          </div>
        </ModalWrapper>
      );
  
}

export default DeleteSectionModal
