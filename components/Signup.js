import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';


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
					dispatch(login({ username: data.user, token: data.token, firstname: data.firstname  }));
					setSignupData({ username: '', password: '', firstname:'' })
				}
			});
	};


    return (
        <div>
            {/*logo*/}
            <p>Create your Hackateweet account</p>
                <input  type="text" 
						placeholder="Firstname" 
						onChange={(e) => 
							setSignupData({ ...signupData, firstname: e.target.value })} 
						value={signupData.firstname} />
				<input  type="text" 
						placeholder="Username" 
						onChange={(e) => 
							setSignupData({ ...signupData, username: e.target.value })} 
						value={signupData.username} />
				<input  type="password" 
						placeholder="Password" 
						onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} 
						value={signupData.password}/>
				<button id="register" onClick={()=>handleRegister()}>Register</button>
        </div>
    )
}

export default Signup;