import React, { Component } from 'react';
import { Provider } from 'react-redux';
import FormBuilder from './containers/FormBuilder';
import reducer from './reducers/reducer.js';
import { createStore } from 'redux';
import './App.css';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">freeform<span className="dot">.</span></h1>
          </header>
          <FormBuilder />
        </div>
      </Provider>
    );
  }
}

export default App;
