import styles from '../styles/GetorPost.module.css';

export default function getOrPost(): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.question}> What do you want to do today? </h1>
      <div className={styles.grid}>
        <a href="get" className={styles.card}>
          GET 👀
        </a>
        <a href="post" className={styles.card}>
          WRITE ✍🏼
        </a>
      </div>
    </div>
  );
}
