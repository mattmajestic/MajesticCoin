// LiquidityPool.js
import React, { useState } from 'react';
import './Exchange.css';
import LiquidityPoolPlot from './LiquidityPoolPlot'; // Make sure the path is correct

const LiquidityPool = () => {
  const [ethContribution, setEthContribution] = useState(0);

  return (
    <div className="exchange-container">
      <h2>MAJ Token Liquidity Pool Simulation</h2>
      
      {/* ETH Contribution Slider */}
      <div>
        <label htmlFor="ethContribution">ETH Contribution:</label>
        <input
          id="ethContribution"
          type="range"
          min="0"
          max="100"
          value={ethContribution}
          onChange={(e) => setEthContribution(Number(e.target.value))}
        />
        <span> {ethContribution} ETH</span>
      </div>
      
      <p>
        For contributing <strong>{ethContribution} ETH</strong>, you will receive <strong>{ethContribution * 10} MAJ</strong> tokens.
      </p>

      {/* Include the LiquidityPoolPlot component */}
      <LiquidityPoolPlot/>
    </div>
  );
};

export default LiquidityPool;
