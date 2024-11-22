import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addTweet } from '../reducers/tweet';
import Link from 'next/link';
import Tweet from './tweet';


function Home() {
    const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
    const [tweets, setTweets] = useState([]); // State pour stocker les tweets
    const [tweet, setTweet] = useState('')
    const [countChar, setCountChar] = useState(0)
    const [final, setFinal] = useState(false)
  
    // Récupérer les tweets depuis l'API
    useEffect(() => {
        fetch('http://localhost:3000/tweets/')
          .then((response) => response.json())
          .then((data) => {
              setTweets(data.reverse()); // Stockez les composants générés 
            }
          )
      }, [final]); 
    
      const tweetList = tweets.map((data, i) => {
        return <Tweet key={i} {...data} username={data.username} content={data.content} date={data.createAt} likes={data.likes} id={data._id}/>
      })
      

const handleTweet = () => {
    fetch(`http://localhost:3000/tweets/newTweet/${user.token}`, {
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




  return (
    <div>
      <Head>
        <title>Hackateweet - Home</title>
      </Head>
      <div className={styles.main}>
            {/* PARTIE DE GAUCHE // LOGO + PP USERNAME @username */}
            <div className={styles.left}>
            <Link href="/login">
                <img src="dog_logo_light.png" alt="Logo" width="80px" height="80px" />
            </Link>
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
                    <input type='text' placeholder="What's up ?" onChange={(e)=> {setTweet(e.target.value); setCountChar(e.target.value.length)}} value={tweet} maxLength={280}/>
                    <div className={styles.sendtweet}>
                    <p>{countChar}/280</p> 
                    <button className={styles.button} onClick={()=>{handleTweet(), setFinal(true)}}>TWEET</button>
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