import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import App from './App.tsx';
import CodeGenerator from './pages/CodeGenerator.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<CodeGenerator />} />
				<Route path='/login' element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
