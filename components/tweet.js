import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

function Tweet(props)  {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.images} src="/pp_dog.png" alt="Photo de profil" />
        <h2 className={styles.name}>{props.username}</h2>
      </div>
      <div>
        <p>{props.content}</p>
        <p className={styles.date}>{props}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
