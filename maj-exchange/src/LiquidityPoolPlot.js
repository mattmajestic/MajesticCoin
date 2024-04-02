import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';

const LiquidityPoolPlot = () => {
  useEffect(() => {
    const maxLiquidity = 100; // Maximum liquidity value
    const xValues = Array.from({ length: maxLiquidity }, (_, i) => i + 1);
    const yValues = xValues.map(x => Math.random() * x); // Example liquidity values

    const trace = {
      x: [xValues[0]],
      y: [yValues[0]],
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      fillcolor: 'rgba(0, 100, 250, 0.5)',
      line: { color: 'transparent' }
    };

    const layout = {
      title: 'Liquidity Pool Growth',
      xaxis: { title: 'Time' },
      yaxis: { title: 'Liquidity' },
      showlegend: false,
    };

    Plotly.newPlot('liquidityChart', [trace], layout);

    // Animate the chart to fill up
    const intervalId = setInterval(() => {
      trace.x.push(xValues[trace.x.length]);
      trace.y.push(yValues[trace.y.length]);

      Plotly.update('liquidityChart', {
        x: [trace.x],
        y: [trace.y]
      }, {});

      if(trace.x.length === maxLiquidity) clearInterval(intervalId);
    }, 50); // Adjust the interval for faster or slower animation

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return <div id="liquidityChart"></div>;
};

export default LiquidityPoolPlot;
