import React, { useState } from 'react';
import PostButton from '../PostButton';
import DownloadButton from '../DownloadButton';
import NoteForm from './NoteForm';

import style from './note.module.css';

const Note = (props) => {
  return (
    <tr>
      <td className={style['td-width']}>
        { props.note.header }
      </td>
      <td>
        <button onClick={()=>{props.onDelNote(props.index)}}>X</button>
      </td>
    </tr>
  )
}

const Notes = ({ notes, onDelNote }) => {
  return notes.slice(0).reverse().map((note, indexMap) => {
    let index = notes.length - indexMap - 1;
    return (
      <tbody>
        <Note key={index}
              index={index}
              note={note}
              onDelNote={onDelNote}
        />
      </tbody>
    )
  })
}

const BodyNotes = (props) => {
  return (
    <div>
    <PostButton
      onPost={props.onPost}
    />
    <DownloadButton
      onDownload={props.onDownload}
    />
    <h1>{props.title}</h1>
    <table>
      <NoteForm onAddNote={(note)=>{
        props.onSetNotes([...props.notes, note])
      }} />
      <Notes notes={props.notes}
             onDelNote={(index)=>{
               props.notes.splice(index, 1);
               props.onSetNotes([...props.notes])
             }}
      />
    </table>
    </div>
  )
}
export default BodyNotes;
