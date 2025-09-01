import React from 'react'
import { getCookie } from '../../../apiurl/Apiurl';
import { Navigate, Outlet } from 'react-router-dom';

export function WebPrivate() {
    if (getCookie('logintoken') !== undefined && getCookie('logintoken') !== null) {
        return <Outlet />
    }
    else {
        return <Navigate to={"/sign-in"} />
    }
}
