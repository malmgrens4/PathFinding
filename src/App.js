import React from 'react';
import logo from './logo.svg';
import './App.css';
import { dijkstras }from './dijkstras/dijkstras'
import { aStar } from './a_star/aStar'
import { UnwGraph } from './UnweightedGraph/Unweighted'
import  { Provider } from 'react-redux'
import { createStore }from 'redux'
import rootReducer from './reducers'

function App() {
  return (
      <div className="App">
          <UnwGraph/>
          <button onClick={() => dijkstras('c', 'e')}>Run Dijkstras</button>
          <button onClick={() => aStar()}>Run A*</button>
      </div>
  );
}

export default App;
