import React from 'react';
import styles from './HomeButton.module.css';
import Link from 'next/link';

interface HomeButtonProps {
  href: string;
  children: React.ReactNode[] | React.ReactNode;
}

export default function HomeButton({
  href,
  children,
}: HomeButtonProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <p>{children}</p>
      </a>
    </Link>
  );
}
