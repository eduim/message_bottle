import styles from '../styles/Login.module.css';
import LoginButton from '../components/LoginButton';

export default function login(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title1}> JOIN US!</h1>
        <h2 className={styles.title2}> Sign up!</h2>
        <form className={styles.form}>
          <div className={styles.emailSection}>
            <label>
              <p>Email</p>
              <input
                className={styles.emailInput}
                type="text"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.passwordSection}>
            <label>
              <p>Password</p>
              <input
                className={styles.passwordInput}
                type="password"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.submitPart}>
            <LoginButton href="home">Log in</LoginButton>
            <a href="signup" className={styles.sentence}>
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
