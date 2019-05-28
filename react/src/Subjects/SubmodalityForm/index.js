import React, { useState } from 'react';

import styles from './subModalityForm.module.css';


const SubModalityForm = (props) => {

  const [subModality, setSubModality] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setSubModality(value);
  }

  return (
      <div>
        <input className={styles['form-input']}
               onChange={handleChange}
               value={subModality}
        >
        </input>
        <button onClick={()=>{
          props.onAddSubModality(subModality);
          setSubModality('');
        }}>+</button>
      </div>
  );
}

export default SubModalityForm;
