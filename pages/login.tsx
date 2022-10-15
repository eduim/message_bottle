import styles from '../styles/Login.module.css';
import LoginButton from '../components/LoginButton';

export default function login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title1}> JOIN US!</h1>
        <div className={styles.submitPart}>
          <LoginButton href="login/github">Log in</LoginButton>
        </div>
      </div>
    </div>
  );
}
