import React, { useState } from 'react';

import style from './form.module.css';

const NoteForm = (props) => {
  const [note, setNote] = useState('');

  function handleChangeNote(e) {
    const value = e.target.value;
    setNote(value);
  }

  function clearForm() {
    setNote('');
  }

    return (
        <tbody>
          <tr>
            <th className={style['form-th']}>
              <input className={style['form-input']}
                     onChange={handleChangeNote}
                     value={note}
              >
              </input>
            </th>
            <th className={style['form-th']}>
              <button onClick={()=>{
                props.onAddNote({header: note});
                clearForm();
              }}>Add</button>
            </th>
          </tr>
        </tbody>
    );

}

export default NoteForm;
