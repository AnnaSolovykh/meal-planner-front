import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };
    return (
        <nav style={{ padding: '20px 30px', background: '#f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                    Search for Meals
                </Link>
                {isAuthenticated && 
                    <Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/meals">
                        Meals Options
                    </Link>}
                {!isAuthenticated ? (
                    <Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/login">
                        Login
                    </Link>
                ) : (
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        Logout
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
