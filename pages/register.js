// register.js
import React from 'react';
import { useMoralis } from 'react-moralis';

const RegisterPage = () => {
    const { authenticate } = useMoralis();

    const handleRegister = async () => {
        await authenticate();
        // Additional logic for user registration
    };

    return (
        <div>
            <h1>Registration Page</h1>
            <button onClick={handleRegister}>Register with MetaMask</button>
        </div>
    );
};

export default RegisterPage;
