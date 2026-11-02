
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'

import './index.css'
import App from './App.jsx'
import HomePage from './routes/HomePage.tsx'
import MainLayout from './layout/mainLayout.tsx'
import Blogs from './routes/Blogs.tsx'
import About from './routes/About.tsx'
import SinglePostPage from './routes/SinglePostPage.tsx'
import Write from './routes/Write.tsx'
  import { ToastContainer, toast } from 'react-toastify';


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}
const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:<HomePage />
      },
      {
        path:'/blogs',
        element:<Blogs />
      },
      {
path:'/blogs/:slug',
element:<SinglePostPage />
      },
      {
        path:'/about',
        element:<About />
      },
      {
        path:'/post',
        element:<Write />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
