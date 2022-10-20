import React from 'react';
import styles from './MoodButton.module.css';
import Link from 'next/link';

interface MoodButtonProps {
  href: string;
  children: React.ReactNode[] | React.ReactNode;
}

export default function MoodButton({
  href,
  children,
}: MoodButtonProps): JSX.Element {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <p>{children}</p>
      </a>
    </Link>
  );
}
