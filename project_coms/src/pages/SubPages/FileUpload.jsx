import React from 'react';
import { useDispatch } from 'react-redux';
import { addFile } from '../../features/FileExplorer/FileExplorer';

const FileUpload = ({ parentPath }) => {
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(addFile({ name: file.name, path: `${parentPath}/${file.name}` }));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
