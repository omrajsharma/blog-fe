import React from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import IndexPage from './pages/IndexPage'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:postId' element={<PostDetail />} />
        <Route path='/edit/:postId' element={<EditPost />} />
      </Route>
    </Routes>
  )
}

export default App
