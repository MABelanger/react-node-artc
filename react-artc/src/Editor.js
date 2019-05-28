import React, { useState, useEffect } from 'react';

import Parts from './Parts';
import QtSections from './QtSections';

import jsonQtapSections from './mocks/qtSections.json';


function promiseSubjects(){
  return fetch('/subjects.json',{
    credentials: 'include'
  })
    .then(async (response)=>{
      try {
        let jsonResponse = await response.json()
        return Promise.resolve(jsonResponse)

      } catch(e) {
        console.log('subjects.json parsing error');
        return Promise.resolve([]);
      }
    })
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: 'include'
    })
    .then(response => response.json()); // parses response to JSON
}

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
    promiseSubjects().then((subjects) => {
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
      { isPrintMode && renderHidden() }

      <QtSections qtSections={jsonQtapSections || []}/>

      <Parts
        title={'up'}
        subjects={part.up}
        onChangeSubject={handleChangeUpPartsSubject}
      />

      <Parts
        title={'down'}
        subjects={part.down}
        onChangeSubject={handleChangeDownPartsSubject}
      />

      <button onClick={()=>{
        downloadJson(part, 'subjects.json');
      }}>download</button>

      <button onClick={()=>{
        postData('/subjects.json', part)
          .then((response) => {
            console.log('ok')
          }) // JSON-string from `response.json()` call
          .catch((error) => {
            console.error(error)
          });
      }}>POST</button>

      <div onClick={()=>{
        console.log('isPrintMode', isPrintMode);
        setPrintMode(!isPrintMode);
      }}>printMode</div>

      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  );
}

export default Editor;
