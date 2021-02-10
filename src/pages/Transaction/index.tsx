import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

const Transaction: React.FC = () => {
  const history = useHistory();

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
            const data = {
              title: values.title,
              value: values.value,
              type: values.selectedType,
              category: values.newCategory || values.selectedCategory,
            };

            await api.post('transactions', data);

            toast.success('Transação registrada!');

            return history.push('/dashboard');
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
          }) => (
            <form onSubmit={handleSubmit}>
              <h2>Cadastre uma transação</h2>
              <input
                type="text"
                placeholder="Título"
                name="title"
                onChange={handleChange}
              />

              <input
                type="number"
                min="0.00"
                step="0.01"
                placeholder="Valor. (150.29)"
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
              {isSubmitting ? (
                <span>Salvando...</span>
              ) : (
                <button type="submit">Cadastrar</button>
              )}
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Transaction;
