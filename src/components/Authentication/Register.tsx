import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, Container, Paper } from '@mui/material';
import { register } from '../../utils/fetchData';

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

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterState({ ...registerState, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(registerState)
    register(registerState.name, registerState.email, registerState.password)
    .then (() => {
      navigate('/login');
    })
    .catch(error => {
      console.log(error)
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
              autoComplete="current-password"
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
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
