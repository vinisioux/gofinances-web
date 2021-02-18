import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { signOut } = useAuth();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav className="desk">
          <Link to="/">Listagem</Link>
          <Link to="/transaction">Criar</Link>
          <Link to="/import">Importar</Link>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </nav>

        <nav className="smartphone">
          <Link to="/">Listagem</Link>
          <Link to="/transaction">Criar</Link>
          <Link to="/import">Importar</Link>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
