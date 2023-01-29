import React, { useEffect } from 'react';

type Props = {
  clearErrorMessage: () => void,
};

export const DateInputError: React.FC<Props> = ({ clearErrorMessage }) => {
  useEffect(() => {
    setTimeout(() => clearErrorMessage(), 2000);
  }, []);

  return (
    <p>Invalid date format</p>
  );
};
