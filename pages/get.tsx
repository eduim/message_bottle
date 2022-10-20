import styles from '../styles/Get.module.css';
import { useState, useEffect } from 'react';
import ChartMood from '../components/chart/chart';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';

function GetMessage(): JSX.Element {
  useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/messages')
      .then((result) => {
        console.log(result);
        setMessage(result.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const loadingText = <div className={styles.loading}>Loading...</div>;
  if (!loading) {
    return loadingText;
  }
  return (
    <div className={styles.box}>
      {/* <svg height={} width={}></svg> */}
      <p className={styles.text}>{message}</p>
      <div className={styles.cardImg} />
      <div className={styles.opinionBox}>
        <button className={styles.like}>👍🏼</button>
        <button className={styles.dislike}>👎🏼</button>
      </div>
    </div>
  );
}
export default function get(): JSX.Element {
  const [showMessage, setShowMessage] = useState(false);

  const button = (
    <button
      className={styles.buttonGET}
      onClick={() => {
        setShowMessage(true);
      }}
    >
      {' '}
      UNLOCK MESSAGE!
    </button>
  );
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <ChartMood />
        <h1 className={styles.title}>Here u are!</h1>
        {showMessage ? <GetMessage /> : button}
      </div>
    </div>
  );
}
