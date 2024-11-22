import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const url = process.env.BACK_URL

function Tweet(props)  {
  const { removeTweet } = props
  const [likes, setLikes] = useState(props.likes);

  const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
    const handleLike = () => {
      const newLikes = likes + 1;
      setLikes(newLikes);
      fetch(`${url}/tweets/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({likes: newLikes}),
        }).then(response => response.json())
          .then();
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
        <FontAwesomeIcon icon={faHeart} className={styles.icon} onClick={()=>handleLike()}/>
        <span>{likes}</span>

            {props.token === user.token ? (
                <FontAwesomeIcon icon={faTrash} className={styles.icon}  onClick={() => removeTweet(props.id)}/>
            ) : null}
      </div>
    </div>
  );
}

export default Tweet;
