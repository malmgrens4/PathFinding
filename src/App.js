import React from 'react';
import logo from './logo.svg';
import './App.css';
import { dijkstras }from './dijkstras/dijkstras'
import { aStar } from './a_star/aStar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>

        <div>a</div>
        <button onClick={() => dijkstras('c', 'e')}>Run Dijkstras</button>
        <button onClick={() => aStar()}>Run A*</button>
      </header>
    </div>
  );
}

export default App;
