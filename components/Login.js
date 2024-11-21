import styles from '../styles/Login.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Signup from './Signup';

function Login() {
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

          {/* Popup Signup */}
          {isOpenSignUp && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <Signup />
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpenSignUp(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          
          <p>Already have on account?</p>
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
