export const formatNumber = (number: number) => {
	return number.toLocaleString('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
	});
};

export const formatCurrency = (number: number) => {
	return number?.toLocaleString('en-NG', {
		style: 'currency',
		currency: 'NGN',
		minimumFractionDigits: 2,
	});
};

export const formatAge = (birthDate: Date) => {
	const today = new Date();
	const birthYear = today.getFullYear() - birthDate.getFullYear();
	const birthMonth = today.getMonth() - birthDate.getMonth();
	const birthDay = today.getDate() - birthDate.getDate();

	if (birthYear > 0) {
		return `${birthYear} year${birthYear > 1 ? 's' : ''}`;
	} else if (birthMonth > 0) {
		return `${birthMonth} month${birthMonth > 1 ? 's' : ''}`;
	} else if (birthDay > 0) {
		return `${birthDay} day${birthDay > 1 ? 's' : ''}`;
	}

	return '0 days';
};
