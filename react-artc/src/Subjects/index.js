import React, { useState } from 'react';

import SubSubjectForm from './SubSubjectForm';
import SubmodalityForm from './SubmodalityForm';

import style from './subject.module.css';

function Subject({ subject, onAddSubSubject, onAddSubModality, onDelSubSubject, onDelSubModality, onDelSubject, indexSubject }) {

  function handleAddSubSubject(subject, subSubject) {
    if(!subject.subSubjects) {
      subject.subSubjects=[];
    }
    subject.subSubjects = [...subject.subSubjects, subSubject ];
    onAddSubSubject(subject);
  }

  function handleAddSubModality(subSubject, subModality) {
    if(!subSubject.subModalities) {
      subSubject.subModalities=[];
    }
    subSubject.subModalities = [...subSubject.subModalities, subModality ];
    onAddSubModality(subSubject);
  }

  function handleDelSubSubject(subSubjects, index) {
    subSubjects.splice(index, 1);
    onDelSubSubject();
  }

  function handleDelSubModality(submodalities, index) {
    submodalities.splice(index, 1);
    onDelSubModality();
  }

  function renderHeader(subject){
    const subjectHeader = subject.header;
    const subSubjects = subject.subSubjects;
    return (
      <div>
        {subjectHeader}
        <ul>
        {
          subSubjects && subSubjects.map((subSubject, index) => {
            const subSubjectHeader = subSubject.header;
            const subModalities = subSubject.subModalities;
            return (
              <li key={index}>
                {subSubjectHeader}
                <button onClick={()=>{ handleDelSubSubject(subSubjects, index)} }>X</button>
                <ul>
                  {
                    subModalities && subModalities.map((subModality, index)=>{
                      return (
                        <li key={index}>
                          {subModality}
                          <button onClick={()=>{ handleDelSubModality(subModalities, index)} }>X</button>
                        </li>
                      )
                    })
                  }
                </ul>
                <SubmodalityForm onAddSubModality={ (subModality) => { handleAddSubModality(subSubject, subModality)} } />
              </li>
            )
          })
        }
        </ul>
        <SubSubjectForm onAddSubSubject={ (subSubject) => { handleAddSubSubject(subject, subSubject)} } />
      </div>
    );
  }


  return(
      <tr>
        <td className={style['td-width']}>
          { renderHeader(subject.doWant) }
        </td>
        <td className={style['td-width']}>
          { renderHeader(subject.dontWant) }
        </td>
        <td className={style['td-width']}>
          { renderHeader(subject.whoAmI) }
        </td>
        <td className={style['td-width']}>
          { renderHeader(subject.futurPaste) }
        </td>
        <td>
          <button onClick={()=>{onDelSubject(indexSubject)}}>X</button>
        </td>
      </tr>
  );
}

function Subjects({ subjects, onAddSubSubject, onAddSubModality, onDelSubSubject, onDelSubModality, onDelSubject }) {
  return subjects.map((subject, index) => {
    return (
      <Subject key={index}
               subject={subject}
               onAddSubSubject={onAddSubSubject}
               onAddSubModality={onAddSubModality}
               onDelSubSubject={onDelSubSubject}
               onDelSubModality={onDelSubModality}
               onDelSubject={onDelSubject}
               indexSubject={index}
      />
    )
  })
}

const BodySubjects = (props) => {
  return (
    <tbody>
      <Subjects subjects={props.subjects}
                onAddSubSubject={props.onAddSubSubject}
                onAddSubModality={props.onAddSubModality}
                onDelSubSubject={props.onDelSubSubject}
                onDelSubModality={props.onDelSubModality}
                onDelSubject={props.onDelSubject}
      />
    </tbody>
  )
}

export default BodySubjects;
