import React, { useEffect } from 'react'
import { FaCircleCheck } from 'react-icons/fa6';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../context/authContext';

function ToastNotification() {

    const { notification, setNotification } = useAuth()

    useEffect(() => {
        const id = setTimeout(() => {
            setNotification(null)
        }, 2000)
        return () => clearTimeout(id)
    }, [])

    return (
        <div className='w-full fixed top-10 left-1/2 transform -translate-x-1/2 z-[999] flex items-center justify-center'>

            <div className={`${notification?.type == "error" ? "bg-red-100  shadow-red-100" : "bg-green-100  shadow-green-100"} text-sm animate-slide-down flex gap-3 items-center justify-center max-w-[310px]  p-2 py-2
         border-2 border-white rounded-lg shadow-md`}>
                <div className={`rounded-md min-w-8 min-h-8 ${notification?.type == "error" ? "bg-red-600" : "bg-green-600"}  flex items-center justify-center text-white`}>{notification?.type == "success" ? <FaCircleCheck /> : <FaExclamationTriangle />}</div>
                <p className='text-base'> {notification?.msg}</p>
            </div>
        </div>
    )
}

export default ToastNotification