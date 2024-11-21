import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Tweet(props)  {
    const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le Redux store
    const handleLike = () => {
      fetch(`http://localhost:3000/tweets/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(),
        }).then(response => response.json())
          .then();
    }
    return (
    <div className={styles.container}>
      <div>
        <img className={styles.images} src="/pp_dog.png" alt="Photo de profil" />
        <h2 className={styles.name}>{props.username}</h2>
      </div>
      <div>
        <p>{props.content}</p>
        <p className={styles.date}>{props.createAt}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faHeart} onClick={()=>handleLike()}/>
        <span>{props.likes}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
