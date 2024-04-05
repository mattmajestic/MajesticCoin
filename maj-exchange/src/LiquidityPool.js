// LiquidityPool.js
import React, { useState } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Heading } from "@chakra-ui/react";
import LiquidityPoolPlot from './LiquidityPoolPlot'; // Make sure the path is correct
import './App.css';

const LiquidityPool = () => {
  const [ethContribution, setEthContribution] = useState(0);

  return (
    <Box p={5}>
      <Heading mb={5}>MAJ Token Liquidity Pool Simulation</Heading>
      
      {/* ETH Contribution Slider */}
      <Box>
        <Text mb={2}>ETH Contribution:</Text>
        <Slider
          id="ethContribution"
          min={0}
          max={100}
          value={ethContribution}
          onChange={(value) => setEthContribution(value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" />
          </SliderThumb>
        </Slider>
        <Text mt={2}>{ethContribution} ETH</Text>
      </Box>
      
      <Text mt={5}>
        For contributing <strong>{ethContribution} ETH</strong>, you will receive <strong>{ethContribution * 10} MAJ</strong> tokens.
      </Text>

      {/* Include the LiquidityPoolPlot component */}
      <LiquidityPoolPlot/>
    </Box>
  );
};

export default LiquidityPool;