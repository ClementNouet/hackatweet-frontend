import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function Tweet(props)  {
  const [likes, setLikes] = useState(props.likes);

    const handleLike = () => {
      const newLikes = likes + 1;
      setLikes(newLikes);
      console.log(props)
      fetch(`http://localhost:3000/tweets/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({likes: newLikes}),
        }).then(response => response.json())
          .then(data=> {
            if (data.result){
              setLikes(props.likes);
            }
          });
    }
    return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        <img className={styles.images} src="/pp_dog.png" alt="Photo de profil" width="60px" height="60px"/>
        <h2 className={styles.name}>{props.username}</h2>
        <p className={styles.date}>{props.createAt}</p>
      </div>
      <div className={styles.tweetContent}>
        <p>{props.content}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faHeart} onClick={()=>handleLike()}/>
        <span>{likes}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
