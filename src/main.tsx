import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.tsx';
import CodeGenerator from './pages/CodeGenerator.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Toaster
				richColors
				position='top-right'
				toastOptions={{
					style: {
						padding: '1rem',
					},
				}}
			/>

			<Routes>
				<Route path='/' element={<CodeGenerator />} />
				<Route path='/login' element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
