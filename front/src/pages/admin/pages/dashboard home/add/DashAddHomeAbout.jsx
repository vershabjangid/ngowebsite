import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'
export function DashAddHomeAbout() {

    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_About_Heading: "",
            Home_About_Description: "",
            Home_About_Image: ""
        },

        validationSchema: Yup.object().shape({
            Home_About_Heading: Yup.string().required("Home about banner heading is required"),
            Home_About_Description: Yup.string().required("Home about banner description is required"),
            Home_About_Image: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Home about banner image is required")
        }),


        onSubmit: (value, { resetForm }) => {
            setloader(true)
            insertdata(formik.values)
            resetForm({
                Home_About_Heading: "",
                Home_About_Description: "",
                Home_About_Image: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-home-about-banner', toFormData(value), {
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
                        <p className='font-[600] text-[grey]'> Home About Section</p>
                        <p className='my-[20px] text-[15px]'> This section is where you can share your story, mission, and what makes your business or project unique. Use this space to introduce yourself, highlight your values, and let visitors know what they can expect from you.</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homeaboutheading">
                                            Home About Heading
                                        </label>

                                        <input autoComplete='true' id='homeaboutheading' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_About_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homeaboutdescription">
                                            Home About Description
                                        </label>

                                        <input autoComplete='true' id='homeaboutdescription' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_About_Description}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homeaboutimage">
                                            Home About Image
                                        </label>

                                        <input id='homeaboutimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Image', e.target.files[0])} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_About_Image}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-about-section"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View Data
                                    </Link>
                                </div>
                            </form>
                        </section>
                    </section>
            }
            <Toaster />
        </>
    )
}
