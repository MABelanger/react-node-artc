import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Part from './Part';
import QtSection from './QtSection';
import NavTabs from './NavTabs';
import * as apiUtils from './apiUtils';


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

const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);
  const [part, setPart] = useState({up:[], down:[]});

  useEffect(() => {
    console.log('componentDidMount');

    apiUtils.promiseFetch('/subjects.json').then((subjects) => {
      const initSubjects = (subjects.up && subjects.down) ? subjects : {};
      if(!subjects.error) {
        setPart(initSubjects)
      } else {
        setPart({})
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

  function handleChangeDownPartsSubject(subjects){
    setPart({...part, down:subjects});
  }

  function handleChangeUpPartsSubject(subjects){
    setPart({...part, up:subjects});
  }

  return (
    <div>

    <NavTabs
      pathname={props.location.pathname}
      history={props.history}
    />

      { isPrintMode && renderHidden() }

      <QtSection />

      <button onClick={()=>{
        apiUtils.postData('/subjects.json', part)
          .then((response) => {
            console.log('ok')
          }) // JSON-string from `response.json()` call
          .catch((error) => {
            console.error(error)
          });
      }}>POST</button>
      <br/>
      <br/>
      <div onClick={()=>{
        console.log('isPrintMode', isPrintMode);
        setPrintMode(!isPrintMode);
      }}>printMode</div>


      <Switch>
        <Route path="/up" render={() => {
          return <Part
            title={'up'}
            subjects={part.up}
            onChangeSubject={handleChangeUpPartsSubject}
          />
        }}/>
        <Route path="/down" render={() => {
          return <Part
            title={'down'}
            subjects={part.down}
            onChangeSubject={handleChangeDownPartsSubject}
          />
        }}/>
      </Switch>

      <button onClick={()=>{
        downloadJson(part, 'subjects.json');
      }}>download</button>

      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default withRouter(Editor);
