import React from 'react';
import * as apiUtils from '../apiUtils';

const PostButton = ({jsonName, data}) => {

  return (
    <button onClick={()=>{
      const jsonPath = '/' + jsonName;
      console.log('jsonPath', jsonPath);
      console.log('data', data);

      apiUtils.postData(jsonName, data)
        .then((response) => {
          console.log('bibi ok')
        }) // JSON-string from `response.json()` call
        .catch((error) => {
          console.error(error)
        });
    }}>POST</button>
  );
}

export default PostButton;
