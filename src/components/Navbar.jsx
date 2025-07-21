import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    
    return (
        <nav className="navbar">
             <div className="navbar-content">
            <div className="logo">
                <Link to="/">KindleFund</Link>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create-campaign">Create Campaign</Link></li>

                {user && (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        {user.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
                        <li><button onClick={handleLogout} className="nav-btn">Logout</button></li>
                    </>
                )}

                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;
