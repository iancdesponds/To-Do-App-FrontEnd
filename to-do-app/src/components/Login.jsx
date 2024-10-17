import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { Button, TextField, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    if (token) {
      localStorage.setItem('jwt_token', token);
      navigate('/');
    } else {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto', mt: 4 }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Usuário"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Mensagem de erro acima dos botões */}
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }}>
          Login
        </Button>
        <Button
            onClick={() => navigate('/cadastro')}
            variant="text"
            sx={{
                color: 'black',
                '&:hover': {
                color: 'white',
                },
            }}
        >
          Criar uma nova conta
        </Button>
      </Box>
    </motion.div>
  );
}

export default Login;
