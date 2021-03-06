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
      <tbody key={index}>
        <Note index={index}
              note={note}
              onDelNote={onDelNote}
        />
      </tbody>
    )
  })
}



const BodyNotes = (props) => {

  function handleAddNote(note) {
    props.onSetNotes([...props.notes, note])
  }

  function handleDelNote(index) {
    props.notes.splice(index, 1);
    props.onSetNotes([...props.notes])
  }

  return (
    <>
      <PostButton
        onPost={props.onPost}
      />
      <DownloadButton
        onDownload={props.onDownload}
      />
      <h1>{props.title}</h1>
      <table>
        <NoteForm onAddNote={handleAddNote}/>
        <Notes notes={props.notes}
               onDelNote={handleDelNote}
        />
      </table>
    </>
  )
}
export default BodyNotes;
