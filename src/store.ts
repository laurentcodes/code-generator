import { create } from 'zustand';
import { setCookie, clearCookie, getCookie } from './utils/cookies';

interface AuthStore {
	token: string | null;
	user: Record<string, string> | null;
	isAuthenticated: boolean;
	login: (token: string, user: Record<string, string>) => void;
	logout: () => void;
}

export const authStore = create<AuthStore>((set) => ({
	token: getCookie('token') || null,
	user: getCookie('user') ? JSON.parse(getCookie('user') as string) : null,
	isAuthenticated: getCookie('token') !== null,

	login: (token: string, user: Record<string, string>) => {
		setCookie('token', token);
		setCookie('user', JSON.stringify(user));

		set({ token, user });
		set({ isAuthenticated: true });
	},

	logout: () => {
		clearCookie('token');
		clearCookie('user');

		set({ token: null, user: null });

		window.location.href = '/login';
	},
}));
