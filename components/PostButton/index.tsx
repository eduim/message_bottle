import React from 'react';
import styles from './PostButton.module.css';

interface PostButtonProps {
  children: React.ReactNode[] | React.ReactNode;
}

export default function PostButton({ children }: PostButtonProps): JSX.Element {
  return (
    <button className={styles.card}>
      <p>{children}</p>
    </button>
  );
}
