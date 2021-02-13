import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido, verifique novamente')
      .required('O e-mail é um campo obrigatório'),
    password: Yup.string().required('Digite sua senha'),
  });

  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={formSchema}
        onSubmit={async values => {
          await signIn({ email: values.email, password: values.password });
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <h2>Faça seu login</h2>
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
              <button type="submit">Entrar</button>
            )}
          </form>
        )}
      </Formik>
      <Link to="/signup">Me cadastrar</Link>
    </Container>
  );
};

export default SignIn;
