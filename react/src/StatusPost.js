import React, { useState, useEffect } from 'react';


function renderSuccess(message) {
  return(
    <div className="alert alert-success" role="alert" style={{float:'right'}}>
      {message}
    </div>
  )
}

function renderError(message) {
  return(
    <div className="alert alert-danger" role="alert" style={{float:'right'}}>
      {message}
    </div>
  )
}

const StatusPost = (props) => {

  return (
    <div>
      {props.isSuccessPost && renderSuccess('saved!')}
      {props.isErrorPost && renderError('Not saved!')}
    </div>
  );
}

export default StatusPost;
