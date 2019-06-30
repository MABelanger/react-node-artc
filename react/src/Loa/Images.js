import React from 'react';

function Images(props) {
  let { imagePaths } = props;
  return (
    imagePaths && imagePaths.slice(0).reverse().map((imagePath)=>{
      return <img style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src={imagePath} />
    })
  );
}
export default Images;
