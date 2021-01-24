import React, { useState, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container } from './styles';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await api.post('users', {
        name,
        email,
        password,
      });
    },
    [name, password, email],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Faça seu cadastro</h2>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={event => setName(event.target.value)}
        />
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
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/">Já possuo uma conta</Link>
    </Container>
  );
};

export default SignUp;
