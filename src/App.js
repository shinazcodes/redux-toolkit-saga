import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { SagaCounter } from './features/counter/SagaCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>
            REDUX TOOLKIT USING:
          </h1>
        </div>
        <div>
          <h1>
            thunk middleware
          </h1>
        </div>
        <Counter />
        <div>
          <h1>
            saga middleware
          </h1>
        </div>
        <SagaCounter />
      </header>
    </div>
  );
}

export default App;
