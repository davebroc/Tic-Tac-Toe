import React from 'react';
import './App.css';
import Game from './components/Game';

const App: React.FC = () => (
  <div className="App">
    <h1>Tic-Tac-Toe</h1>
    <Game />
  </div>
);

export default App;
