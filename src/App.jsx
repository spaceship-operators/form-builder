import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import FormBuilder from './containers/FormBuilder';
import reducer from './reducers/reducer';
import './App.css';

const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

function App() {
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

export default App;
