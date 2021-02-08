import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container } from './styles';

const Transaction: React.FC = () => {
  // const [title, setTitle] = useState('');
  // const [value, setValue] = useState('');
  // const [selectedType, setSelectedType] = useState('0');
  // const [selectedCategory, setSelectedCategory] = useState('0');
  // const [newCategory, setNewCategory] = useState('');

  const history = useHistory();

  // const handleSelectType = useCallback(
  //   (event: ChangeEvent<HTMLSelectElement>) => {
  //     const type = event.target.value;
  //     setSelectedType(type);
  //   },
  //   [],
  // );

  // const handleSelectCategory = useCallback(
  //   (event: ChangeEvent<HTMLSelectElement>) => {
  //     const category = event.target.value;
  //     setSelectedCategory(category);
  //   },
  //   [],
  // );

  // const handleSubmit = useCallback(
  //   async (event: FormEvent) => {
  //     event.preventDefault();
  //     if (!title) {
  //       return toast.error('Título inválido, favor verificar');
  //     }

  //     if (!value) {
  //       return toast.error('Valor inválido, favor verificar');
  //     }

  //     if (selectedType === '0') {
  //       return toast.error('Tipo inválido, favor verificar');
  //     }

  //     if (selectedCategory === '0') {
  //       return toast.error('Categoria inválido, favor verificar');
  //     }

  //     if (selectedCategory === 'new-category' && !newCategory) {
  //       return toast.error('Categoria inválido, favor verificar');
  //     }

  //     const data = {
  //       title,
  //       value,
  //       type: selectedType,
  //       category: newCategory || selectedCategory,
  //     };

  //     await api.post('transactions', data);

  //     toast.success('Transação registrada!');

  //     return history.push('/dashboard');
  //   },
  //   [title, newCategory, value, selectedCategory, selectedType, history],
  // );

  return (
    <>
      <Header size="small" />

      <Container>
        <Formik
          initialValues={{
            title: '',
            value: '',
            selectedType: '',
            selectedCategory: '',
            newCategory: '',
          }}
          onSubmit={async values => {
            // await api.post('transactions', values);
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <h2>Cadastre uma transação</h2>
              <input
                type="text"
                placeholder="Título"
                name="title"
                onChange={handleChange}
              />

              <Input
                mask="currency"
                type="text"
                placeholder="Valor"
                name="value"
                onChange={handleChange}
              />

              <select id="type" name="selectedType" onChange={handleChange}>
                <option value="0">Tipo de transação...</option>
                <option value="income">Entrada</option>
                <option value="outcome">Saída</option>
              </select>

              <select
                id="category"
                name="selectedCategory"
                onChange={handleChange}
              >
                <option value="0">Categoria...</option>
                <option value="Comidas">Comidas</option>
                <option value="Transporte">Transporte</option>
                <option value="Outros">Outros</option>
                <option value="new-category">Cadastrar nova categoria</option>
              </select>

              {values.selectedCategory === 'new-category' && (
                <input
                  type="text"
                  placeholder="Nova Categoria"
                  name="newCategory"
                  onChange={handleChange}
                />
              )}
              <button type="submit">Cadastrar</button>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Transaction;
