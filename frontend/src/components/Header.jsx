import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/shadcn/input'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
import { Link, useNavigate } from 'react-router-dom'

const url = import.meta.env.VITE_PRODUCTION === "true" ? import.meta.env.VITE_PRODUCTION_BACKEND_URL : process.env.VITE_BACKEND_URL

const Header = () => {
    const [query, setQuery] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('Guest') // Default value for username
    const [avatarUrl, setAvatarUrl] = useState('/placeholder-user.jpg') // Default avatar
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    
    const fetchUserData = async () => {
        if (!userId) return

        try {
            const response = await fetch(`${url}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }

            const data = await response.json()
            setUsername(data.username)
            setAvatarUrl(`${url}/${data.avatar}`)

            console.log('Fetched user data:', data.username, data.avatar)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!token)
            if (token) {
                fetchUserData()
            }
        }
        checkLoginStatus()
    }, [])

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        const queryValue = event.target.elements.search.value
        if (queryValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(queryValue)}`)
        }
    }

    const handleLoginClick = () => {
        if (location.pathname === '/login') {
            window.location.reload()
        } else {
            navigate('/login')
        }
    }

    const handleLogout = async () => {
        try {
            const response = await fetch(`${url}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error('Logout failed')
            }
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            setIsLoggedIn(false)
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <header className='sticky top-0 z-40 w-full bg-background shadow'>
            <div className='container flex items-center justify-between h-16 px-4 mx-auto md:px-6'>
                <Link to='/' className='text-2xl font-bold'>
                    Taft Eats
                </Link>
                <form onSubmit={handleSearchSubmit} className='relative flex-1 max-w-md'>
                    <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                    <Input
                        name='search'
                        type='search'
                        placeholder='Search for restaurants...'
                        className='w-full pl-10 pr-4 rounded-md bg-white focus:outline-none'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                {isLoggedIn ? (
                    <ProfileDropdown onLogout={handleLogout} avatarUrl={avatarUrl} username={username} />
                ) : (
                    <Link to='/login' className='text-primary hover:underline' onClick={handleLoginClick}>
                        Log In
                    </Link>
                )}
            </div>
        </header>
    )
}

const SearchIcon = (props) => (
    <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
    >
        <circle cx='11' cy='11' r='8' />
        <path d='m21 21-4.3-4.3' />
    </svg>
)

export default Header