import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Container, Paper, Typography } from '@mui/material';
import { fetchLogin } from '../../utils/fetchData';
import { useAuth } from '../AuthProvider';

type LoginState = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const navigate  = useNavigate();

  const { login } = useAuth();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchLogin(loginState.email,  loginState.password)
      .then (response => {
        const jwtToken = response.data.token;
        const username = response.data.user.name;
        login(jwtToken, username);
        navigate('/');
      })
      .catch(error => {
        const messages = error.response?.data?.msg.split(',').map((msg: string) => msg.trim() + '.');
        setErrorMessage(messages || ['Sign in failed. Please try again.']);
      })
  };

  return (
    <Container component="main" maxWidth="xs">
    <Paper elevation={6} sx={{ my: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={loginState.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={loginState.password}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
          Login
        </Button>
          {errorMessage && (
            <Typography variant="body2" style={{ color: 'darkred', marginBottom: '10px' }}>
              {errorMessage}
            </Typography>
          )}
        <Typography variant="body2" color="textSecondary" align="center">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register{' '}
          </Link>
          if you don't have an account
        </Typography>
      </Box>
    </Paper>
  </Container>
  );
};

export default Login;
