import styles from '../styles/Post.module.css';
import PostButton from '../components/PostButton';
import { api } from '.';
import React, { ReactElement, useState } from 'react';

export default function post(): JSX.Element {
  async function postMessage(text: string): Promise<void> {
    await api.post('/messages', {
      entrytext: text,
    });
  }

  const [message, setMessage] = useState<string>('');

  async function handleMessage(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event?.preventDefault();
    const response = await postMessage(message);
    console.log(response);
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
          </div>
        </div>
      </div>
    </div>
  );
}
