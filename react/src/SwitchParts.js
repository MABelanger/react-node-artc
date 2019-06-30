import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { useHttp } from './hooks/http';
import Part from './Part';
import Notes from './Notes';
import Loa from './Loa';


import {
  PART_UP_JSON_NAME,
  PART_DOWN_JSON_NAME,
  PART_TMP_JSON_NAME,
  NOTE_JSON_NAME
} from './constants';


export default function SwitchParts(props) {

  let [
    partUpSubjects,
    partDownSubjects,
    partTmpSubjects,
    notes,

    setPartUpSubjects,
    setPartDownSubjects,
    setPartTmpSubjects,
    setNotes,
    handlePost,
    handleDownload
  ] = useHttp(props.notifySuccessPost, props.notifyErrorPost, []);



  function handleSetPartUpSubjects(subjects) {
    setPartUpSubjects(subjects)
  }

  function handleSetPartDownSubjects(subjects) {
    setPartDownSubjects(subjects)
  }

  function handleSetPartTmpSubjects(subjects) {
    setPartTmpSubjects(subjects)
  }

  function handleSetNotes(notes) {
    setNotes(notes)
  }

    return (
      <Switch>
        <Route path="/up" render={() => {
          return (
          <div>
            <Part
              onPost={()=>{
                handlePost(PART_UP_JSON_NAME, partUpSubjects);
              }}
              onDownload={()=>{
                handleDownload(PART_UP_JSON_NAME, partUpSubjects)
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
                handleDownload(PART_DOWN_JSON_NAME, partDownSubjects)
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
                handleDownload(PART_TMP_JSON_NAME, partTmpSubjects)
              }}
              subjects={partTmpSubjects}
              onSetSubjects={handleSetPartTmpSubjects}
            />
          </div>
          )
        }}/>

        <Route path="/notes" render={() => {
          return (
          <div>
            <Notes
              onPost={()=>{
                handlePost(NOTE_JSON_NAME, notes);
              }}
              onDownload={()=>{
                handleDownload(NOTE_JSON_NAME, notes);
              }}
              notes={notes}
              onSetNotes={handleSetNotes}
            />
          </div>
          )
        }}/>

        <Route path="/loa" render={() => {
          return (
          <div>
            <Loa />
          </div>
          )
        }}/>
      </Switch>
    )
  }
