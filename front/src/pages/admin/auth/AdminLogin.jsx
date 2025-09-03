import React, { useState } from 'react'
import { Logo } from '../../../common/Logo'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { apiurl } from '../../../apiurl/Apiurl'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader'

export function AdminLogin() {

    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid Email").required("Email is required"),
            Password: Yup.string().required("Password is required")
        }),

        onSubmit: (value, { resetForm }) => {
            fetchapi(formik.values)
            resetForm({
                Email: "",
                Password: ""
            })
            setloader(true)
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    let navigate = useNavigate()

    let fetchapi = (value) => {
        try {
            apiurl.post('/admin/admin-login', value)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        document.cookie = `admintoken=${res.data.Token}`
                        navigate('/dash-home')
                    }
                    else {
                        notificationerror(res.data.Message)
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
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] h-[100vh] border-[1px] border-[black] bg-[#ffffff] flex justify-center items-center'>
                        <section className='w-[400px] border-[1px] border-[black] p-[10px] rounded-[10px]'>
                            <div className='w-[200px] mb-4  m-auto'>
                                <Logo />
                            </div>
                            <div className='text-center mb-[20px]'>
                                <h1 className='text-[30px] font-[700]'>
                                    Developer Login
                                </h1>
                                <p>
                                    Welcome admin please enter your details to login
                                </p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label className='font-[600]' htmlFor="AdminLoginEmail">
                                        Email
                                    </label>
                                    <input id='AdminLoginEmail' autoComplete='true' type="email" className=' border-[1px] border-[black] w-[100%] p-2 rounded-[10px]' onChange={(e) => formik.setFieldValue('Email', e.target.value)} />
                                    <div className='text-[red]'>
                                        {formik.errors.Email}
                                    </div>
                                </div>

                                <div className='my-[10px]'>
                                    <label className='font-[600]' htmlFor="AdminLoginPassword">
                                        Password
                                    </label>
                                    <input id='AdminLoginPassword' autoComplete='true' type="password" className=' border-[1px] border-[black] w-[100%] p-2 rounded-[10px]' onChange={(e) => formik.setFieldValue('Password', e.target.value)} />
                                    <div className='text-[red]'>
                                        {formik.errors.Password}
                                    </div>
                                </div>

                                <div>
                                    <button className='text-[white] mt-3 border-[1px] border-[black] bg-[black] w-[100%] p-2 rounded-[10px]' >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </section>
                    </section>
            }
            <Toaster />

        </>
    )
}
