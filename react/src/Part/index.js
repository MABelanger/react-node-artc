import React, { useState } from 'react';
import SubjectForm from '../SubjectForm';
import Subjects from '../Subjects';

const Part = (props) => {
  function handleAddSubject(subject) {
    props.onChangeSubject([...props.subjects, subject]);
  }

  function handleDelSubject(index){
    props.subjects.splice(index, 1);
    props.onChangeSubject([...props.subjects]);
  }

  function handleAddSubSubject(){
    props.onChangeSubject([...props.subjects]);
  }

  function handleAddSubModality(){
    props.onChangeSubject([...props.subjects]);
  }

  function handleDelSubSubject() {
    console.log('handleDelSubSubject')
    props.onChangeSubject([...props.subjects]);
  }

  function handleDelSubModality() {
    console.log('handleDelSubModality')
    props.onChangeSubject([...props.subjects]);
  }

  return (
    <div>
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
