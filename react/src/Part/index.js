import React, { useState, useEffect } from 'react';
import PostButton from './PostButton';
import DownloadButton from './DownloadButton';
import SubjectForm from '../SubjectForm';
import Subjects from '../Subjects';
import * as apiUtils from '../apiUtils';

const Part = (props) => {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(props.initSubjects)
  }, [props.initSubjects]);

  function handleAddSubject(subject) {
    setSubjects([...subjects, subject]);
  }

  function handleDelSubject(index){
    subjects.splice(index, 1);
    setSubjects([...subjects]);
  }

  function handleAddSubSubject(){
    setSubjects([...subjects]);
  }

  function handleAddSubModality(){
    setSubjects([...subjects]);
  }

  function handleDelSubSubject() {
    console.log('handleDelSubSubject')
    setSubjects([...subjects]);
  }

  function handleDelSubModality() {
    console.log('handleDelSubModality')
    setSubjects([...subjects]);
  }

  return (
    <div>

      <PostButton
        data={subjects}
        title={props.title}
        jsonName={props.jsonName}
      />

      <DownloadButton
        data={subjects}
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
        <Subjects  subjects={subjects}
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
