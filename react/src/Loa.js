import React from 'react';

import { useImage } from './hooks/image';

function Loa(props) {
  const [images, handleUploadImage] = useImage();
  return (
    <input type='file' name='file' onChange={handleUploadImage} />
  );
}
export default Loa;
