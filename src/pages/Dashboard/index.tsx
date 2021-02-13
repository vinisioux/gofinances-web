import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { toast } from 'react-toastify';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [currentPage, setCurrentPage] = useState(1);

  const loadTransactions = useCallback(async () => {
    const response = await api.get(`/transactions?page=${currentPage}`);
    setTransactions(response.data.transactions);

    setBalance({
      income: response.data.balance.income,
      outcome: response.data.balance.outcome,
      total: response.data.balance.total,
    });
  }, [currentPage]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const transactionsList = useMemo(() => {
    return transactions.map(transaction => ({
      ...transaction,
      formattedValue: formatValue(transaction.value),
      formattedDate: formatDate(transaction.created_at),
    }));
  }, [transactions]);

  const incomeBalance = useMemo(() => {
    return formatValue(Number(balance.income));
  }, [balance]);

  const outcomeBalance = useMemo(() => {
    return formatValue(Number(balance.outcome));
  }, [balance]);

  const totalBalance = useMemo(() => {
    return formatValue(Number(balance.total));
  }, [balance]);

  const handleChangePage = useCallback(
    (prevOrNext: string) => {
      if (currentPage === 1 && prevOrNext === 'prev') {
        return;
      }
      if (prevOrNext === 'prev' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      if (transactions.length < 10 && prevOrNext === 'next') {
        return;
      }
      if (currentPage >= 1 && prevOrNext === 'next') {
        setCurrentPage(currentPage + 1);
      }
    },
    [currentPage, transactions],
  );

  // const handleEditUser = useCallback(
  //   (id: number) => {
  //     history.push({
  //       pathname: `/form-user/${id}`,
  //       state: { id },
  //     });
  //   },
  //   [history],
  // );

  const handleDeleteTransaction = useCallback(
    async (id: string) => {
      await api.delete(`transactions/${id}`);
      toast.success('Transação removida com sucesso!');
      const newTransactions = transactions.filter(
        transaction => transaction.id !== id,
      );
      setTransactions(newTransactions);
    },
    [transactions],
  );

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{incomeBalance}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{outcomeBalance}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{totalBalance}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {console.log('a')}
              {transactionsList.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  {transaction.type === 'income' ? (
                    <td className="income">{transaction.formattedValue}</td>
                  ) : (
                    <td className="outcome">{`- ${transaction.formattedValue}`}</td>
                  )}
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td className="transaction-actions">
                    <button type="button" onClick={() => console.log('edit')}>
                      <FiEdit size={20} color="#3bafda" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <FiTrash2 size={20} color="#ff4b5b" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button type="button" onClick={() => handleChangePage('prev')}>
              anterior
            </button>
            <button type="button" onClick={() => handleChangePage('next')}>
              proximo
            </button>
          </div>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
