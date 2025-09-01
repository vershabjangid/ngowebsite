import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { IoNewspaperOutline } from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'

export function DashViewContactBanner() {
    let [imgurl, setimgurl] = useState([])
    let [aboutdata, setaboutdata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-contact-banner')
                .then((res) => {
                    setaboutdata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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
        viewdata()
    }, [])

    // /update-about-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState(null)

    let formik = useFormik({
        initialValues: {
            _id: "",
            Contact_Banner_Heading: "",
            Contact_Banner_Description: "",
            Contact_Banner_Image: ""
        },
        onSubmit: () => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-contact-banner', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                        setupdatemodal(false)
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
                updatemodal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                        <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                            <div className=' border-b-[1px] border-[black] pb-1'>
                                <h3 className='text-[25px] font-[600]'>Update Contact Banner</h3>
                            </div>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerheading">
                                                Contact Banner Heading
                                            </label>

                                            <input maxLength={100} defaultValue={updatemodaldata.Contact_Banner_Heading} id='homebannerheading' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Contact_Banner_Heading', e.target.value)} />
                                        </div>

                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                Contact Banner Description
                                            </label>
                                            <input maxLength={300} id='homebannerdescription' defaultValue={updatemodaldata.Contact_Banner_Description} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Contact_Banner_Description', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homeimage">
                                                Contact Banner
                                            </label>

                                            <input id='homeimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Contact_Banner_Image', e.target.files[0])} />
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-end mt-[20px]'>
                                        <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                            Submit
                                        </button>

                                        <button className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setupdatemodal(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </section>
                    :
                    null
            }


            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaPhoneAlt />
                                <h1 className='font-[600] ms-2'>
                                    Contact Us
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#000000]'>Contact Us</span> / <span className='text-[#1385ff]'> Contact Banner Section</span></p>
                            </div>
                        </section>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey] mb-[20px]'> Contact Banner Section</p>

                            {
                                aboutdata === null ?
                                    <div className='text-center font-[600] text-[grey]'>
                                        No Data Found
                                    </div>

                                    :
                                    aboutdata.map((items, index) => {
                                        return (
                                            <section className='mb-[50px]' key={index}>
                                                <section className=''>

                                                    <section key={index} className='home_about_us w-[100%] py-[20px] px-[20px] flex'>
                                                        <section className='w-[30%] flex justify-center items-center'>
                                                            <section className='w-[300px]'>
                                                                <img src={imgurl + items.Contact_Banner_Image} alt="" className='w-[100%]' />
                                                            </section>
                                                        </section>
                                                        <section className='w-[70%] uppercase'>
                                                            <h2 className='home_heading text-[30px] font-[700]'>
                                                                {items.Contact_Banner_Heading}
                                                            </h2>
                                                            <p className='text-justify my-[10px] mb-[20px] leading-[25px]'>
                                                                {items.Contact_Banner_Description}
                                                            </p>
                                                        </section>
                                                    </section>


                                                    <div>
                                                        <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)}>
                                                            Update
                                                        </button>
                                                    </div>
                                                </section>

                                            </section>
                                        )
                                    })
                            }


                        </section>
                    </section>
                </section>
            </section>
            <Toaster />
        </>
    )
}
