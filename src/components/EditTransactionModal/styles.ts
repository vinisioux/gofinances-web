import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  margin-top: 10rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    width: 100%;
    max-width: 35rem;
    display: flex;
    flex-direction: column;

    h2 {
      align-self: center;
      color: #222;
    }

    input {
      margin-top: 2rem;
      border: 0.1rem solid #ddd;
      border-radius: 0.4rem;
      height: 4.8rem;
      padding: 0 2rem;
      font-size: 1.6rem;
      color: #222;

      & + input {
        margin-top: 0.5rem;
      }
    }

    select {
      background-color: #fff;
      margin-top: 0.5rem;
      border: 0.1rem solid #ddd;
      border-radius: 0.4rem;
      height: 4.8rem;
      padding: 0 2rem;
      font-size: 1.6rem;
      color: #222;
    }

    button {
      margin-top: 1rem;
      border: 0;
      border-radius: 0.4rem;
      height: 4.8rem;
      font-size: 1.6rem;
      background: #3bafda;
      font-weight: bold;
      color: #fff;

      &:hover {
        background-color: ${darken(0.08, '#3bafda')};
      }
    }
  }

  a {
    margin-top: 0.5rem;
    text-decoration: none;
    color: #222;

    &:hover {
      color: ${lighten(0.08, '#222')};
    }
  }
`;
