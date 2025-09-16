import React, { useEffect, useState } from 'react'
import { Logo } from '../../../common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl } from '../../../apiurl/Apiurl'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Loader } from '../../../common/Loader'

export function Login() {

    let labelname = ["Email Address", "Password"]
    let inputname = ["Email", "Password"]
    let inputtype = ["email", "password"]
    let [loader, setloader] = useState(false)
    let [eye, seteye] = useState(false)



    let formik = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid Email").required("Email is required"),
            Password: Yup.string().required("Password is required")
        }),
        onSubmit: (values, { resetForm }) => {
            setloader(true)
            insertdata(formik.values)
            resetForm({
                Email: "",
                Password: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();
    let insertdata = (value) => {
        try {
            apiurl.post('/user/login', value)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        document.cookie = `logintoken=${res.data.Token}`
                        navigate('/user-dashboard')
                    }
                    else if (res.data.Status === 2) {
                        notificationsuccess(res.data.Message)
                        navigate(`/otp-verification`, { state: value.Email })
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


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
                                    <div className='w-[160px] mb-4 m-auto'>
                                        <Logo />
                                    </div>
                                    <h1 className='text-[30px] font-[700] text-center text-[var(--primary-color--)]'>Sign In</h1>
                                    <p className='text-center mb-[40px] font-[500]'>Please enter your details to Sign In</p>

                                </div>
                                <form action="" className='w-[100%]' onSubmit={formik.handleSubmit}>
                                    {
                                        inputname.map((items, index) => {
                                            return (
                                                <div key={index} className='register_form_section w-[100%] mt-[15px]'>
                                                    <label className='text-[15px] font-[600] text-[var(--primary-color--)]' htmlFor={items}>{labelname[index]}</label>
                                                    {
                                                        inputtype[index] === "password" ?
                                                            <section className='relative'>
                                                                <input id={items} type={eye ? "text" : inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] outline-[var(--primary-color--)] p-3 pe-[50px] rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                <div className='absolute top-[50%] text-[20px] translate-y-[-50%] right-[20px]'>
                                                                    {
                                                                        eye ? <FaEyeSlash onClick={() => seteye(false)} className=' cursor-pointer text-[var(--primary-color--)]' />
                                                                            :
                                                                            <FaEye onClick={() => seteye(true)} className=' cursor-pointer ' />
                                                                    }
                                                                </div>
                                                            </section>
                                                            :
                                                            <input id={items} type={inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] outline-[var(--primary-color--)] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                    }
                                                    <div className='text-[red] mt-[5px]'>
                                                        {
                                                            inputname[index] === "Email" ?
                                                                formik.errors.Email :
                                                                inputname[index] === "Password" ?
                                                                    formik.errors.Password :
                                                                    null
                                                        }
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                    <div className='text-end my-6'>
                                        <Link to={"/forgot-password"} className='font-[500] text-end text-[var(--primary-color--)]'>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className='mt-[15px]'>
                                        <button type='submit' className=' w-[100%] p-1 py-2 mt-1 rounded-[10px] text-white bg-[var(--primary-color--)] font-[600]'>
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                                <p className='mt-4 text-center font-[500]'>
                                    Doesn't have an account? <Link to={"/sign-up"} className='font-[600] text-[var(--primary-color--)]'>Sign Up</Link>
                                </p>
                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
