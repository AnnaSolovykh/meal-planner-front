import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Typography, Container, Paper } from '@mui/material';
import { fetchRegister } from '../../utils/fetchData';

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [registerState, setRegisterState] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterState({ ...registerState, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRegister(registerState.name, registerState.email, registerState.password)
    .then (() => {
      navigate('/login');
    })
    .catch(error => {
      const messages = error.response?.data?.msg.split(',').map((msg: string) => msg.trim() + '.');
      setErrorMessage(messages || ['Registration failed. Please try again.']);
    })
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ width: '100vw', height: '100vh' }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ my: 1, mx: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={registerState.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={registerState.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={registerState.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {errorMessage && (
            <Typography variant="body2" style={{ color: 'darkred', marginBottom: '10px' }}>
              {errorMessage}
            </Typography>
            )}
            <Typography variant="body2" color="textSecondary" align="center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Sign in{' '}
              </Link>
              if you already have an account
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
