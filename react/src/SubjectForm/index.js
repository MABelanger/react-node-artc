import React, { useState } from 'react';

import style from './form.module.css';

const Subject = (props) => {
  const [doWantHeader, setDoWantHeader] = useState('');
  const [dontWantHeader, setDontWantHeader] = useState('');
  const [whoAmIHeader, setWhoAmIHeader] = useState('');
  const [futurPasteHeader, setFuturPasteHeader] = useState('');

  function handleChangeDoWant(e) {
    const value = e.target.value;
    setDoWantHeader(value);
  }

  function handleChangeDontWant(e) {
    const value = e.target.value;
    setDontWantHeader(value);
  }

  function handleChangeWhoAmI(e) {
    const value = e.target.value;
    setWhoAmIHeader(value);
  }

  function handleChangeFuturPaste(e) {
    const value = e.target.value;
    setFuturPasteHeader(value);
  }

  function clearForm() {
    setDoWantHeader('');
    setDontWantHeader('');
    setWhoAmIHeader('');
    setFuturPasteHeader('');
  }

    return (
        <tbody>
          <tr>
            <th className={style['form-th']}>
              <input className={style['form-input']}
                     onChange={handleChangeDontWant}
                     value={dontWantHeader}
              >
              </input>
            </th>
            <th className={style['form-th']}>
              <input className={style['form-input']}
                     onChange={handleChangeDoWant}
                     value={doWantHeader}
              >
              </input>
            </th>
            <th className={style['form-th']}>
              <input className={style['form-input']}
                     onChange={handleChangeWhoAmI}
                     value={whoAmIHeader}
              >
              </input>
            </th>
            <th className={style['form-th']}>
              <input className={style['form-input']}
                     onChange={handleChangeFuturPaste}
                     value={futurPasteHeader}
              >
              </input>
            </th>
            <th className={style['form-th']}>
              <button onClick={()=>{
                const subject = {
                  doWant: {header: doWantHeader},
                  dontWant: {header: dontWantHeader},
                  whoAmI: {header: whoAmIHeader},
                  futurPaste: {header: futurPasteHeader}
                };
                props.onAddSubject(subject);
                clearForm();
              }}>Add</button>
            </th>
          </tr>
        </tbody>
    );

}

export default Subject;
