import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFolder } from '../../features/FileExplorer/FileExplorer';


const Folder = ({ folder }) => {
  const structure = useSelector(state => state.fileExplorer);
  const dispatch = useDispatch();

console.log(structure)

  const subItems = structure.filter(item => item.path.startsWith(`${folder.path}/`) && item.path.split('/').length === folder.path.split('/').length + 1);

  const handleAddFolder = (parentPath) => {
    const name = prompt('Enter folder name:');
    if (name) {
      dispatch(addFolder({ name, path: `${parentPath}/${name}` }));
    }
  };

  const handleDownload = (filePath) => {
    // Implement file download logic here
    console.log(`Download file: ${filePath}`);
  };

  const handleView = (filePath) => {
    // Implement file view logic here
    console.log(`View file: ${filePath}`);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <div>{folder.name}</div>
      <button onClick={() => handleAddFolder(folder.path)}>Create Folder</button>
      <FileUpload parentPath={folder.path} />
      {subItems.map(item => (
        item.type === 'folder'
          ? <Folder key={item.path} folder={item} />
          : <div key={item.path} style={{ marginLeft: '20px' }}>
              {item.name}
              <button onClick={() => handleDownload(item.path)}>Download</button>
              <button onClick={() => handleView(item.path)}>View</button>
            </div>
      ))}
    </div>
  );
};

export default Folder;
