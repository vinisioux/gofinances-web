import React, { InputHTMLAttributes, useCallback } from 'react';

import { currency } from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'currency';
}

const Input: React.FC<InputProps> = ({ mask, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'currency') {
        currency(e);
      }
    },
    [mask],
  );

  return (
    <div>
      <input {...props} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Input;
