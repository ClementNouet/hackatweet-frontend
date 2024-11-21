import styles from '../styles/Tweet.module.css';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

function Tweet() {
	const user = useSelector((state) => state.user.value);

	return (
		<div className={styles.container}>
            <div>
			<img className={styles.images} src='/pp_dog.png' />
			<h2 className={styles.name}>{user.username}</h2>
            </div>
			<div>
                <p>CONTENT</p>
			</div>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faTrash} />
            </div>
		</div>
	);
}

export default Tweet;
