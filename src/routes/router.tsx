import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import Home from '../pages/home'
import NotFountPage from '../pages/NotFountPage'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFountPage />,
    children: [
      welcomeRoutes
    ],
  },
])
