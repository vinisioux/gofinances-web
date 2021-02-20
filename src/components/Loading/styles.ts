import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  isLoading: boolean;
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
  ${({ isLoading, color }) =>
    isLoading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        color: ${color};
      }
    `}
`;
