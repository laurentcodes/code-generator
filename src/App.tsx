import { useState } from 'react';
import './App.css';
import { z } from 'zod';
import { toast } from 'sonner';

// query
import { useMutation } from '@tanstack/react-query';

// store
import { authStore } from './store';

// services
import { login } from './api/auth';

const App = () => {
	const { login: authenticate } = authStore((state) => state);

	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	const loginSchema = z.object({
		account: z.string(),
		password: z.string(),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: login,
		onSuccess: ({ data }) => {
			authenticate(data.token, data.user);

			toast.success('Logged in successfully!');
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutate(loginSchema.parse({ account, password }));
	};

	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2>Login</h2>

				<div className='form-group'>
					<label htmlFor='account'>Account Number</label>

					<input
						type='text'
						id='account'
						value={account}
						onChange={(e) => setAccount(e.target.value)}
						placeholder='Enter your account number'
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
					{isPending ? 'Loading...' : 'Sign In'}
				</button>
			</form>
		</div>
	);
};

export default App;
