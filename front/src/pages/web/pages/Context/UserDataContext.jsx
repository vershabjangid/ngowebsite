import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'
import { Loader } from '../../../../common/Loader';
export const UserContext = createContext();

export function UserDataContext(props) {
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let [loader, setloader] = useState(false)
    const [user, setUser] = useState({ Id: null });

    let fetch = async () => {
        try {
            let [userdata] = await Promise.all([
                apiurl.get('/user/view-profile', {
                    headers: {
                        Authorization: getCookie('logintoken')
                    }
                })
            ])
            return {
                userdatas: userdata.data
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    let finalfetch = () => {
        fetch()
            .then((res) => {
                if (res.userdatas.Status !== 2) {
                    setUser([res.userdatas.viewdata, res.userdatas.viewregister, res.userdatas.imageurl])
                }
                else {
                    setUser([res.userdatas.viewdata, res.userdatas.viewregister])
                    notificationerror(res.userdatas.Message)
                    navigate('/membership')
                }
                setloader(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        finalfetch()
        setloader(true)
    }, [])

    return (
        <>
            <UserContext.Provider value={{ user }}>
                {
                    loader ?
                        <Loader /> :
                        <>
                            {props.children}
                            < Outlet />
                        </>
                }
            </UserContext.Provider>
        </>
    )
}
