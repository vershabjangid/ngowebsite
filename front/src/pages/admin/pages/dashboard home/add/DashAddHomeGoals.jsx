import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { toFormData } from 'axios'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { Link } from 'react-router-dom'
import { Loader } from '../../../../../common/Loader'

export function DashAddHomeGoals() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_Goals_Heading: "",
            Home_Goals_Description: "",
        },

        validationSchema: Yup.object().shape({
            Home_Goals_Heading: Yup.string().required("Home goals heading is required"),
            Home_Goals_Description: Yup.string().required("Home goals description is required"),
        }),


        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Home_Goals_Heading: "",
                Home_Goals_Description: "",
            })
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-home-goals', toFormData(value), {
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
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'> Home Goals Section</p>
                        <p className='my-[20px] text-[15px]'>This section allows you to add a heading and a short paragraph to highlight your main goals. Use it to share your mission or focus areas. If you want to display goal cards on the homepage, you can add them through the Goals option.</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homegoalsheading">
                                            Home Goals Heading
                                        </label>

                                        <input id='homegoalsheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Goals_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Goals_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homegoalsdescription" >
                                            Home Goals Description
                                        </label>

                                        <input id='homegoalsdescription' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Goals_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Goals_Description}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>


                                    <Link to={"/view-home-goals"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View Data
                                    </Link>
                                </div>
                            </form>
                        </section>
                    </section>

            }
        </>
    )
}
