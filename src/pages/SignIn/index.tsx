import React, { useState, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await signIn({ email, password });
    },
    [password, signIn, email],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Faça seu login</h2>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/signup">Me cadastrar</Link>
    </Container>
  );
};

export default SignIn;
