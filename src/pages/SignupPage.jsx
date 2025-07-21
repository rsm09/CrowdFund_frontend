import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const baseurl=import.meta.env.VITE_BASE_URL
    

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseurl}/api/auth/register`, {
                name,
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            alert('Signup successful!');
            navigate('/');
        } catch (error) {
            alert(error.response.data.message || 'Signup failed');
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
