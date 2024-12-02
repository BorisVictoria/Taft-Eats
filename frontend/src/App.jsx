import React from 'react'
import './App.css'
import AuthForm from '@/components/Auth'
import Home from '@/components/Home'
import SearchResult from './components/Search'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from './components/ViewProfile'
import RestaurantAuth from './components/RestaurantAuth'
import RestaurantRegistration from './components/RestaurantRegistration'

function App() {


    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<AuthForm />} />
                <Route path='/search' element={<SearchResult />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path="/restaurants/:id" element={<RestaurantAuth />} />
                <Route path="/restaurant-register/" element={<RestaurantRegistration />} />

            </Routes>
        </Router>
    )
}

export default App
