import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import { FaHome } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { Loader } from '../../../../../common/Loader'

export function DashViewHomeAbout() {
    let [imgurl, setimgurl] = useState([])
    let [aboutdata, setaboutdata] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-home-about-banner')
                .then((res) => {
                    setaboutdata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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
        viewdata()
        setloader(true)
    }, [])

    // /update-home-about-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState(null)

    let formik = useFormik({
        initialValues: {
            _id: "",
            Home_About_Heading: "",
            Home_About_Description: "",
            Home_About_Image: ""
        },
        onSubmit: (value, { resetForm }) => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
            resetForm({
                _id: "",
                Home_About_Heading: "",
                Home_About_Description: "",
                Home_About_Image: ""
            })
            setloader(true)
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let updatedata = (value) => {

        try {
            apiurl.put('/admin/update-home-about-banner', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setupdatemodal(false)
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
                    <>
                        {
                            updatemodal ?
                                <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                                    <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                                        <div className=' border-b-[1px] border-[black] pb-1'>
                                            <h3 className='text-[25px] font-[600]'>Home About Section</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label htmlFor="homeaboutbannerheading">
                                                            Home About Heading
                                                        </label>

                                                        <input autoComplete='true' id='homeaboutbannerheading' maxLength={100} defaultValue={updatemodaldata.Home_About_Heading} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Heading', e.target.value)} />
                                                        <div className='text-[#ff6780]'>
                                                            {formik.errors.Home_Banner_Heading}
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label htmlFor="homeaboutbannerdescription">
                                                            Home About Description
                                                        </label>
                                                        <input autoComplete='true' id='homeaboutbannerdescription' defaultValue={updatemodaldata.Home_About_Description} maxLength={500} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Description', e.target.value)} />
                                                        <div className='text-[#ff6780]'>
                                                            {formik.errors.Home_Banner_Description}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label htmlFor="homeaboutimage">
                                                            Home About Image
                                                        </label>

                                                        <input id='homeaboutimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_About_Image', e.target.files[0])} />
                                                        <div className='text-[#ff6780]'>
                                                            {formik.errors.Home_Banner_Image}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-end mt-[20px]'>
                                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                                        Submit
                                                    </button>

                                                    <div className='cursor-pointer bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setupdatemodal(false)}>
                                                        Cancel
                                                    </div>
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
                                            <FaHome />
                                            <h1 className='font-[600] ms-2'>
                                                Home About Section
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'>  Home About Section</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'>  Home About Section</p>

                                        {
                                            aboutdata === null ?
                                                <div className='text-center font-[600] text-[grey]'>
                                                    No Data Found
                                                </div>

                                                :
                                                <section className='mb-[50px]'>
                                                    <section className=''>
                                                        <section className='home_about_us w-[100%] py-[20px] px-[20px] flex'>
                                                            <section className='w-[30%] flex justify-center items-center'>
                                                                <section className='w-[300px]'>
                                                                    <img src={imgurl + aboutdata.Home_About_Image} alt="" className='w-[100%]' />
                                                                </section>
                                                            </section>
                                                            <section className='w-[70%] uppercase'>
                                                                <h2 className='home_heading text-[30px] font-[700]'>
                                                                    {aboutdata.Home_About_Heading}
                                                                </h2>
                                                                <p className='text-justify my-[10px] mb-[20px] leading-[25px]'>
                                                                    {aboutdata.Home_About_Description}
                                                                </p>
                                                            </section>
                                                        </section>

                                                        <div>
                                                            <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(aboutdata)}>
                                                                Update
                                                            </button>
                                                        </div>
                                                    </section>


                                                </section>

                                        }



                                    </section>
                                </section>
                            </section>
                        </section>
                    </>
            }
            <Toaster />
        </>
    )
}
