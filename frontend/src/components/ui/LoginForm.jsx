import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/shadcn/label'
import { Input } from '@/components/ui/shadcn/input'
import { Button } from '@/components/ui/shadcn/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ isFlipped, setIsFlipped }) => {
    const initialFormData = {
        loginUsername: '',
        loginPassword: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const url = import.meta.env.VITE_PRODUCTION === "true" ? import.meta.env.VITE_PRODUCTION_BACKEND_URL : import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prevData) => ({ ...prevData, [id]: value }))
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevVisible) => !prevVisible)
    }

    const triggerLogin = async (link) => {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.loginUsername,
                password: formData.loginPassword
            }),
            credentials: 'include'
        })

        return response
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            let response = await triggerLogin(`${url}/api/users/login`)


            if (!response.ok) {
                response = await triggerLogin(`${url}/api/restaurants/login`)
                
                if(!response.ok){
                    const data = await response.json()
                    throw new Error(data.message || 'Login failed')           
                } else {
                    const data = await response.json()

                    localStorage.setItem('token', data.token)
                    localStorage.setItem('restaurantId', data.userId)
                    navigate(`/restaurants/${data.userId}`)          
                }
            } else {
                const data = await response.json()

                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.userId)
                navigate('/profile')
            }


        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
    }, [])

    return (
        <motion.div
            className={`absolute w-full h-full backface-hidden ${!isFlipped ? 'hidden' : ''} mt-20`}
            style={{ transform: 'rotateY(180deg)' }}
        >
            <div className='bg-white p-8 rounded-xl  space-y-6'>
                <h1 className='text-3xl font-bold text-center text-primary'>Log In</h1>

                {error && (
                    <div className='rounded-md bg-red-50 p-4 text-sm text-red-800 mt-4'>
                        <div className='flex'>
                            <div className='flex-shrink-0'>
                                <CircleIcon className='h-5 w-5 text-red-400' />
                            </div>
                            <div className='ml-3'>
                                <h3 className='text-sm font-medium'>Incorrect username or password</h3>
                                <div className='mt-2 text-sm'>Please check your username and password and try again.</div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='loginUsername' className='block text-sm font-medium'>
                            Username
                        </Label>
                        <Input id='loginUsername' required className='w-full' onChange={handleInputChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='loginPassword' className='block text-sm font-medium'>
                            Password
                        </Label>
                        <div className='relative'>
                            <Input
                                id='loginPassword'
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                className='w-full pr-10'
                                onChange={handleInputChange}
                            />
                            <button
                                type='button'
                                onClick={togglePasswordVisibility}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            >
                                {passwordVisible ? (
                                    <EyeOffIcon className='h-5 w-5 text-gray-400' />
                                ) : (
                                    <EyeIcon className='h-5 w-5 text-gray-400' />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button type='submit' className='w-full'>
                        Log In
                    </Button>
                </form>
                <p className='text-center text-sm'>
                    Don't have an account?{' '}
                    <button
                        onClick={() => {
                            setFormData(initialFormData)
                            setIsFlipped(false)
                        }}
                        className='text-primary hover:underline focus:outline-none'
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </motion.div>
    )
}

function CircleIcon(props) {
    return (
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
            <circle cx='12' cy='12' r='10' />
        </svg>
    )
}

export default LoginForm
