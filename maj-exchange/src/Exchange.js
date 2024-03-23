import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const Exchange = () => {
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`);
  const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
  const exchangeContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const exchangeMyCoinToETH = async (amountToExchange) => {
    try {
      const exchangeContract = new ethers.Contract(exchangeContractAddress, contractABI, wallet);
      // Make sure 'exchangeToETH' is replaced by the actual function name you want to call
      const tx = await exchangeContract.exchangeToETH(amountToExchange);
      await tx.wait();
      setTransactionHash(tx.hash);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await exchangeMyCoinToETH(amount);
  };

  return (
    <div>
      <h2>Exchange Your Coin for ETH</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to exchange"
        />
        <button type="submit">Exchange</button>
      </form>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Exchange;
