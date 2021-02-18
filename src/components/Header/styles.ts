import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 3rem 0;

  header {
    width: 112rem;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 2rem ' : '0 2rem 15rem')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 1.6rem;
        transition: opacity 0.2s;

        & + a {
          margin-left: 3.2rem;
        }

        &:hover {
          opacity: 0.6;
        }
      }

      button {
        margin-left: 6.4rem;
        background: 0;
        border: 0;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
