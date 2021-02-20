import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 3rem 0;

  header {
    /* width: 112rem; */
    width: auto;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 2rem ' : '0 2rem 15rem')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav.smartphone {
      display: none;
    }

    nav.desk {
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
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.6;
        }
      }
    }

    @media (max-width: 768px) {
      nav.desk {
        display: none;
      }

      nav.smartphone {
        display: flex;
        flex-direction: column;
        justify-content: center;

        a {
          color: #fff;

          & + a {
            margin-top: 0.2rem;
          }
        }

        button {
          margin-top: 0.2rem;
          display: flex;
        }
      }
    }
  }
`;
