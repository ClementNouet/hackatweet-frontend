import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Signup.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

const BACK_URL=process.env.BACK_URL


function Signin (){
    const dispatch = useDispatch();
    const [signinData, setSigninData] = useState({ username: '', password: ''});
    const router = useRouter();

    const handleConnection = () => {

		fetch(`${BACK_URL}users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(signinData),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: data.user.username, token: data.user.token, firstname: data.user.firstname }));
					setSigninData({ username: '', password: ''})
                    router.push('/home');
				}
			});
	};



    return (
        <div className={styles.main}>
            <Image src="/dog_logo_light.png" alt="Logo" width={50} height={50} />
            <p className={styles.title}>Connect to Hackateweet</p>
				<input  className={styles.input}
						type="text" 
						placeholder="Username" 
						onChange={(e) => 
							setSigninData({ ...signinData, username: e.target.value })} 
						value={signinData.username} />
				<input  className={styles.input}
						type="password" 
						placeholder="Password" 
						onChange={(e) => setSigninData({ ...signinData, password: e.target.value })} 
						value={signinData.password}/>
				<button className={styles.button} onClick={()=>handleConnection()}>Sign in</button>
        </div>
    )
}

export default Signin;