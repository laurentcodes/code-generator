import axios from '../utils/axios';

export const generateCode = async () => {
	const { data } = await axios.get('/generator/get-code');

	return data;
};
