import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

interface LoadingProps {
  isLoading: boolean;
  color: string;
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, color, size }) => {
  return (
    <Container isLoading={isLoading} color={color}>
      <FaSpinner size={size} />
    </Container>
  );
};

export default Loading;
