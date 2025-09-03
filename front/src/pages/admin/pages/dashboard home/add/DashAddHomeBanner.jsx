import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Loader } from '../../../../../common/Loader'

export function DashAddHomeBanner() {

    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_Banner_Heading: "",
            Home_Banner_Description: "",
            Home_Banner_Image: ""
        },

        validationSchema: Yup.object().shape({
            Home_Banner_Heading: Yup.string().required("Home banner heading is required"),
            Home_Banner_Description: Yup.string().required("Home banner description is required"),
            Home_Banner_Image: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Home banner image is required")
        }),


        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Home_Banner_Heading: "",
                Home_Banner_Description: "",
                Home_Banner_Image: ""
            })
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-home-banner', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    setloader(false)
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
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'> Home Banner Slides</p>
                        <p className='my-[20px] text-[15px]'>Add home banner slides that will appear at the top of the homepage banner section. These slides are ideal for highlighting featured content, promotions, or important announcements.</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homebannerheading">
                                            Home Banner Heading
                                        </label>

                                        <input maxLength={100} id='homebannerheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homebannerdescription">
                                            Home Banner Description
                                        </label>
                                        <input id='homebannerdescription' autoComplete='true' maxLength={300} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Description}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homeimage">
                                            Home Banner Image
                                        </label>

                                        <input id='homeimage' type="file" autoComplete='true' className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Image', e.target.files[0])} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Image}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-banner-slides"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View Slides
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
