import React, { useEffect } from 'react'
import { apiurl, getCookie } from '../../../apiurl/Apiurl';
import { Navigate, Outlet } from 'react-router-dom';

export function AdminPrivate() {
    let checksession = () => {
        try {
            apiurl.post('/admin/check-admin-session')
                .then((res) => {
                    if (res.data.Status === 1) {
                        console.log(res.data.Message)
                    }
                    else {
                        document.cookie = 'admintoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

    useEffect(() => {
        checksession()
    }, [])


    if (getCookie('admintoken') !== undefined && getCookie('admintoken') !== null) {
        return <Outlet />
    }
    else {
        return <Navigate to={"/admin-login"} />
    }
}
