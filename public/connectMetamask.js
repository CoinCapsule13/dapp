import { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectMetamask = () => {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectToMetamask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setIsConnected(true);
                saveWalletAddress(accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    };

    const saveWalletAddress = async (walletAddress) => {
        try {
            await axios.post('http://localhost:5000/api/save-wallet', { walletAddress });
        } catch (error) {
            console.error('Error saving wallet address:', error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts[0] || null);
                setIsConnected(accounts.length > 0);
            });
        }
    }, []);

    return (
        <div>
            <h1>MetaMask Connection</h1>
            {!isConnected ? (
                <button onClick={connectToMetamask}>Connect to MetaMask</button>
            ) : (
                <p>Connected account: {account}</p>
            )}
        </div>
    );
};

export default ConnectMetamask;

