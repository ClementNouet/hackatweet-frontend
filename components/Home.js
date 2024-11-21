import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Tweet from './Tweet';


function Home() {
	const user = useSelector((state) => state.user.value);
    console.log(user)

  return (
    <div>
      <Head>
        <title>Hackateweet - Home</title>
      </Head>
      <div className={styles.main}>
            {/* PARTIE DE GAUCHE // LOGO + PP USERNAME @username */}
            <div className={styles.left}>
            <img src="dog_logo_light.png" alt="Logo" width="80px" height="80px" />
                <div className={styles.userBottom}>
                    <img src="pp_dog.png" alt="Photo de profil"  width="80px" height="80px"/>
                    <div>
                        <p>{user.username}</p>
                        <p>@{user.username}</p>
                    </div>
                </div>
            </div>
            {/* PARTIE DU MILIEU // CREATION TWEET MAX CHAR + LISTE TWEETS */}
            <div className={styles.mid}>
                <div className={styles.topMid}>
                    <h2 className={styles.title}>Home</h2>
                    <input type='text' placeholder="What's up ?"/>
                    <div className={styles.sendtweet}>
                    <p>0/280</p>  
                    <button>TWEET</button>
                    </div>
                </div>
                <div className={styles.tweetMid}>
                    <Tweet />
                </div>
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
