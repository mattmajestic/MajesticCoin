import React, { useState, useEffect } from 'react';

const MetaMaskButton = () => {
  const [userAddress, setUserAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    setIsMetaMaskInstalled(typeof window.ethereum !== 'undefined');
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <div>
      {isMetaMaskInstalled ? (
        <img
          src="/mm_checkout.png" // Update the path if needed
          alt="MetaMask Checkout"
          style={{
            width: '150px',
            height: '50px',
            borderRadius: '10px',
            border: '2px solid #f6851b',
            cursor: 'pointer',
          }}
          onClick={connectWalletHandler}
        />
      ) : (
        <p>Please install MetaMask.</p>
      )}
      {userAddress && <p>Connected Account: {userAddress}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default MetaMaskButton;
