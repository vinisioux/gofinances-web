import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container } from './styles';

const Transaction: React.FC = () => {
  const history = useHistory();

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Título muito pequeno')
      .max(20, 'Título muito grande')
      .required('O título é um campo obrigatório'),
    value: Yup.number()
      .min(0.01, 'Valor não permitido')
      .max(9999999, 'Valor não permitido')
      .required('Digite um valor'),
    selectedType: Yup.string().required('Selecione um tipo de transação'),
    selectedCategory: Yup.string().required('Selecione uma categoria'),
    newCategory: Yup.string(),
  });

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
          validationSchema={formSchema}
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
              {touched.title && errors.title && (
                <span className="error-message">{errors.title}</span>
              )}

              <input
                type="number"
                min="0.00"
                step="0.01"
                placeholder="Valor. (150.29)"
                name="value"
                onChange={handleChange}
              />
              {touched.value && errors.value && (
                <span className="error-message">{errors.value}</span>
              )}

              <select id="type" name="selectedType" onChange={handleChange}>
                <option value="0">Tipo de transação...</option>
                <option value="income">Entrada</option>
                <option value="outcome">Saída</option>
              </select>
              {touched.selectedType && errors.selectedType && (
                <span className="error-message">{errors.title}</span>
              )}

              <select
                id="category"
                name="selectedCategory"
                onChange={handleChange}
              >
                <option value="0">Categoria...</option>
                <option value="comidas">Comidas</option>
                <option value="transporte">Transporte</option>
                <option value="outros">Outros</option>
                <option value="new-category">Cadastrar nova categoria</option>
              </select>
              {touched.selectedCategory && errors.selectedCategory && (
                <span className="error-message">{errors.selectedCategory}</span>
              )}

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
