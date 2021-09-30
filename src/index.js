import React from 'react';
import './index.css';

import mirador from 'mirador/dist/es/src/index';
//import annotationPlugins from './mirador-annotations/index';
//import SherlockAdapter from "./SherlockAdapter";

const config = {
  id: 'root',
  /*annotation: {
    adapter: (canvasId) => new SherlockAdapter(canvasId, "http://localhost:3030/sherlock-concept/sparql", "http://localhost:5555"),
    exportLocalStorageAnnotations: true, // display annotation JSON export button,
  },*/
  windows: [{
    imageToolsEnabled: true,
    imageToolsOpen: true,
    manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
  }],
  window: {
    //defaultSideBarPanel: 'annotations',
    sideBarOpenByDefault: true
  },
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
};

mirador.viewer(config, [
  //annotationPlugins
]);