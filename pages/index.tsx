import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MoodButton from '../components/MoodButton';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const moodEmojis = [
  { id: 1, pic: '😊' },
  { id: 2, pic: '😄 ' },
  { id: 3, pic: '😊' },
  { id: 4, pic: '🥶' },
  { id: 5, pic: '😮' },
];

async function postMood(id: number): Promise<void> {
  await api.post('/moods', {
    mood: id,
  });
}

const Home: NextPage = () => {
  async function postMood(id: number): Promise<void> {
    try {
      await api.post('/moods', {
        mood: id,
      });
      void (await router.push('/getorpost'));
    } catch (e) {
      void Notification.setPlacement('top');
      void Notification.error(
        "You'are not logged in. Please click the logo below to log in."
      );
    }
  }
  const router = useRouter();
  const { token } = router.query;

  const { setToken } = useAuth();
  useEffect(() => {
    if (typeof token === 'string') {
      setToken(token);
    }
  }, [token]);

  async function postMood(id: number): Promise<void> {
    try {
      await api.post('/moods', {
        mood: id,
      });
      void (await router.push('/getorpost'));
    } catch (e) {
      void Notification.setPlacement('top');

      if (axios.isAxiosError(e)) {
        void Notification.error(e.response?.data);
      } else {
        void Notification.error(
          'Unknown error, please try again or contact and administrator.'
        );
      }
    }
  }

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

          <div className={styles.grid}>
            {moodEmojis.map((emoji) => {
              return (
                <a
                  key={emoji.id}
                  href="getorpost"
                  className={styles.card}
                  onClick={async () => await postMood(emoji.id)}
                >
                  <p>{emoji.pic}</p>
                </a>
              );
            })}
          </div>
        </div>
        <HomeButton href="/getorpost">Home</HomeButton>
      </main>
      <div className={styles.brandBox}>
        <img src="/assets/logo.png" width={75} height={75} />
        <svg className={styles.wave} viewBox="0 0 12960 1120">
          <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
            <animate
              dur="5s"
              repeatCount="indefinite"
              attributeName="d"
              values="
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
            "
            />
          </path>
        </svg>
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
