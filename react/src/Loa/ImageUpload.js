import React from 'react';

function ImageUpload(props) {
  return (
    <input type='file' name='file' onChange={props.handleUploadImage} />
  );
}
export default ImageUpload;
