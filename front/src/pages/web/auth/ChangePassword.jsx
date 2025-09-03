import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Logo } from '../../../common/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Loader } from '../../../common/Loader'

export function ChangePassword() {
    let labelname = ["PASSWORD", "CONFIRM PASSWORD"]
    let placeholder = ["Password", "Confirm Password"]
    let inputname = ["Password", "Confirm_Password"]
    let inputtype = ["password", "password"]
    let [loader, setloader] = useState(false)
    let [eye, seteye] = useState(false)
    let location = useLocation();
    let data = location.state
    let formik = useFormik({
        initialValues: {
            Email: data,
            Password: "",
            Confirm_Password: ""
        },
        onSubmit: (values, { resetForm }) => {
            if (values.Password === values.Confirm_Password) {
                setloader(true)
                insertdata(formik.values)
                resetForm({
                    Email: "",
                    Password: "",
                    Confirm_Password: "",
                })
            }
            else {
                notificationerror("Fields Must Be Same")
            }
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();

    let insertdata = (value) => {
        try {
            apiurl.put('/user/change-password', value, {
                headers: {
                    Authorization: getCookie('forgottoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        document.cookie = "forgottoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate("/")
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
                    <section className='login_main w-[100%] h-[100vh] flex p-2'>
                        <section className='login_banner w-[50%] bg-white rounded-[10px]'>
                        </section>
                        <section className='login_right w-[50%] h-[100%] bg-white flex justify-center items-center flex-col overflow-y-scroll pb-4'>
                            <div className='w-[90%]'>
                                <div className='w-[100%]'>
                                    <div className='w-[200px] m-auto mb-4'>
                                        <Logo />
                                    </div>
                                    <h1 className='text-[30px] font-[600] text-center'>New Password</h1>
                                    <p className='text-center mb-[20px]'>Please enter your new password and </p>

                                </div>

                                <form onSubmit={formik.handleSubmit} className=' w-[100%] flex items-center flex-col'>
                                    {
                                        inputname.map((items, index) => {
                                            return (
                                                <div key={index} className='login_form_section w-[80%] mt-[15px]'>
                                                    <label htmlFor={`changeinput${index}`} className='text-[15px] font-[600]'>{labelname[index]}</label>
                                                    {
                                                        inputtype[index] === "password" ?
                                                            <section className='relative'>
                                                                <input id={`changeinput${index}`} type={eye ? "text" : inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                <div className='absolute top-[50%] text-[20px] translate-y-[-50%] right-[20px]'>
                                                                    {
                                                                        eye ? <FaEyeSlash onClick={() => seteye(false)} className=' cursor-pointer' />
                                                                            :
                                                                            <FaEye onClick={() => seteye(true)} className=' cursor-pointer' />
                                                                    }
                                                                </div>
                                                            </section>
                                                            :
                                                            <input id={`changeinput${index}`} type={inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                    }
                                                </div>
                                            )
                                        })
                                    }


                                    <div className='w-[80%] mt-[20px]'>
                                        <button type='submit' className='w-[100%] bg-[black] text-[white] text-[18px] font-[500] py-3 rounded-[10px]'>CHANGE PASSWORD</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
