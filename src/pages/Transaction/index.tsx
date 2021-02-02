import React from 'react';

import Header from '../../components/Header';

import { Container } from './styles';

const Transaction: React.FC = () => {
  return (
    <>
      <Header size="small" />

      <Container>
        <form onSubmit={() => console.log('')}>
          <h2>Cadastre uma transação</h2>
          <input type="text" placeholder="Título" />

          <input type="text" placeholder="Valor" />

          <select name="type" id="type">
            <option value="0">Tipo de transação...</option>
            <option value="income">Entrada</option>
            <option value="outcome">Saída</option>
          </select>

          <select name="category" id="category">
            <option value="0">Categoria...</option>
            <option value="income">Comidas</option>
            <option value="outcome">Transporte</option>
            <option value="outcome">Outros</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </>
  );
};

export default Transaction;
