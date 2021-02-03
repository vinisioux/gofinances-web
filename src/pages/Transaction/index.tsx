import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

const Transaction: React.FC = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [selectedType, setSelectedType] = useState('0');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [newCategory, setNewCategory] = useState('');

  const history = useHistory();

  const handleSelectType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const type = event.target.value;
      setSelectedType(type);
    },
    [],
  );

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const category = event.target.value;
      setSelectedCategory(category);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (!title) {
        return toast.error('Título inválido, favor verificar');
      }

      if (!value) {
        return toast.error('Valor inválido, favor verificar');
      }

      if (selectedType === '0') {
        return toast.error('Tipo inválido, favor verificar');
      }

      if (selectedCategory === '0') {
        return toast.error('Categoria inválido, favor verificar');
      }

      if (selectedCategory === 'new-category' && !newCategory) {
        return toast.error('Categoria inválido, favor verificar');
      }

      const data = {
        title,
        value,
        type: selectedType,
        category: newCategory || selectedCategory,
      };

      await api.post('transactions', data);

      toast.success('Transação registrada!');

      return history.push('/dashboard');
    },
    [title, newCategory, value, selectedCategory, selectedType, history],
  );

  return (
    <>
      <Header size="small" />

      <Container>
        <form onSubmit={handleSubmit}>
          <h2>Cadastre uma transação</h2>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Valor"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <select
            name="type"
            id="type"
            value={selectedType}
            onChange={handleSelectType}
          >
            <option value="0">Tipo de transação...</option>
            <option value="income">Entrada</option>
            <option value="outcome">Saída</option>
          </select>

          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleSelectCategory}
          >
            <option value="0">Categoria...</option>
            <option value="Comidas">Comidas</option>
            <option value="Transporte">Transporte</option>
            <option value="Outros">Outros</option>
            <option value="new-category">Cadastrar nova categoria</option>
          </select>

          {selectedCategory === 'new-category' && (
            <input
              type="text"
              placeholder="Nova Categoria"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
          )}
          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </>
  );
};

export default Transaction;
