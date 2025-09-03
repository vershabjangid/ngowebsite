import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../../common/Logo'
import { useFormik } from 'formik'
import { apiurl } from '../../../apiurl/Apiurl'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Loader } from '../../../common/Loader'

export function ForgotPassword() {
    let labelname = ["EMAIL ADDRESS"]
    let placeholder = ["EMAIL ADDRESS"]
    let inputname = ["Email"]
    let inputtype = ["email"]
    let [loader, setloader] = useState(false)
    let [eye, seteye] = useState(false)
    let formik = useFormik({
        initialValues: {
            Email: ""
        },
        // /login
        onSubmit: (values, { resetForm }) => {
            setloader(true)
            insertdata(formik.values)
            resetForm({
                Email: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();

    let insertdata = (value) => {
        try {
            apiurl.post('/user/forgot-password', value)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate(`/verify-otp`, { state: value.Email })
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
                            <div className='w-[80%]'>
                                <div className='w-[100%]'>
                                    <div className='w-[160px] mb-4  m-auto'>
                                        <Logo />
                                    </div>
                                    <h1 className='text-[30px] font-[600] text-center'>Forgot Password</h1>
                                    <p className='text-center mb-[20px]'>Please enter your email to find your account</p>

                                </div>

                                <form onSubmit={formik.handleSubmit} className=' w-[100%] flex items-center flex-col'>
                                    {
                                        inputname.map((items, index) => {
                                            return (
                                                <div key={index} className='login_form_section w-[90%] mt-[15px]'>
                                                    <label className='text-[15px] font-[600]' htmlFor={`forgotinput${index}`}>{labelname[index]}</label>
                                                    {
                                                        inputtype[index] === "password" ?
                                                            <section className='relative'>
                                                                <input id={`forgotinput${index}`} autoCorrect='true' type={eye ? "text" : inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                <div className='absolute top-[50%] text-[20px] translate-y-[-50%] right-[20px]'>
                                                                    {
                                                                        eye ? <FaEyeSlash onClick={() => seteye(false)} className=' cursor-pointer' />
                                                                            :
                                                                            <FaEye onClick={() => seteye(true)} className=' cursor-pointer' />
                                                                    }
                                                                </div>
                                                            </section>
                                                            :
                                                            <input id={`forgotinput${index}`} autoCorrect='true' type={inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                    }
                                                </div>
                                            )
                                        })
                                    }


                                    <div className='w-[90%] mt-[20px]'>
                                        <button type='submit' className='w-[100%] bg-[black] text-[white] text-[18px] font-[500] py-3 rounded-[10px]'>Verify</button>
                                    </div>

                                </form>
                                <p className='mt-4 text-center font-[500]'>
                                    Doesn't have an account? <Link to={"/sign-up"} className='font-[600]'>Sign Up</Link>
                                </p>
                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
