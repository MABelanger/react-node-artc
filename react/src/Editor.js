import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';


import QtSections from './QtSections';
import NavTabs from './NavTabs';
import SwitchParts from './SwitchParts';
import StatusPost from './StatusPost';

import { useStatusPost } from './hooks/statusPost';

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);

  const [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost] = useStatusPost();
  function renderHidden() {
    return(
      <style>{`
        button, input {
          visibility: hidden;
        }
      `}</style>
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
