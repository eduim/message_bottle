import styles from '../styles/Signup.module.css';
import SignupButton from '../components/SignupButton';

export default function signup(): JSX.Element {
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
            <SignupButton href="home">Sign Up!</SignupButton>
          </div>
        </form>
      </div>
    </div>
  );
}
