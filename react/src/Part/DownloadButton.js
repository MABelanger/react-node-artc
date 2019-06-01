import React from 'react';

const DownloadButton = ({onDownload}) => {
  return (
    <button onClick={()=>{
      onDownload();
    }}>download</button>
  );
}

export default DownloadButton;
