import React from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => (
  <div className="App">
    <h1>Tic-Tac-Toe</h1>
    <Board />
  </div>
);

export default App;
