import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  loading: boolean;
  color: string;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<ContainerProps>`
  ${({ loading, color }) =>
    loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        color: ${color};
      }
    `}
`;
