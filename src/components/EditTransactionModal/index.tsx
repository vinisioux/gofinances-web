import { Formik } from 'formik';
import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import { Container } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface EditTransaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  editingTransaction: EditTransaction;
}

Modal.setAppElement('#root');

const EditTransactionModal: React.FC<EditModalProps> = ({
  isOpen,
  closeModal,
  editingTransaction,
}) => {
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
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <Container>
        <Formik
          initialValues={{
            title: editingTransaction.title,
            value: editingTransaction.value,
            selectedType: editingTransaction.type,
            selectedCategory: editingTransaction.category?.title,
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

            await api.put(`transactions/${editingTransaction.id}`, data);

            toast.success('Transação atualizada!');

            closeModal();
            history.push('/');
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
              <h2>Editar</h2>
              <input
                type="text"
                placeholder="Título"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              {touched.title && errors.title && <div>{errors.title}</div>}

              <input
                type="number"
                min="0.00"
                step="0.01"
                placeholder="Valor. (150.29)"
                name="value"
                value={values.value}
                onChange={handleChange}
              />
              {touched.value && errors.value && <div>{errors.value}</div>}

              <select
                id="type"
                name="selectedType"
                onChange={handleChange}
                value={values.selectedType}
              >
                <option value="0">Tipo de transação...</option>
                <option value="income">Entrada</option>
                <option value="outcome">Saída</option>
              </select>
              {touched.selectedType && errors.selectedType && (
                <div>{errors.title}</div>
              )}

              <select
                id="category"
                name="selectedCategory"
                onChange={handleChange}
                value={values.selectedCategory}
              >
                <option value="0">Categoria...</option>
                <option value="comidas">Comidas</option>
                <option value="transporte">Transporte</option>
                <option value="outros">Outros</option>
                <option value="new-category">Cadastrar nova categoria</option>
              </select>
              {touched.selectedCategory && errors.selectedCategory && (
                <div>{errors.selectedCategory}</div>
              )}

              {values.selectedCategory === 'new-category' && (
                <input
                  type="text"
                  placeholder="Nova Categoria"
                  name="newCategory"
                  value={values.newCategory}
                  onChange={handleChange}
                />
              )}
              {isSubmitting ? (
                <span>Salvando...</span>
              ) : (
                <button type="submit">Salvar</button>
              )}
            </form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

export default EditTransactionModal;
