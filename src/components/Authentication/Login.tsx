import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, Paper, Typography } from '@mui/material';
import { login } from '../../utils/fetchData';

type LoginState = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
  });

  const navigate  = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(loginState.email,  loginState.password)
    .then (response => {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('user', response.data.user.name);
      console.log('success')
      navigate('/');
    })
    .catch(error => {
      console.log(error)
    })
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{ width: '100vw', height: '100vh', backgroundColor: '#f5f5f5' }} // Optional: Add a background color
    >
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
              value={loginState.password}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
