import React, { useState, useEffect } from 'react';
import * as apiUtils from './apiUtils';

import { useStatusPost } from './statusPost';


import {
  PART_UP_JSON_NAME,
  PART_DOWN_JSON_NAME,
  PART_TMP_JSON_NAME,
  NOTE_JSON_NAME
} from '../constants';

export const useHttp = (dependencies ) => {

  const [partUpSubjects, setPartUpSubjects] = useState([]);
  const [partDownSubjects, setPartDownSubjects] = useState([]);
  const [partTmpSubjects, setPartTmpSubjects] = useState([]);
  const [notes, setNotes] = useState([]);

  const [isSuccessPost, isErrorPost, notifySuccessPost, notifyErrorPost] = useStatusPost([]);

  function handlePost(jsonName, partSubjects){
    apiUtils.handlePost(jsonName, partSubjects)
      .then((response) => {
        notifySuccessPost();
      }) // JSON-string from `response.json()` call
      .catch((error) => {
        notifyErrorPost();
      });
  }

  function handleDownload(jsonName, partSubjects) {
    apiUtils.handleDownload(jsonName, partSubjects);
  }

  function fetchAll() {
    apiUtils.promiseFetch(PART_UP_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartUpSubjects(initSubjects);
      } else {
        setPartUpSubjects([]);
      }
    });
    apiUtils.promiseFetch(PART_DOWN_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartDownSubjects(initSubjects);
      } else {
        setPartDownSubjects([]);
      }
    });
    apiUtils.promiseFetch(PART_TMP_JSON_NAME).then((subjects) => {
      const initSubjects = (subjects) ? subjects : [];
      if(!subjects.error) {
        setPartTmpSubjects(initSubjects);
      } else {
        setPartTmpSubjects([]);
      }
    });
    apiUtils.promiseFetch(NOTE_JSON_NAME).then((notes) => {
      const initNotes = (notes) ? notes : [];
      if(!notes.error) {
        setNotes(initNotes);
      } else {
        setNotes([]);
      }
    });

  }

  useEffect(() => {
    fetchAll()
  }, dependencies);


  return [
    partUpSubjects,
    partDownSubjects,
    partTmpSubjects,
    notes,

    setPartUpSubjects,
    setPartDownSubjects,
    setPartTmpSubjects,
    setNotes,
    handlePost,
    handleDownload
  ]
}
