import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';


import QtSections from './QtSections';
import NavTabs from './NavTabs';
import SwitchParts from './SwitchParts';
import StatusPost from './StatusPost';

import { useStatusPost } from './hooks/statusPost';

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);

  const [isLock, setLock] = useState(true);
  const [numberClick, setNumberClick] = useState(1);

  const [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost] = useStatusPost();


  function handleUnlock() {
    if(numberClick === 5) {
      setLock(false);
      setNumberClick(0);
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

  if(isLock) {
    return (
      <div style={{width: '50px', height: '50px'}}
           onClick={handleUnlock}>

      </div>
    )
  }
  return (
    <div>

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
      <div onClick={()=>{
        console.log('isPrintMode', isPrintMode);
        setPrintMode(!isPrintMode);
      }}>printMode</div>


      <SwitchParts
        notifySuccessPost={notifySuccessPost}
        notifyErrorPost={notifyErrorPost}
      />


      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default withRouter(Editor);
