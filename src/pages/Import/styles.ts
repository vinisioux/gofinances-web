import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 73.6rem;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 3.6rem;
  line-height: 5.4rem;
  color: #363f5f;
  text-align: center;
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  margin-top: 4rem;
  border-radius: 0.5rem;
  padding: 6.4rem;
`;

export const Footer = styled.section`
  margin-top: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: #969cb3;

    img {
      margin-right: 0.5rem;
    }
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 0.5rem;
    padding: 1.5rem 8rem;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
