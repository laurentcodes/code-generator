import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// query
import { useQuery } from '@tanstack/react-query';

// icons
import copy from '../assets/copy.svg';
import logoutIcon from '../assets/logout.svg';

// store
import { authStore } from '../store';

// services
import { generateCode } from '../api/code';

const CodeGenerator = () => {
	const { user, logout } = authStore((state) => state);

	const [timeLeft, setTimeLeft] = useState(30);

	const { data, refetch, isLoading } = useQuery({
		queryKey: ['code'],
		queryFn: generateCode,
		refetchInterval: false,
		refetchOnWindowFocus: false,
		select: (data) => data.data.code.toString(),
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					// Refetch when timer reaches 0
					refetch();
					return 30;
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [refetch]);

	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const progress = circumference - (timeLeft / 30) * circumference;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='code-generator-container'>
			<img
				className='logout-icon'
				src={logoutIcon}
				alt='Logout'
				onClick={logout}
			/>

			<h3 className='code-generator-title'>Hello, {user?.account}!</h3>

			<div className='timer-container'>
				<svg className='timer-svg' viewBox='0 0 120 120'>
					<circle
						cx='60'
						cy='60'
						r={radius}
						fill='none'
						stroke='#e0e0e0'
						strokeWidth='10'
					/>

					<circle
						cx='60'
						cy='60'
						r={radius}
						fill='none'
						stroke='#CA2C92'
						strokeWidth='10'
						strokeDasharray={circumference}
						strokeDashoffset={progress}
						strokeLinecap='round'
						transform='rotate(-90 60 60)'
					/>

					<text
						x='50%'
						y='50%'
						textAnchor='middle'
						dy='.3em'
						className='timer-text'
					>
						{timeLeft}
					</text>
				</svg>
			</div>

			<h3 className='code-message'>Your Access Code is:</h3>
			<div
				className='code-display'
				onClick={() => {
					navigator.clipboard.writeText(data.code);
					toast.success('Copied to clipboard!');
				}}
			>
				{data?.slice(0, 3)} {data?.slice(3, 8)}
				<img className='copy-icon' src={copy} alt='Copy' />
			</div>
		</div>
	);
};

export default CodeGenerator;
