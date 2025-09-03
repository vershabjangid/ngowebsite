import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RxExit } from 'react-icons/rx'
import { apiurl, getCookie } from '../apiurl/Apiurl'
import { useNavigate } from 'react-router-dom'
import { Loader } from './Loader'

export function AdminHeader() {

    let [logout, setlogout] = useState(false)
    let navigate = useNavigate()
    let [loader, setloader] = useState(false)
    let insertdata = (value) => {
        setloader(true)
        try {
            apiurl.post('/admin/admin-logout', value, {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    setloader(false)
                    if (res.data.Status === 1) {
                        navigate('/admin-login')
                    }
                    else {
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                loader ?
                    <Loader /> :
                    <header className='w-[100%] p-2 flex items-center justify-end bg-[#eeeeee]'>
                        <div className=''></div>
                        <div className=' relative'>
                            <div className='w-[50px] h-[50px] rounded-[50%]  bg-[#adacac] overflow-hidden flex items-end justify-center cursor-pointer' onClick={() => setlogout(!logout)}>
                                <FaUser className='text-[35px] text-[grey]' />
                            </div>

                            {
                                logout ? <div className='w-[200px] border-[1px] bg-[white] p-3 rounded-[10px] absolute right-[10px] top-[60px] flex  items-center justify-between cursor-pointer' onClick={() => insertdata()}>
                                    <p className='text-[18px] font-[600]'>
                                        Logout
                                    </p>

                                    <RxExit />
                                </div> : null
                            }
                        </div>
                    </header>
            }
        </>
    )
}
