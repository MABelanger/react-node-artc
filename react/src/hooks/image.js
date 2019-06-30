import React, { useState, useEffect } from 'react';

import * as apiUtils from './apiUtils';




export const useImage = (dependencies) => {

  const [images, setImages] = useState([]);

  function fetchImages() {

  }

  function handleUploadImage (e) {
     const files = Array.from(e.target.files)

     const formData = new FormData();

     files.forEach((file, i) => {
       formData.append(i, file)
     })

     fetch('/image', {
       method: 'POST',
       body: formData
     })
     .then(res => res.json())
     .then(images => {
       setImages(images)
     })
   }

  useEffect(() => {
    fetchImages()
  }, dependencies);

  return [images, handleUploadImage];

}
