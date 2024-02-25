// WalletButton.js
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

const WalletButton = () => {
    const { authenticate, isAuthenticated, user, logout } = useMoralis();
    const [friendCount, setFriendCount] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isAuthenticated) {
                // Fetch friend count from the blockchain
                const fetchedFriendCount = await fetchFriendCountFromBlockchain(user.get('ethAddress'));
                setFriendCount(fetchedFriendCount);
            }
        };

        fetchUserData();
    }, [isAuthenticated]);

    const fetchFriendCountFromBlockchain = async (userAddress) => {
        try {
            // Placeholder logic: Fetch friend count from a smart contract using Moralis
            const contract = new Moralis.Cloud.run("getFriendCount", { userAddress });
            return parseInt(contract.result, 10);
        } catch (error) {
            console.error('Error fetching friend count:', error);
            return 0;
        }
    };

    const connectWallet = async () => {
        await authenticate();
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {user.attributes.username}!</p>
                    <p>Friend Count: {friendCount}</p>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletButton;
