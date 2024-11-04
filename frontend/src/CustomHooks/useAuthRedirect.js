// useAuthRedirect.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = (redirectPath = '/') => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate(redirectPath)
        }
    }, [navigate, redirectPath])
}

export default useAuthRedirect
