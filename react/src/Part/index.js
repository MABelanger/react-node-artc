import React, { useState, useEffect } from 'react';
import PostButton from './PostButton';
import DownloadButton from './DownloadButton';
import SubjectForm from '../SubjectForm';
import Subjects from '../Subjects';
import * as apiUtils from '../apiUtils';

const Part = (props) => {

  // const [subjects, props.onSetSubjects] = useState([]);

  // useEffect(() => {
  //   props.onSetSubjects(props.initSubjects)
  // }, [props.initSubjects]);

  function handleAddSubject(subject) {
    props.onSetSubjects([...props.initSubjects, subject]);
  }

  function handleDelSubject(index){
    props.initSubjects.splice(index, 1);
    props.onSetSubjects([...props.initSubjects]);
  }

  function handleAddSubSubject(){
    props.onSetSubjects([...props.initSubjects]);
  }

  function handleAddSubModality(){
    props.onSetSubjects([...props.initSubjects]);
  }

  function handleDelSubSubject() {
    console.log('handleDelSubSubject')
    props.onSetSubjects([...props.initSubjects]);
  }

  function handleDelSubModality() {
    console.log('handleDelSubModality')
    props.onSetSubjects([...props.initSubjects]);
  }

  return (
    <div>

      <PostButton
        data={props.initSubjects}
        title={props.title}
        jsonName={props.jsonName}
      />

      <DownloadButton
        data={props.initSubjects}
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
        <Subjects  subjects={props.initSubjects}
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
