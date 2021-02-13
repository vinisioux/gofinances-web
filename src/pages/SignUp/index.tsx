import { Formik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';

import { Container } from './styles';

const SignUp: React.FC = () => {
  const history = useHistory();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Digite seu nome'),
    email: Yup.string()
      .email('E-mail inválido, verifique novamente')
      .required('O e-mail é um campo obrigatório'),
    password: Yup.string()
      .min(6, 'A senha precisa ter ao menos 6 digitos')
      .required('Digite sua senha'),
  });

  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={formSchema}
        onSubmit={async values => {
          await api
            .post('users', {
              name: values.name,
              email: values.email,
              password: values.password,
            })
            .then(() => {
              history.push('/');
            })
            .catch(error => {
              if (
                error.response.data.message === 'e-mail address already used'
              ) {
                return toast.error('E-mail já cadastrado.');
              }
              return toast.error(
                'Ocorreu um erro ao realizar o cadastro.\nTente novamente mais tarde.',
              );
            });
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <h2>Faça seu cadastro</h2>
            <input
              type="text"
              placeholder="Nome completo"
              name="name"
              onChange={handleChange}
            />
            {touched.name && errors.name && (
              <span className="error-message">{errors.name}</span>
            )}

            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}

            <input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            {isSubmitting ? (
              <button type="button" style={{ cursor: 'not-allowed' }}>
                Carregando...
              </button>
            ) : (
              <button type="submit">Cadastrar</button>
            )}
          </form>
        )}
      </Formik>
      <Link to="/">Já possuo uma conta</Link>
    </Container>
  );
};

export default SignUp;
