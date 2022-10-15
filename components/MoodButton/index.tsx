import React from 'react';
import styles from './MoodButton.module.css';
import Link from 'next/link';

type MoodButtonProps =
  | {
      href: string;
      children: React.ReactNode[] | React.ReactNode;
    }
  | {
      onClick: React.MouseEventHandler<HTMLButtonElement>;
      children: React.ReactNode[] | React.ReactNode;
    };

export default function MoodButton(props: MoodButtonProps): JSX.Element {
  if ('href' in props) {
    return (
      <Link href={props.href}>
        <a className={styles.card}>
          <p>{props.children}</p>
        </a>
      </Link>
    );
  } else {
    return (
      <button className={styles.card} onClick={props.onClick}>
        <p>{props.children}</p>
      </button>
    );
  }
}
