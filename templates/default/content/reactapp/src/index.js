import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './mysass.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import reportWebVitals from './reportWebVitals';
import Shop from './Shop';

export function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
}

ReactDOM.render(
  <div>
    <Shop />
  </div>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
