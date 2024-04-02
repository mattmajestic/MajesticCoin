
import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';
import './Exchange.css'; // Import the CSS file for styling

const Exchange = () => {
    const [ethAmount, setEthAmount] = useState(1);
    const [majAmount, setMajAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const tokenContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const [showLegalModal, setShowLegalModal] = useState(false);

    

    const provider = useMemo(() => new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`), []);
    const tokenContract = useMemo(() => new ethers.Contract(tokenContractAddress, contractABI, provider), [provider, tokenContractAddress]);

    useEffect(() => {
        const getConversionRate = async () => {
            const unitsOneEthCanBuy = await tokenContract.unitsOneEthCanBuy();
            const majEquivalent = Number(ethAmount) * Number(unitsOneEthCanBuy.toString());
            setMajAmount(majEquivalent.toString());
        };

        getConversionRate();

        const script = document.createElement('script');
        script.src = 'https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [ethAmount, tokenContract]);

    const handleTrade = async (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirmTrade = async () => {
        // Instead of alert, show the legal modal
        setShowModal(false); // Close the trade confirmation modal
        setShowLegalModal(true); // Show the legal modal
    };    

    const handleCancelTrade = () => {
        setShowModal(false);
    };

    return (
        <div className="exchange-container">
            <h2>MajesticCoin Exchange</h2>
            <coingecko-coin-price-chart-widget coin-id="ethereum" currency="usd" height="300" locale="en" background-color="#f9f0f0"></coingecko-coin-price-chart-widget>
            <form onSubmit={handleTrade} className="eth-label">
                <label>
                    ETH Amount:
                    <input
                        className="eth-input"
                        type="number"
                        value={ethAmount}
                        onChange={(e) => setEthAmount(parseFloat(e.target.value))}
                        placeholder="ETH amount"
                    />
                </label>
                <div className="exchange-wrapper">
                    <div className="coin-icon">&#x1F4B5;</div>
                    <p className="conversion-text">Equivalent MAJ</p>
                    <div className="coin-icon">&#x1F4B0;</div>
                </div>
                <p className="maj-amount">{majAmount} MAJ</p>
                <button type="submit">Submit Trade</button>
            </form>
            <a href="https://github.com/mattmajestic/MajesticCoin" target="_blank" rel="noopener noreferrer">
                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="github-logo" />
            </a>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancelTrade}>&times;</span>
                        <p className="trade-amount">Trade Amount: {ethAmount} ETH</p>
                        <button className="modal-button" onClick={handleConfirmTrade}>Confirm Trade</button>
                        <button className="modal-button cancel" onClick={handleCancelTrade}>Cancel</button>
                    </div>
                </div>
            )}
            {showLegalModal && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={() => setShowLegalModal(false)}>&times;</span>
            <p>Currently looking at the legal implications of enabling trading. Check back soon...</p>
            <button className="modal-button" onClick={() => setShowLegalModal(false)}>Ok</button>
        </div>
    </div>
)}
        </div>
    );
};

export default Exchange;
