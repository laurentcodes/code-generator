import { useState, useEffect } from 'react';

const CodeGenerator = () => {
	const [code, setCode] = useState('');
	const [timeLeft, setTimeLeft] = useState(30);

	const generateCode = () => {
		const newCode = Math.floor(100 + Math.random() * 900).toString();

		setCode(newCode);
		setTimeLeft(30);
	};

	useEffect(() => {
		generateCode();

		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					generateCode();
					return 30;
				}

				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const radius = 50;
	const circumference = 2 * Math.PI * radius;
	const progress = circumference - (timeLeft / 30) * circumference;

	return (
		<div className='code-generator-container'>
			<h3 className='code-generator-title'>Hello, Segun!</h3>

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
			<div className='code-display'>{code}</div>
		</div>
	);
};

export default CodeGenerator;
