import styles from '../styles/Login.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Image from 'next/image';


function Login() {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false)
  const [isOpenSignIn, setIsOpenSignIn] = useState(false)

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
          <Image src="/dog_logo_light.png" alt="Logo" width={80} height={80} />
          <h1>See what's happening</h1>
          <h3>Join Hackateweet today.</h3>
          <button onClick={() => setIsOpenSignUp(true)} className={styles.button}>Sign up</button>

          {/* Popup Signup */}
          {isOpenSignUp && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpenSignUp(false)}
                >
                <span className={styles.X}></span>
                <span className={styles.Y}></span>
                <div className={styles.close}>Close</div>
                </button>
                <Signup className={styles.button}/>
              </div>
            </div>
          )}
          
          <p>Already have on account?</p>
          <button className={styles.button} onClick={() => setIsOpenSignIn(true)}>Sign in</button>
          {/* Popup Signup */}
          {isOpenSignIn && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpenSignIn(false)}
                >
                <span className={styles.X}></span>
                <span className={styles.Y}></span>
                <div className={styles.close}>Close</div>
                </button>
                <Signin />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
