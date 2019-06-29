import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import { useStatusPost } from './hooks/statusPost';


import QtSections from './QtSections';
import NavTabs from './NavTabs';
import SwitchParts from './SwitchParts';

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);

  const [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost] = useStatusPost([]);


  useEffect(() => {
  }, [isSuccessPost, isErrorPost]);

  function renderHidden() {
    return(
      <style>{`
        button, input {
          visibility: hidden;
        }
      `}</style>
    )
  }

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

  return (
    <div>

      {isSuccessPost && renderSuccess('saved!')}
      {isErrorPost && renderError('Not saved!')}

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


      <SwitchParts />


      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default withRouter(Editor);
