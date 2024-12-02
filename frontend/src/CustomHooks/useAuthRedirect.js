import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthRedirect = (redirectPath = '/') => {
    const navigate = useNavigate()

    const url = import.meta.env.VITE_PRODUCTION === "true" ? import.meta.env.VITE_PRODUCTION_BACKEND_URL : import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token')

            // If no token, redirect to login
            if (!token) {
                navigate(redirectPath)
                return
            }

            try {
                const response = await fetch(`${url}/api/users/checkToken`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (response.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    const data = await response.json()
                    console.log(data.message)
                }
            } catch (error) {
                console.error('Error checking token:', error)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        // Call the token check function on component mount
        checkTokenValidity()
    }, [navigate, redirectPath])
}

export default useAuthRedirect
