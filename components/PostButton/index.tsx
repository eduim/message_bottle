import React from 'react';
import styles from './PostButton.module.css';

interface PostButtonProps {
  children: React.ReactNode[] | React.ReactNode;
}

export default function PostButton({ children }: PostButtonProps): JSX.Element {
  return (
    <a className={styles.card}>
      <p>{children}</p>
    </a>
  );
}
