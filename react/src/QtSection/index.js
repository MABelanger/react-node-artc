import React, { useState, useEffect } from 'react';
import * as apiUtils from '../apiUtils';

const QtSections = (props) => {
  const [qtSections, setQtSections] = useState([]);

  useEffect(() => {
    apiUtils.promiseFetch('/qtSections.json').then((qtSections) => {
      const initQtSections = (qtSections.length > 0 ) ? qtSections : [];
      if(!qtSections.error) {
        setQtSections(initQtSections)
      } else {
        setQtSections([])
      }
    });

  }, []);

  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
      {
        qtSections.map((qtSection, index)=>{
          return (
            <li key={index}>
              {qtSection}
            </li>
          )
        })
      }
      </ul>
    </div>
  );
}

export default QtSections;
