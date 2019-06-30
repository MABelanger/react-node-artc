import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';


import QtSections from './QtSections';
import NavTabs from './NavTabs';
import SwitchParts from './SwitchParts';
import StatusPost from './StatusPost';

import { useStatusPost } from './hooks/statusPost';

const INIT_NUMBER_CLICK = 1;

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);

  const [isLock, setLock] = useState(false);
  const [numberClick, setNumberClick] = useState(INIT_NUMBER_CLICK);

  const [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost] = useStatusPost();


  function handleUnlock() {
    if(numberClick >= 5) {
      setLock(false);
      setNumberClick(INIT_NUMBER_CLICK);
    } else {
      setNumberClick(numberClick+1);
    }
  }

  function handleLock() {
    setLock(true);
  }

  function renderHidden() {
    return(
      <style>{`
        button, input {
          visibility: hidden;
        }
      `}</style>
    )
  }

  function handlePrintMode() {
    setPrintMode(!isPrintMode);
  }

  const visibilityLock = !isLock ? {height: '0px'}: {};
  const visibilityEditor = isLock ? {visibility: 'hidden'}: {visibility: 'inherit'};

  return (
    <>
      <div style={{width: '50px', height: '50px', ...visibilityLock}}
           onClick={handleUnlock}>
      </div>

      <div style={visibilityEditor}>

        <StatusPost
          isSuccessPost={isSuccessPost}
          isErrorPost={isErrorPost}
        />

        <NavTabs
          pathname={props.location.pathname}
          history={props.history}
        />

        { isPrintMode && renderHidden() }

        <QtSections />

        <button onClick={handleLock}>Lock</button>
        <br/>
        <br/>
        <div onClick={handlePrintMode}>
          printMode
        </div>


        <SwitchParts
          notifySuccessPost={notifySuccessPost}
          notifyErrorPost={notifyErrorPost}
        />


        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    </>
  );
}

export default withRouter(Editor);
