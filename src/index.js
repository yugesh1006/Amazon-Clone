import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Stateprovider } from './components/stateprovider/Stateprovider';
import "./css/index.css"
import reportWebVitals from './reportWebVitals';
import reducer,{intialState} from "./components/stateprovider/Reducer";


ReactDOM.render(
  <React.StrictMode>
  <Stateprovider intialState={intialState} reducer={reducer}>
    <App />
  </Stateprovider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
