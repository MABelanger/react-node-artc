import React from 'react';

function Images(props) {
  let { imagePaths } = props;

  const imgStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  };

  return (
    imagePaths && imagePaths.slice(0).reverse().map((imagePath)=>{
      return <img style={imgStyle} src={imagePath} />
    })
  );
}
export default Images;
