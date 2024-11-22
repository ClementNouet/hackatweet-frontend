import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const url = process.env.BACK_URL;

function Tweet(props)  {
  const { removeTweet } = props
  const user = useSelector((state) => state.user.value);

  const handleLike = () => {
      fetch(`${url}/tweets/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token }),
        }).then(response => response.json())
          .then(() => {
            props.fetchTweets()
          });
  }


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
        <FontAwesomeIcon icon={faHeart} className={styles.icon} style={{color: props.hasLiked ? "#ae445a" : "#FFFFFF"}} onClick={()=>handleLike()}/>
        <span style={{color: props.hasLiked ? "#ae445a" : "#FFFFFF"}}> {props.likes}  </span>

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
