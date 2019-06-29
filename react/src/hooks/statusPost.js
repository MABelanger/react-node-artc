import React, { useState, useEffect } from 'react';

export const useStatusPost = (dependencies) => {

  const [isSuccessPost, setSuccessPost] = useState(false);
  const [isErrorPost, setErrorPost] = useState(false);

  function notifySuccessPost() {
    setSuccessPost(true)
    setTimeout(()=>{
      setSuccessPost(false)
    },1000);
  }

  function notifyErrorPost() {
    setErrorPost(true)
    setTimeout(()=>{
      setErrorPost(false)
    },1000);
  }

  return [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost];

}
