import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Signup from './Signup';

function Home() {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false)

  return (
    <div>
      <Head>
        <title>Hackateweet - Login</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.img}>
           {/*logo*/}
        </div>
        <div className={styles.login}>
          {/*logo*/}
          <h1>See what's happening</h1>
          <h3>Join Hackateweet today.</h3>
          <button onClick={() => setIsOpenSignUp(true)}>Sign up</button>
          {isOpenSignUp && (
            <div>
              <Signup />
              <button onClick={() => setIsOpenSignUp(false)}>Close</button>
            </div>
          )}
          
          <p>Already have on account?</p>
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
