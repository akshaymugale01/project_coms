

import React, { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import ModalWrapper from './ModalWrapper';
import { getItemInLocalStorage } from '../../utils/localStorage';

const ImportAssetModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
const token = getItemInLocalStorage("TOKEN")
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // formData.append('utf8', '✓');
    // formData.append('authenticity_token', token);

    try {
      const response = await fetch(`http://admin.vibecopilot.ai/site_assets/import/?token=${token}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        onClose();
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <ModalWrapper onclose={onClose}>
      <div className="flex flex-col justify-center">
        <h2 className="flex gap-4 items-center justify-center font-bold text-lg">
          <IoAddCircle size={20} />
          Bulk Upload 
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" acceptCharset="UTF-8">
          <input name="utf8" type="hidden" value="✓" />
          <input type="hidden" name="authenticity_token" value="FLtfXHPj0C0KSMMFaa8iowACNVJZP5erTte5NUQYtrwqE9FJl9zYzqK+/kda5x4NFP2RQiggWqnMuVVOhodnJQ==" />
          <div className="form-group">
            <section className="flex flex-col gap-3"> 
              <p className='font-medium'>
                Drag &amp; Drop or 
              </p>
              <input
                type="file"
                name="file"
                id="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </section>
          </div>
          <div className='flex justify-end gap-4 my-5 items-center'>
            <button
              type="submit"
              name="commit"
              value="Import"
              className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300"
              data-disable-with="Import"
            >
              Import
            </button>
            <a
              download="assets_import.xlsx"
              target="_blank"
              className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300"
              href="http://admin.vibecopilot.ai/assets/assets_import.xlsx"
            >
              Download Sample Format
            </a>
          </div>
        </form>
        {/* <div className="flex justify-center mt-4">
          <button
            className="bg-black p-1 px-4 border-2 rounded-md text-white font-medium border-black hover:bg-white hover:text-black transition-all duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </ModalWrapper>
  );
}

export default ImportAssetModal;

