import React from 'react';
import logo from './logo.svg';
import './App.css';
import { dijkstras }from './dijkstras/dijkstras'
import { aStar } from './a_star/aStar'
import  { Provider } from 'react-redux'
import { createStore }from 'redux'
import rootReducer from './reducers'
const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
