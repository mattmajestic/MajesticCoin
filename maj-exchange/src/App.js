import React, { useState } from 'react';
import './App.css';
import Exchange from './Exchange';
import LiquidityPool from './LiquidityPool'; // Import the LiquidityPool component

function App() {
  // State to manage which component is visible
  const [showComponent, setShowComponent] = useState('exchange');

  return (
    <div className="App">
      <header className="App-header">
        {/* Buttons to toggle between components */}
        <div className="toggle-buttons">
          <button onClick={() => setShowComponent('exchange')}>Show Exchange</button>
          <button onClick={() => setShowComponent('liquidity')}>Show Liquidity Pool</button>
        </div>

        {/* Conditionally render components based on state */}
        {showComponent === 'exchange' && <Exchange />}
        {showComponent === 'liquidity' && <LiquidityPool />}
      </header>
    </div>
  );
}

export default App;
