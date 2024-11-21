import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addTweet } from '../reducers/tweet';
import Tweet from './Tweet';


function Home() {
    const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
    const [tweets, setTweets] = useState([]); // State pour stocker les tweets
    const [tweet, setTweet] = useState('')
    const [countChar, setCountChar] = useState(0)
  
    // Récupérer les tweets depuis l'API
    useEffect(() => {
        fetch('http://localhost:3000/tweets/')
          .then((response) => response.json())
          .then((data) => {
              setTweets(data); // Stockez les composants générés 
            }
          )
      }, []); 
    
      const tweetList = tweets.map((data, i) => {
        return <Tweet key={i} {...data} username={data.username} content={data.content} date={data.createAt} />
      })
      

      const handleTweet = () => {
        fetch(`http://localhost:3000/tweets/newtweet/${user.value.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(tweet),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					setTweet('')
				}
			});
      }



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
                    <input type='text' placeholder="What's up ?" onChange={(e)=> {setTweet(e.target.value)}} value={tweet}/>
                    <div className={styles.sendtweet}>
                    <p onChange={(e)=> {setCountChar(tweet.length)}} >{countChar}/280</p>  
                    <button onClick={handleTweet}>TWEET</button>
                    </div>
                </div>
                <div className={styles.tweetMid}>
                    {tweetList}
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
