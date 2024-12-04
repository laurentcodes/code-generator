import { useState } from 'react';
import './App.css';

const App = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='login-container'>
			<form className='login-form'>
				<h2>Login</h2>

				<div className='form-group'>
					<label htmlFor='username'>Username</label>

					<input
						type='text'
						id='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Enter your username'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Password</label>

					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Enter your password'
					/>
				</div>

				<button type='submit' className='login-button'>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default App;
