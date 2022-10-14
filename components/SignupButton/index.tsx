import React from 'react';
import styles from './SignupButton.module.css';
import Link from 'next/link';

interface SignupButtonProps {
  href: string;
  children: React.ReactNode[] | React.ReactNode;
}

export default function SignupButton({
  href,
  children,
}: SignupButtonProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <p>{children}</p>
      </a>
    </Link>
  );
}
