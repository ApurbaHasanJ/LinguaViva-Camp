import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/GRoutes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Providers/AuthProvider'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <HelmetProvider>
   <AuthProvider>
   <RouterProvider router={router} />
   <Toaster/>
   </AuthProvider>
   </HelmetProvider>
  </React.StrictMode>,
)
