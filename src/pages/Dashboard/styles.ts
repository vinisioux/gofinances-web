import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 112rem;
  margin: 0 auto;
  padding: 4rem 2rem;

  .loading {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 4.8rem;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3.2rem;
  margin-top: -15rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 2.2rem 3.2rem;
  border-radius: 0.5rem;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 1.6rem;

      @media (max-width: 768px) {
        font-size: 1.4rem;
      }
    }
  }

  h1 {
    margin-top: 1.4rem;
    font-size: 3.6rem;
    font-weight: normal;
    line-height: 5.4rem;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.1rem 1.6rem;
  }
`;

export const TableContainer = styled.section`
  margin-top: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  table {
    width: 100%;
    border-spacing: 0 0.8rem;

    @media (max-width: 768px) {
      max-width: 30%;
    }

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 2rem 3.2rem;
      text-align: left;
      font-size: 1.6rem;
      line-height: 2.4rem;

      @media (max-width: 768px) {
        padding: 1rem 1.2rem;
        line-height: 1.2rem;
        font-size: 1.1rem;
      }
    }

    td {
      padding: 2rem 3.2rem;
      border: 0;
      background: #fff;
      font-size: 1.6rem;
      font-weight: normal;
      color: #969cb3;

      @media (max-width: 768px) {
        padding: 1rem 1rem;
        line-height: 1.2rem;
        font-size: 1.1rem;
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 0.8rem 0 0 0.8rem;
    }

    td:last-child {
      border-radius: 0 0.8rem 0.8rem 0;
    }

    .transaction-actions {
      button {
        background: transparent;
        border: 0;
        color: #fff;
        transition: 0.2s;

        svg {
          height: 2rem;
          width: 2rem;
        }

        &:hover {
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          svg {
            height: 1.4rem;
            width: 1.4rem;
          }
        }
      }

      > button {
        margin-right: 0.5rem;
      }
    }
  }
`;

export const PagesButtonsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-self: center;
  list-style: none;

  .pagination {
    display: flex;
    justify-content: start;
    font-size: 1.2rem;
    list-style: none;

    a {
      color: black;
      float: left;
      padding: 0.8rem 1.6rem;
      text-decoration: none;
    }

    li.active {
      a {
        background-color: #5636d3;
        color: #fff;
      }
    }

    a {
      border-radius: 0.5rem;
    }

    li:hover:not(.active) {
      background-color: #ddd;
      border-radius: 0.5rem;
    }
  }
`;
