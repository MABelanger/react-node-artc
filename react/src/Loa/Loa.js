import React from 'react';
import ImageUpload from './ImageUpload';
import Images from './Images';
import { useImage } from './hooks/image';

export function Loa(props) {
  const [imagePaths, handleUploadImage] = useImage([]);
  return (
    <>
      <ImageUpload handleUploadImage={handleUploadImage} />
      <Images imagePaths={imagePaths}/>
    </>
  );
}
export default Loa;
