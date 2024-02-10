import { useEffect } from 'react';
import { Modal, Box, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import Login from '../Authentication/Login';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()
    useEffect(()=> {
        if (isOpen && isAuthenticated) {
            onClose();
            navigate('/meals');
        }
    },[isAuthenticated])

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 380,
                width: 380,
                bgcolor: 'transparent', 
                boxShadow: 24,
                p: 2,
                outline: 'none', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ 
                        position: 'absolute', 
                        right: 1, 
                        top: 1,
                        '& .MuiSvgIcon-root': { fontSize: 35 } 
                    }}
                >
                    <Close />
                </IconButton>
                <Login />
            </Box>
        </Modal>
    );
};
