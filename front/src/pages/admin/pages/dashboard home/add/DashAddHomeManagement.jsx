import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import toast from 'react-hot-toast'
import { toFormData } from 'axios'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { Link } from 'react-router-dom'


export function DashAddHomeManagement() {
    let formik = useFormik({
        initialValues: {
            Home_Management_Heading: "",
            Home_Management_Description: "",
        },

        validationSchema: Yup.object().shape({
            Home_Management_Heading: Yup.string().required("Home management heading is required"),
            Home_Management_Description: Yup.string().required("Home management description is required"),
        }),


        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-home-management-body', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                    }
                    else {
                        notificationerror(res.data.Message)
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
            <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                <p className='font-[600] text-[grey]'> Home Our Management Body Section</p>
                <p className='my-[20px] text-[15px]'>This section allows you to showcase your management team by adding individual cards for each member. You can include both a heading and a description to introduce the team and highlight their roles, experience, or contributions.</p>

                <section className='w-[100%] '>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='w-[100%] flex justify-between my-[10px]'>
                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Home Management Heading
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Heading', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Home_Management_Heading}
                                </div>
                            </div>

                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Home Management Description
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Description', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Home_Management_Description}
                                </div>
                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between mt-[20px]'>
                            <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                Submit
                            </button>

                            <Link to={"/view-home-management"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                View Data
                            </Link>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}
