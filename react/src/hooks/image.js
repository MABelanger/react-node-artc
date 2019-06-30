import React, { useState, useEffect } from 'react';

import * as apiUtils from './apiUtils';

export const useImage = (dependencies) => {

  const [imagePaths, setImagePaths] = useState([]);

  function fetchImages() {
    fetch('/image', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(imagePaths => {
      setImagePaths(imagePaths)
    })
  }

  function handleUploadImage (e) {
     const files = Array.from(e.target.files)

     const formData = new FormData();

     files.forEach((file, i) => {
       formData.append(i, file);
     })

     fetch('/image', {
       method: 'POST',
       body: formData
     })
     .then(res => res.json())
     .then(json => {
       let { imagePath } = json;
       setImagePaths([...imagePaths, imagePath])
     })
   }

  useEffect(() => {
    fetchImages()
  }, dependencies);

  return [imagePaths, handleUploadImage];

}
