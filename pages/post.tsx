import styles from '../styles/Post.module.css';
import PostButton from '../components/PostButton';
import { Notification } from '@contentful/f36-components';
import HomeButton from '../components/HomeButton';

import React, { useState } from 'react';
import { api } from '../lib/hello';

export default function post(): JSX.Element {
  async function postMessage(text: string): Promise<void> {
    await api
      .post('/messages', {
        entrytext: text
      })
      .then((Response) => {
        void Notification.error(Response.data);
      });
  }

  const [message, setMessage] = useState<string>('');
  // const [messageAlert, setmessageAlert] = useState<string>('')
  // const [showModal, setShowModal]

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
