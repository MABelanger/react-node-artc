import React from 'react';

// https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
function downloadJson (data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    let json = JSON.stringify(data);
    let blob = new Blob([json], {type: "octet/stream"});
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}


const PostButton = ({data, jsonName}) => {
  console.log('jsonName', jsonName);
  return (
    <button onClick={()=>{
      downloadJson(data, jsonName);
    }}>download</button>
  );
}

export default PostButton;
