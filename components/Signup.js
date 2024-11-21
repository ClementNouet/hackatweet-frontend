import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Signup.module.css';


function Signup (){
    const dispatch = useDispatch();
    const [signupData, setSignupData] = useState({ username: '', password: '', firstname:'' });

    const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(signupData),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: data.user.username, token: data.user.token, firstname: data.user.firstname  }));
					setSignupData({ username: '', password: '', firstname:'' })
				}
			});
	};


    return (
        <div className={styles.main}>
            {/*logo*/}
            <p className={styles.title}>Create your Hackateweet account</p>
                <input  className={styles.input}
						type="text" 
						placeholder="Firstname" 
						onChange={(e) => 
							setSignupData({ ...signupData, firstname: e.target.value })} 
						value={signupData.firstname} />
				<input  className={styles.input}
						type="text" 
						placeholder="Username" 
						onChange={(e) => 
							setSignupData({ ...signupData, username: e.target.value })} 
						value={signupData.username} />
				<input  className={styles.input}
						type="password" 
						placeholder="Password" 
						onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} 
						value={signupData.password}/>
				<button className={styles.button} onClick={()=>handleRegister()}>Sign up</button>
        </div>
    )
}

export default Signup;