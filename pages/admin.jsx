import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LeftBar from '../features/admin/components/leftBar'
import UsersData from '../features/admin/LeftBarValues/usersData'
import MainAdmin from '../features/admin/components/mainAdmin'

export default function Admin() {

    const admin = useSelector((state)=>state.user.role)
    const navigate = useNavigate()

    useEffect(() => {
        if (admin !== 'admin') {
            // Use navigate('*') to trigger the wildcard route for error handling
            navigate('*');
        }
    }, [admin, navigate]);//!Update Mount when its updated it takes array of dependecies if its regular mount it dosent take any dependecies only empty 


    if (admin === 'admin') {
        return (
            <>
            <div className='flex'>
                <MainAdmin className='w-1/2' />
            </div>
            </>
        );
    } else {
        return null
    }

}
