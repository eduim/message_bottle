import styles from '../styles/Post.module.css';
import PostButton from '../components/PostButton';
import { Notification } from '@contentful/f36-components';
import HomeButton from '../components/HomeButton';
import axios from 'axios';

import React, { useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

export default function post(): JSX.Element {
  useAuth();

  async function postMessage(text: string): Promise<void> {
    try {
      await api.post('/messages', {
        entrytext: text,
      });
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

  const [message, setMessage] = useState<string>('');

  async function handleMessage(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event?.preventDefault();
    const response = await postMessage(message);
    setTimeout(() => {
      console.log(response);
    }, 3000);
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
