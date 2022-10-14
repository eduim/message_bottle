import styles from '../styles/Get.module.css';

const post = {
  post_date: 1547092066,
  text: 'Rita always without dreams and hopes.',
  picture: 'url',
  video: 'url',
};

export default function get(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Here u are!</h1>
        <div className={styles.card}>
          <div className={styles.cardInfo}>
            {/* <svg height={} width={}></svg> */}
            <p className={styles.text}>{post.text}</p>
            <div className={styles.cardImg} />
            <div className={styles.opinionBox}>
              <button className={styles.like}>👍🏼</button>
              <button className={styles.dislike}>👎🏼</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
