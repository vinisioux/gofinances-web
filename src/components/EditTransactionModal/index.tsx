import { Formik } from 'formik';
import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import { Container } from './styles';
import CurrencyInput from '../CurrencyInput';

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
  value: string;
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
    value: Yup.string().required('Digite um valor'),
    selectedType: Yup.string().required('Selecione um tipo de transação'),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <Container>
        <Formik
          initialValues={{
            title: editingTransaction.title,
            value: editingTransaction.value,
            selectedType: editingTransaction.type,
          }}
          validationSchema={formSchema}
          onSubmit={async values => {
            const data = {
              title: values.title,
              value: Number(
                values.value
                  .replace('R$ ', '')
                  .replace('.', '')
                  .replace(',', '.'),
              ),
              type: values.selectedType,
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
              {touched.title && errors.title && (
                <span className="error-message">{errors.title}</span>
              )}

              <CurrencyInput
                placeholder="R$ 1.234,56"
                type="text"
                name="value"
                onChange={handleChange}
              />
              {touched.value && errors.value && (
                <span className="error-message">{errors.value}</span>
              )}

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
                <span className="error-message">{errors.selectedType}</span>
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
