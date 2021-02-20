import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

interface LoadingProps {
  loading: boolean;
  color: string;
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ loading, color, size }) => {
  return (
    <Container loading={loading} color={color}>
      <FaSpinner size={size} />
    </Container>
  );
};

export default Loading;
