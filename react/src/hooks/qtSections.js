import React, { useState, useEffect } from 'react';

import * as apiUtils from './apiUtils';

export const useQtSections = (dependencies) => {

  const [qtSections, setQtSections] = useState([]);

  function fetchQtSections() {
    apiUtils.promiseFetch('/qtSections.json').then((qtSections) => {
      const initQtSections = (qtSections.length > 0 ) ? qtSections : [];
      if(!qtSections.error) {
        setQtSections(initQtSections)
      } else {
        setQtSections([])
      }
    });
  }

  useEffect(() => {
    fetchQtSections()
  }, dependencies);

  return [qtSections];

}
