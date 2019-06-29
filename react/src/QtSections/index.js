import React from 'react';
import { useQtSections } from '../hooks/qtSections';

const QtSections = (props) => {
  const [qtSections] = useQtSections([]);

  return (
    <div>
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
