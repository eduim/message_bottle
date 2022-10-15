import styles from '../styles/Post.module.css';
import PostButton from '../components/PostButton';

export default function post(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}> Tell us something!✨</h1>
        <div className={styles.box}>
          <div className={styles.writablePart}>
            <div className={styles.textPart}>
              <input
                type="text"
                className={styles.textInput}
                placeholder="Enter your message!"
              />
              <PostButton> ADD</PostButton>
            </div>
            {/* <div className={styles.urlPart}>
              <input
                type="text"
                className={styles.urlInput}
                placeholder="Add a URL.."
              />
              <button className={styles.buttonURL}>+</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
