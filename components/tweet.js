import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const url = process.env.BACK_URL;

function Tweet(props) {
  const { removeTweet } = props;
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);

  const user = useSelector((state) => state.user.value);

  // Charger l'état initial depuis le backend
  useEffect(() => {
    fetch(`${url}/tweets/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setLikes(data.likes);
          setIsLiked(data.isLiked); // Supposez que `isLiked` est retourné pour cet utilisateur
        }
      });
  }, [props.id]);

  const handleLike = () => {
    let newLikes = likes;
    if (isLiked) {
      newLikes -= 1;
      setIsLiked(false);
    } else {
      newLikes += 1;
      setIsLiked(true);
    }
    setLikes(newLikes);

    // Mettre à jour le backend
    fetch(`${url}/tweets/${props.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: newLikes, userToken: user.token }),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        <img
          className={styles.images}
          src="/pp_dog.png"
          alt="Photo de profil"
          width="60px"
          height="60px"
        />
        <h2 className={styles.name}>{props.username}</h2>
        <p className={styles.date}>{moment(props.createAt).fromNow()}</p>
      </div>
      <div className={styles.tweetContent}>
        <p>{props.content}</p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.icon}
          style={{ color: isLiked ? '#ae445a' : '#FFFFFF' }}
          onClick={() => handleLike()}
        />
        <span style={{ color: isLiked ? '#ae445a' : '#FFFFFF' }}>{likes}</span>

        {props.token === user.token ? (
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.icon}
            onClick={() => removeTweet(props.id)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Tweet;
