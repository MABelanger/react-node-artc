import React from 'react';

const PostButton = ({onPost}) => {

  return (
    <button onClick={()=>{
      onPost();
    }}>POST</button>
  );
}

export default PostButton;
