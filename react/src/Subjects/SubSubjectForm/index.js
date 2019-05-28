import React, { useState } from 'react';

import styles from './subSubjectForm.module.css';


const SubSubject = (props) => {

  const [subSubjectHeader, setSubSubjectHeader] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setSubSubjectHeader(value);
  }

  return (
      <div>
        <input className={styles['form-input']}
               onChange={handleChange}
               value={subSubjectHeader}
        >
        </input>
        <button onClick={()=>{
          const subSubject = {header: subSubjectHeader};
          props.onAddSubSubject(subSubject);
          setSubSubjectHeader('');
        }}>+</button>
      </div>
  );
}

export default SubSubject;
