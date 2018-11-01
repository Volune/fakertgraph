import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const document = window.document;
const appNode = document.createElement('div');
appNode.id = 'app';
document.body.appendChild(appNode);

ReactDOM.render(<App />, appNode);
