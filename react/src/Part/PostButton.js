import React from 'react';
import * as apiUtils from '../apiUtils';

const PostButton = ({onPost}) => {

  return (
    <button onClick={()=>{
      onPost();
    }}>POST</button>
  );
}

export default PostButton;
