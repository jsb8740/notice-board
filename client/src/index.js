import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { applyMiddleware, createStore } from 'redux';
import {Provider} from 'react-redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

const createStoreWidthMidlleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render( //provider 하위 컴포넌트들이 store로 접근할수 있도록 함
  <Provider store={createStoreWidthMidlleware(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
