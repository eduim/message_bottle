import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MoodButton from '../components/MoodButton';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';
import { api } from '../lib/hello';
import { Notification } from '@contentful/f36-components';
import axios from 'axios';
import HomeButton from '../components/HomeButton';

const moodEmojis = [
  { id: 1, pic: '😎' },
  { id: 2, pic: '😞' },
  { id: 3, pic: '🤓' },
  { id: 4, pic: '😄' },
  { id: 5, pic: '😤' }
];

const Home: NextPage = () => {
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
        mood: id
      });
      void (await router.push('/getorpost'));
    } catch (e: any) {
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
          <MoodButton href="google.com" onClick={(e) => e.preventDefault()} />
          <div className={styles.moodGrid}>
            {moodEmojis.map((emoji) => {
              return (
                <MoodButton key={emoji.id} onClick={() => postMood(emoji.id)}>
                  {emoji.pic}
                </MoodButton>
              );
            })}
          </div>
        </div>
        <HomeButton href="/getorpost">Home</HomeButton>
      </main>
      <div className={styles.brandBox}>
        <a href="/login">
          <img src="/assets/logo.png" width={75} height={75} />
        </a>
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
