import { createBrowserRouter } from 'react-router-dom'
import { RedirectToWelcome1 } from '../components/RedirectToWelcome1'
import { MainLayout } from '../layouts/MainLayout'
import NotFountPage from '../pages/NotFountPage'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <NotFountPage />,
		children: [
			welcomeRoutes
		],
	},
])
