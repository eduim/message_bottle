import React from 'react';
import styles from './LoginButton.module.css';
import Link from 'next/link';

interface LoginButtonProps {
  href: string;
  children: React.ReactNode[] | React.ReactNode;
}

export default function LoginButton({
  href,
  children,
}: LoginButtonProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <p>{children}</p>
      </a>
    </Link>
  );
}
