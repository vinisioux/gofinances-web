import React, { useState, FormEvent, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container } from './styles';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await api
        .post('users', {
          name,
          email,
          password,
        })
        .then(() => {
          history.push('/');
        })
        .catch(error => {
          if (error.response.data.message === 'e-mail address already used') {
            return toast.error('E-mail já cadastrado.');
          }
          return toast.error(
            'Ocorreu um erro ao realizar o cadastro.\nTente novamente mais tarde.',
          );
        });
    },
    [name, password, email, history],
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
