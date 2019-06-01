import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Part from './Part';
import QtSection from './QtSection';
import NavTabs from './NavTabs';
import * as apiUtils from './apiUtils';


const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);
  const [partUpSubjects, setPartUpSubjects] = useState([]);
  const [partDownSubjects, setPartDownSubjects] = useState([]);

  useEffect(() => {
    apiUtils.promiseFetch('part_up.json').then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartUpSubjects(initSubjects);
      } else {
        setPartUpSubjects([]);
      }
    });
    apiUtils.promiseFetch('part_down.json').then((subjects) => {
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
              onPost={()=>{apiUtils.handlePost('part_up.json', partUpSubjects)}}
              onDownload={()=>{apiUtils.handleDownload('part_up.json', partUpSubjects)}}
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
              onPost={()=>{apiUtils.handlePost('part_down.json', partDownSubjects)}}
              onDownload={()=>{apiUtils.handleDownload('part_down.json', partDownSubjects)}}
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
