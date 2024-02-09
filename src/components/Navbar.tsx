import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };
    return (
        <nav style={{ padding: '20px 30px', background: theme.palette.primary.main, color: 'white', fontSize: '17px',fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',  }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                    SEARCH FOR MEALS
                </Link>
                {isAuthenticated && 
                    <Link  style={{ textDecoration: 'none', color: 'inherit',letterSpacing: '3px' }} to="/meals">
                        MEALS OPTIONS
                    </Link>}
                {!isAuthenticated ? (
                    <Link  style={{ textDecoration: 'none', color: 'inherit', letterSpacing: '3px' }} to="/login">
                        LOGIN
                    </Link>
                ) : (
                    <a onClick={handleLogout} style={{ cursor: 'pointer', letterSpacing: '3px' }}>
                        LOGOUT
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
