import styles from '../styles/Login.module.css';
import LoginButton from '../components/LoginButton';

export default function login(): JSX.Element {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a>Message in a Bottle!</a>
      </h1>
      <div className={styles.grid}>
        <div className={styles.moodTitle}>
          <h1>Login with Github</h1>
        </div>
        <LoginButton href="login/github">Log in</LoginButton>
      </div>
    </div>
  );
}
