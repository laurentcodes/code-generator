import axios from '../utils/axios';

export const login = async (values: Record<string, string>) => {
	const { data } = await axios.post('/auth/login', values);

	return data;
};
