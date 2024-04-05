import React, { useState } from 'react';
import { ChakraProvider, Box, IconButton, useColorMode, ColorModeScript, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Exchange from './Exchange';
import LiquidityPool from './LiquidityPool';
import theme from './theme';
// import './App.css';

function App() {
  // State to manage which component is visible
  const [showComponent, setShowComponent] = useState('exchange');
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box textAlign="center" fontSize="xl">
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          isRound='true'
          size='lg'
          alignSelf='flex-end'
          onClick={toggleColorMode}
        />
        <div className="App">
          <header className="App-header">
            {/* Buttons to toggle between components */}
            <div className="toggle-buttons">
              <Button onClick={() => setShowComponent('exchange')}>Show Exchange</Button>
              <Button onClick={() => setShowComponent('liquidity')}>Show Liquidity Pool</Button>
            </div>

            {/* Conditionally render components based on state */}
            {showComponent === 'exchange' && <Exchange />}
            {showComponent === 'liquidity' && <LiquidityPool />}
          </header>
        </div>
      </Box>
    </ChakraProvider>
  );
}

export default App;