import React, { Component } from 'react';
import './App.css';
import FormBuilder from './containers/FormBuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">freeform<span className="dot">.</span></h1>
        </header>
        <FormBuilder />
      </div>
    );
  }
}

export default App;
