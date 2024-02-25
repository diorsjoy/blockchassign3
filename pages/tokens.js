// tokens.js
import React from 'react';
import { useMoralis } from 'react-moralis';
const TokensPage = () => {
    const { isAuthenticated, user, Moralis } = useMoralis();

    const fetchUserTokens = async () => {
        try {
            // Fetch user's ERC-20 and ERC-721 tokens using Moralis SDK
            const erc20Tokens = await Moralis.Web3API.account.getTokens({ chain: 'eth' });
            const erc721Tokens = await Moralis.Web3API.account.getNFTs();

            // Display user's ERC-20 and ERC-721 tokens
            console.log("User's Posts:", erc20Tokens);
            console.log("User's NFTS:", erc721Tokens);
        } catch (error) {
            console.error("Error fetching user tokens:", error);
        }
    };

    return (
        <div>
            <h1>Tokens Page</h1>
            {isAuthenticated ? (
                <div>
                    {/* Display user's ERC-20 and ERC-721 tokens */}
                    {user && <button onClick={fetchUserTokens}>Fetch Tokens</button>}
                </div>
            ) : null}
        </div>
    );
};
export default TokensPage;
