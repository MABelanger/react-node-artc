import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Part from './Part';
import QtSection from './QtSection';
import NavTabs from './NavTabs';
import * as apiUtils from './apiUtils';


const Editor = (props) => {
  const [isPrintMode, setPrintMode] = useState(false);
  const [partUpInitSubjects, setPartUpInitSubjects] = useState([]);
  const [partDownInitSubjects, setPartDownInitSubjects] = useState([]);

  const partUpJsonName = 'part_up.json';
  const PartDownJsonName = 'part_down.json';

  useEffect(() => {
    apiUtils.promiseFetch(partUpJsonName).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartUpInitSubjects(initSubjects)
      } else {
        setPartUpInitSubjects([])
      }
    });
    apiUtils.promiseFetch(PartDownJsonName).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartDownInitSubjects(initSubjects)
      } else {
        setPartDownInitSubjects([])
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
          return <Part
            title={'up'}
            initSubjects={partUpInitSubjects}
            jsonName={'part_up.json'}
          />
        }}/>

        <Route path="/down" render={() => {
          return <Part
            title={'down'}
            initSubjects={partDownInitSubjects}
            jsonName={'part_down.json'}
          />
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
