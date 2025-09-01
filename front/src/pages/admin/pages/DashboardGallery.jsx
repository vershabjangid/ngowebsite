import React from 'react'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { IoMdPhotos } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { DashAddGalleryBanner } from './dashboard gallery/add/DashAddGalleryBanner'


export function DashboardGallery() {
    let formik = useFormik({
        initialValues: {
            Gallery_Event_Heading: "",
            Gallery_Event_Description: "",
            Gallery_Event_Image: ""
        },

        validationSchema: Yup.object().shape({
            Gallery_Event_Heading: Yup.string().required("Event name is required"),
            Gallery_Event_Description: Yup.string().required("Event description is required"),
            Gallery_Event_Image: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Event image is required")
        }),

        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-gallery', toFormData(value), {
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
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <IoMdPhotos />
                                <h1 className='font-[600] ms-2'>
                                    Gallery
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Gallery</span></p>
                            </div>
                        </section>
                        <DashAddGalleryBanner/>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey]'> Home Add Gallery</p>

                            <section className='w-[100%] '>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[48%]'>
                                            <label htmlFor="">
                                                Event Name
                                            </label>

                                            <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Heading', e.target.value)} />
                                            <div className='text-[#ff6780]'>
                                                {formik.errors.Gallery_Event_Heading}
                                            </div>
                                        </div>

                                        <div className='w-[48%]'>
                                            <label htmlFor="">
                                                Event Description
                                            </label>

                                            <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Description', e.target.value)} />
                                            <div className='text-[#ff6780]'>
                                                {formik.errors.Gallery_Event_Description}
                                            </div>
                                        </div>
                                    </div>


                                    <div className='w-[100%] flex justify-between my-[10px]'>


                                        <div className='w-[48%]'>
                                            <label htmlFor="">
                                                Event Image
                                            </label>

                                            <input type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Image', e.target.files[0])} />
                                            <div className='text-[#ff6780]'>
                                                {formik.errors.Gallery_Event_Image}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-between mt-[20px]'>
                                        <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                            Submit
                                        </button>

                                        <Link to={"/view-gallery"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                            View Data
                                        </Link>
                                    </div>
                                </form>
                            </section>
                        </section>


                        <Toaster />
                    </section>
                </section>
            </section>
        </>
    )
}
