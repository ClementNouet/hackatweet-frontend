import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Tweet(props)  {
    const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        <img className={styles.images} src="/pp_dog.png" alt="Photo de profil" width="60px" height="60px"/>
        <h2 className={styles.name}>{user.username}</h2>
        <p className={styles.date}>{props.createAt}</p>
      </div>
      <div className={styles.tweetContent}>
        <p>{props.content}</p>
      </div>
      <div className={styles.tweetIcons}>
        <FontAwesomeIcon icon={faHeart} />
        <p>0</p>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
