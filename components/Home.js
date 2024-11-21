import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector } from 'react'

function Home() {
	const user = useSelector((state) => state.user.value);

  return (
    <div>
      <Head>
        <title>Hackateweet - Home</title>
      </Head>
      <div className={styles.main}>
            {/* PARTIE DE GAUCHE // LOGO + PP USERNAME @username */}
            <div className={styles.left}>
            <img src="dog_logo_light.png" alt="Logo" width="80px" height="80px" />
                <div>
                    <img src="pp_dog.png" alt="Photo de profil" />
                    <div>
                        <p>{user.username}</p>
                        <p>@{user.username.toLowerCase()}</p>
                    </div>
                </div>
            </div>
            {/* PARTIE DU MILIEU // CREATION TWEET MAX CHAR + LISTE TWEETS */}
            <div className={styles.mid}>
                <h2 className={styles.title}>Home</h2>

            </div>
            {/* PARTIE DE DROITE // TRENDS LISTE # */}
            <div className={styles.right}>
                <h2>Trends</h2>
            </div>  
      </div>
    </div>
  );
}

export default Home;
