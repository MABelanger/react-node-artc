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
        <SubSubjectForm onAddSubSubject={ (subSubject) => { handleAddSubSubject(subject, subSubject)} } />
        <ul>
        {
          subSubjects && subSubjects.slice(0).reverse().map((subSubject, indexMap) => {
            let index = subSubjects.length - indexMap - 1;
            const subSubjectHeader = subSubject.header;
            const subModalities = subSubject.subModalities;
            return (
              <li key={index}>
                {subSubjectHeader}
                <button onClick={()=>{ handleDelSubSubject(subSubjects, index)} }>X</button>
                <SubmodalityForm onAddSubModality={ (subModality) => { handleAddSubModality(subSubject, subModality)} } />
                <ul>
                  {
                    subModalities && subModalities.slice(0).reverse().map((subModality, indexMap)=>{
                      let index = subModalities.length - indexMap - 1;
                      return (
                        <li key={index}>
                          {subModality}
                          <button onClick={()=>{ handleDelSubModality(subModalities, index)} }>X</button>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          })
        }
        </ul>
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
  return subjects.slice(0).reverse().map((subject, indexMap) => {
    let index = subjects.length - indexMap - 1;
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
