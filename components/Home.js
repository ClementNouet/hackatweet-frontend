import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../reducers/user';
import Link from 'next/link';
import Tweet from './tweet';

const url = process.env.NEXT_PUBLIC_BACK_URL

function Home() {
    const dispatch = useDispatch();   
    const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
    const [tweets, setTweets] = useState([]); // State pour stocker les tweets
    const [tweet, setTweet] = useState('')
    const [countChar, setCountChar] = useState(0)
    const [final, setFinal] = useState(false)
  
    // Récupérer les tweets depuis l'API
    useEffect(() => {
        fetch(`${url}/tweets/`)
          .then((response) => response.json())
          .then((data) => {

              setTweets(data.reverse()); // Stockez les composants générés 
            }
          )
      }, [final]); 

      const removeTweet = (tweetId) => {
        fetch(`${url}/tweets/${tweetId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`, // Envoyer le token dans les headers
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTweets((prev) => prev.filter((e) => e.id !== tweetId))
          })
      };
      

    
      const tweetList = tweets.map((data, i) => {
        return <Tweet key={i} {...data} username={data.username} content={data.content} date={data.createAt} likes={data.likes} id={data.id} removeTweet={removeTweet}/>
      })
      


const handleTweet = () => {
    fetch(`https://hackatweet-backend-lemon-rho.vercel.app/tweets/newTweet/${user.token}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({tweet: tweet}),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					setTweet('')
          setCountChar(0)
          setFinal(false)
				}
		  });
}

const handleLogout = () => {
  dispatch(logout());
};


  return (
    <div>
      <Head>
        <title>Hackateweet - Home</title>
      </Head>
      <div className={styles.main}>
            {/* PARTIE DE GAUCHE // LOGO + PP USERNAME @username */}
            <div className={styles.left}>
            <Link href="/home">
                <img src="dog_logo_light.png" alt="Logo" width="80px" height="80px" />
            </Link>
                <div className={styles.userBottom}>
                    <img src="pp_dog.png" alt="Photo de profil"  width="80px" height="80px"/>
                    <div>
                        <p  className={styles.userInfos}>{user.username}</p>
                        <p  className={styles.userInfos}>@{user.username}</p>
                        <Link href="/login">
                        <button onClick={() => handleLogout()}>Logout</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* PARTIE DU MILIEU // CREATION TWEET MAX CHAR + LISTE TWEETS */}
            <div className={styles.mid}>
                <div className={styles.topMid}>
                    <h2 className={styles.title}>Home</h2>
                    <input type='text' placeholder="What's up ?" onChange={(e)=> {setTweet(e.target.value); setCountChar(e.target.value.length)}} value={tweet} maxLength={280}/>
                    <div className={styles.sendtweet}>
                    <p className={styles.countChar}>{countChar}/280</p> 
                    <button className={styles.button} onClick={()=>{handleTweet(), setFinal(true)}}>TWEET</button>
                    </div>
                </div>
                <div className={styles.tweetMid}>
                    {tweetList}
                </div>
            </div>
            {/* PARTIE DE DROITE // TRENDS LISTE # */}
            <div className={styles.right}>
                <h2 className={styles.title}>Trends</h2>
            </div>  
      </div>
    </div>
  );
}


export default Home;