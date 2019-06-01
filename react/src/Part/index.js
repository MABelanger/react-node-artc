import React, { useState, useEffect } from 'react';
import PostButton from './PostButton';
import DownloadButton from './DownloadButton';
import SubjectForm from '../SubjectForm';
import Subjects from '../Subjects';
import * as apiUtils from '../apiUtils';

const Part = (props) => {

  function handleAddSubject(subject) {
    props.onSetSubjects([...props.subjects, subject]);
  }

  function handleDelSubject(index){
    props.subjects.splice(index, 1);
    props.onSetSubjects([...props.subjects]);
  }

  function handleAddSubSubject(){
    props.onSetSubjects([...props.subjects]);
  }

  function handleAddSubModality(){
    props.onSetSubjects([...props.subjects]);
  }

  function handleDelSubSubject() {
    console.log('handleDelSubSubject')
    props.onSetSubjects([...props.subjects]);
  }

  function handleDelSubModality() {
    console.log('handleDelSubModality')
    props.onSetSubjects([...props.subjects]);
  }

  return (
    <div>

      <PostButton
        data={props.subjects}
        title={props.title}
        jsonName={props.jsonName}
      />

      <DownloadButton
        data={props.subjects}
        title={props.title}
        jsonName={props.jsonName}
      />

      <h1>{props.title}</h1>
      <table>
        <tbody>
          <tr>
            <th>Dont want</th>
            <th>Do want</th>
            <th>Who am i</th>
            <th>In 1, 2 5 years</th>
            <th>Add</th>
          </tr>
        </tbody>
        <SubjectForm onAddSubject={handleAddSubject} />
        <Subjects  subjects={props.subjects}
                   onAddSubSubject={handleAddSubSubject}
                   onAddSubModality={handleAddSubModality}
                   onDelSubSubject={handleDelSubSubject}
                   onDelSubModality={handleDelSubModality}
                   onDelSubject={handleDelSubject}

        />
      </table>
    </div>
  );
}

export default Part;
