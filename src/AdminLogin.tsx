import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5001/api/auth/login',
                {
                    username,
                    password,
                }
            );
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-8 shadow-md rounded-lg'>
                <h1 className='text-2xl font-bold mb-4'>Admin Login</h1>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='mb-4 p-2 border rounded w-full'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mb-4 p-2 border rounded w-full'
                />
                <button
                    onClick={handleLogin}
                    className='bg-blue-500 text-white p-2 rounded w-full'
                >
                    Login
                </button>
            </div>
        </div>
    );
}
