import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Oops! Something went wrong. Please try again.' 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorMessage;