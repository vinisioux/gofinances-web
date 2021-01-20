import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container, Header } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Header>
        <header>
          <img src={Logo} alt="GoFinances" />
          <nav>
            <Link to="/register">Cadastro</Link>
          </nav>
        </header>
      </Header>
    </Container>
  );
};

export default SignIn;
