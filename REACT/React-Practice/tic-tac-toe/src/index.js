// this file is the bridge between the component you created in the App.js file and the web browser.
import React from 'react';
import ReactDOM from 'react-dom/client'; //React’s library to talk to web browsers (React DOM)
import './index.css'; //Main styling file
import App from './App'; //Main component file


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( //App component comes under the root element under which we have our own component
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
