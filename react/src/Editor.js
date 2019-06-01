import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Part from './Part';
import QtSection from './QtSection';
import NavTabs from './NavTabs';
import * as apiUtils from './apiUtils';

const PART_UP_JSON_NAME = 'part_up.json';
const PART_DOWN_JSON_NAME = 'part_down.json';

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);
  const [partUpSubjects, setPartUpSubjects] = useState([]);
  const [partDownSubjects, setPartDownSubjects] = useState([]);

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

  function handleSetPartUpInitSubjects(subjects) {
    setPartUpSubjects(subjects)
  }

  function handleSetPartDownInitSubjects(subjects) {
    setPartDownSubjects(subjects)
  }

  return (
    <div>

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
              onPost={()=>{ apiUtils.handlePost(PART_UP_JSON_NAME, partUpSubjects)} }
              onDownload={()=>{ apiUtils.handleDownload(PART_UP_JSON_NAME, partUpSubjects)} }
              subjects={partUpSubjects}
              onSetSubjects={handleSetPartUpInitSubjects}
            />
          </div>
          )
        }}/>

        <Route path="/down" render={() => {
          return (
          <div>
            <Part
              onPost={()=>{ apiUtils.handlePost(PART_DOWN_JSON_NAME, partDownSubjects)} }
              onDownload={()=>{ apiUtils.handleDownload(PART_DOWN_JSON_NAME, partDownSubjects)} }
              subjects={partDownSubjects}
              onSetSubjects={handleSetPartDownInitSubjects}
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
