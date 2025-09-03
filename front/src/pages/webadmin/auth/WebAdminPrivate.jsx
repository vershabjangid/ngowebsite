import React, { useEffect, useState } from 'react'
import { apiurl, getCookie } from '../../../apiurl/Apiurl';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../../../common/Loader';

export default function WebAdminPrivate() {

    let [loader, setloader] = useState(false)
    let checksession = () => {
        try {
            apiurl.post('/admin/check-web-admin-session')
                .then((res) => {
                    if (res.data.Status === 1) {
                        console.log(res.data.Message)
                    }
                    else {
                        document.cookie = 'admintoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        window.location.reload()
                    }
                    setloader(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checksession()
    }, [])


    if (getCookie('admintoken') !== undefined && getCookie('admintoken') !== null) {
        return (
            <>
                {
                    loader ?
                        <Loader />
                        :
                        <Outlet />
                }
            </>
        )
    }
    else {
        return (
            <>
                {
                    loader ?
                        <Loader />
                        :
                        <Navigate to={"/dash-login"} />
                }
            </>
        )
    }
}
