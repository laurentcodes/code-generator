import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthGuard from './guards/AuthGuard.tsx';

import App from './App.tsx';
import CodeGenerator from './pages/CodeGenerator.tsx';

import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster
			richColors
			position='top-right'
			toastOptions={{
				style: {
					padding: '1rem',
				},
			}}
		/>

		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<AuthGuard>
								<CodeGenerator />
							</AuthGuard>
						}
					/>
					<Route
						path='/login'
						element={
							<AuthGuard>
								<App />
							</AuthGuard>
						}
					/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
