import React from 'react'
import './App.css'
import AuthForm from '@/components/Auth'
import Home from '@/components/Home'
import SearchResult from './components/Search'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from './components/ViewProfile'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<AuthForm />} />
                <Route path='/search' element={<SearchResult />} />
                <Route path='/profile' element={<UserProfile />} />
            </Routes>
        </Router>
    )
}

export default App
