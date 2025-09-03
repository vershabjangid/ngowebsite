import React, { useState } from 'react'
import { Logo } from '../../../common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl } from '../../../apiurl/Apiurl'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Loader } from '../../../common/Loader'


export function Register() {
    let labelname = ["Email Address", "Mobile Number", "Password"]
    let inputname = ["Email", "Phone", "Password"]
    let inputtype = ["email", "number", "password"]
    let [loader, setloader] = useState(false)
    let [eye, seteye] = useState(false)



    let formik = useFormik({
        initialValues: {
            Email: "",
            Phone: "",
            Password: ""
        },
        validationSchema: Yup.object().shape({
            Email: Yup.string().email("Invalid Email").required("Email is required"),
            Phone: Yup.number().min(5000000000, "Invalid Number").max(9999999999, "Invalid Number").required("Phone number is required"),
            Password: Yup.string().required("Password is required")
        }),
        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();

    let insertdata = (value) => {
        try {
            apiurl.post('/user/register', value)
                .then((res) => {
                    if (res.data.Status === 1) {
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
                                    <div className='w-[200px] mb-4  m-auto'>
                                        <Logo />
                                    </div>
                                    <h1 className='text-[30px] font-[600] text-center'>Sign Up</h1>
                                    <p className='text-center mb-[40px]'>Please enter your details to Sign Up</p>

                                </div>
                                <form action="" className='w-[100%]' onSubmit={formik.handleSubmit}>
                                    {
                                        inputname.map((items, index) => {
                                            return (
                                                <div key={index} className='register_form_section w-[100%] mt-[15px]'>
                                                    <label className='text-[15px] font-[600]'>{labelname[index]}</label>
                                                    {
                                                        inputtype[index] === "password" ?
                                                            <section className='relative'>
                                                                <input type={eye ? "text" : inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 pe-[50px] rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                <div className='absolute top-[50%] text-[20px] translate-y-[-50%] right-[20px]'>
                                                                    {
                                                                        eye ? <FaEyeSlash onClick={() => seteye(false)} className=' cursor-pointer' />
                                                                            :
                                                                            <FaEye onClick={() => seteye(true)} className=' cursor-pointer' />
                                                                    }
                                                                </div>
                                                            </section>
                                                            :
                                                            <input type={inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                    }
                                                    <div className='text-[red] mt-[5px]'>
                                                        {
                                                            inputname[index] === "Email" ?
                                                                formik.errors.Email :
                                                                inputname[index] === "Phone" ?
                                                                    formik.errors.Phone :
                                                                    inputname[index] === "Password" ?
                                                                        formik.errors.Password :
                                                                        null
                                                        }
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                    <div className='mt-[15px]'>
                                        <button className='border-[1px] border-[black] w-[100%] p-1 py-2 mt-1 rounded-[10px] text-white bg-[black] font-[600]'>
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                                <p className='mt-4 text-center font-[500]'>
                                    Already have an account? <Link to={"/sign-in"} className='font-[600]'>Sign In</Link>
                                </p>
                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
