import type { NextPage } from 'next';
import Head from 'next/head';
import MoodButton from '../components/MoodButton';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

const moodEmojis = [
  { id: 1, pic: '😊' },
  { id: 2, pic: '😄 ' },
  { id: 3, pic: '😊' },
  { id: 4, pic: '🥶' },
  { id: 5, pic: '😮' }
];

async function postMood(id: number): Promise<void> {
  await api.post('/moods', {
    mood: id
  });
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Message in a Bottle!</a>
        </h1>

        <div className={styles.grid}>
          <div className={styles.moodTitle}>
            <h1>How are you today? </h1>
          </div>

          <div className={styles.moodGrid}>
            {moodEmojis.map((emoji) => {
              return (
                <MoodButton
                  key={emoji.id}
                  onClick={async () => await postMood(emoji.id)}
                >
                  {emoji.pic}
                </MoodButton>
              );
            })}
          </div>
        </div>
      </main>
      <div className={styles.brandBox}>
        <img src="/assets/logo.png" width={75} height={75} />
      </div>
      {/* 
      <footer className={styles.footer}>
        <a
          href="https://www.arol.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by QUACK TEAM
          <br />
          <img
            className={styles.logo}
            src="https://www.enwallpaper.com/wp-content/uploads/b107616a275cad92b2281f134d78298a.jpg"
            width={50}
            height={50}
          />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
