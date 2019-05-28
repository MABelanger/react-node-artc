import React, { useState } from 'react';

const QtSections = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
      {
        props.qtSections.map((qtSection, index)=>{
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
