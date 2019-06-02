import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Part from './Part';
import QtSection from './QtSection';
import NavTabs from './NavTabs';
import * as apiUtils from './apiUtils';

const PART_UP_JSON_NAME = 'part_up.json';
const PART_DOWN_JSON_NAME = 'part_down.json';
const PART_TMP_JSON_NAME = 'part_tmp.json';

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);
  const [partUpSubjects, setPartUpSubjects] = useState([]);
  const [partDownSubjects, setPartDownSubjects] = useState([]);
  const [partTmpSubjects, setPartTmpSubjects] = useState([]);
  const [isSuccessPost, setSuccessPost] = useState(false);
  const [isErrorPost, setErrorPost] = useState(false);

  useEffect(() => {
    apiUtils.promiseFetch(PART_UP_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartUpSubjects(initSubjects);
      } else {
        setPartUpSubjects([]);
      }
    });
    apiUtils.promiseFetch(PART_DOWN_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartDownSubjects(initSubjects);
      } else {
        setPartDownSubjects([]);
      }
    });
    apiUtils.promiseFetch(PART_TMP_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartTmpSubjects(initSubjects);
      } else {
        setPartTmpSubjects([]);
      }
    });
  }, []);

  function renderHidden() {
    return(
      <style>{`
        button, input {
          visibility: hidden;
        }
      `}</style>
    )
  }

  function handleSetPartUpSubjects(subjects) {
    setPartUpSubjects(subjects)
  }

  function handleSetPartDownSubjects(subjects) {
    setPartDownSubjects(subjects)
  }

  function handleSetPartTmpSubjects(subjects) {
    setPartTmpSubjects(subjects)
  }

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

  function handlePost(jsonName, partSubjects){
    apiUtils.handlePost(jsonName, partSubjects)
      .then((response) => {
        notifySuccessPost();
      }) // JSON-string from `response.json()` call
      .catch((error) => {
        notifyErrorPost();
      });
  }

  function renderSuccess(message) {
    return(
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    )
  }

  function renderError(message) {
    return(
      <div className="alert alert-danger" role="alert">
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

      <QtSection />

      <br/>
      <br/>
      <div onClick={()=>{
        console.log('isPrintMode', isPrintMode);
        setPrintMode(!isPrintMode);
      }}>printMode</div>


      <Switch>
        <Route path="/up" render={() => {
          return (
          <div>
            <Part
              onPost={()=>{
                handlePost(PART_UP_JSON_NAME, partUpSubjects);
              }}
              onDownload={()=>{
                apiUtils.handleDownload(PART_UP_JSON_NAME, partUpSubjects)
              }}
              subjects={partUpSubjects}
              onSetSubjects={handleSetPartUpSubjects}
            />
          </div>
          )
        }}/>

        <Route path="/down" render={() => {
          return (
          <div>
            <Part
              onPost={()=>{
                handlePost(PART_DOWN_JSON_NAME, partDownSubjects);
              }}
              onDownload={()=>{
                apiUtils.handleDownload(PART_DOWN_JSON_NAME, partDownSubjects)
              }}
              subjects={partDownSubjects}
              onSetSubjects={handleSetPartDownSubjects}
            />
          </div>
          )
        }}/>

        <Route path="/tmp" render={() => {
          return (
          <div>
            <Part
              onPost={()=>{
                handlePost(PART_TMP_JSON_NAME, partTmpSubjects);
              }}
              onDownload={()=>{
                apiUtils.handleDownload(PART_TMP_JSON_NAME, partTmpSubjects)
              }}
              subjects={partTmpSubjects}
              onSetSubjects={handleSetPartTmpSubjects}
            />
          </div>
          )
        }}/>

      </Switch>

      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default withRouter(Editor);
