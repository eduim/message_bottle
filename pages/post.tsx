import styles from '../styles/Post.module.css';
import PostButton from '../components/PostButton';
import { useRouter } from 'next/router';
import { Notification } from '@contentful/f36-components';
import HomeButton from '../components/HomeButton';

import React, { useState, useEffect } from 'react';
import { api } from '../lib/hello';
import { useAuth } from '../lib/auth';

export default function post(): JSX.Element {
  const router = useRouter();
  const { token } = router.query;

  const { setToken } = useAuth();
  useEffect(() => {
    if (typeof token === 'string') {
      setToken(token);
    }
  }, [token]);

  async function postMessage(text: string): Promise<void> {
    await api
      .post('/messages', {
        entrytext: text,
      })
      .then((Response) => {
        void Notification.error(Response.data);
      });
  }

  const [message, setMessage] = useState<string>('');

  async function handleMessage(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event?.preventDefault();
    await postMessage(message);
    setMessage('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}> Tell us something!✨</h1>
        <div className={styles.box}>
          <div className={styles.writablePart}>
            <form onSubmit={handleMessage} className={styles.textPart}>
              <input
                type="text"
                className={styles.textInput}
                placeholder="Enter your message!"
                value={message}
                onChange={handleChange}
              />
              <PostButton> ADD</PostButton>
            </form>
            <HomeButton href="/">Home</HomeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
