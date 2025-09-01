import React, { useEffect, useState } from 'react'
import { AdminHeader } from '../../../../../common/AdminHeader'
import { FaHome } from 'react-icons/fa'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { useFormik } from 'formik'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'



export function DashViewHomeTeamMember() {
    let [aboutdata, setaboutdata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-home-team')
                .then((res) => {
                    setaboutdata(res.data.viewdata)
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

    // /update-home-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState(null)

    let formik = useFormik({
        initialValues: {
            _id: "",
            Home_Team_Member_Heading: "",
            Home_Team_Member_Description: ""
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
            apiurl.put('/admin/update-home-team', toFormData(value), {
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
                                <h3 className='text-[25px] font-[600]'>Update Slide</h3>
                            </div>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerheading">
                                                Home Team Heading

                                            </label>

                                            <input defaultValue={updatemodaldata.Home_Team_Member_Heading} id='homebannerheading' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Member_Heading', e.target.value)} />

                                        </div>

                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                Home Team Description

                                            </label>
                                            <input id='homebannerdescription' defaultValue={updatemodaldata.Home_Team_Member_Description} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Member_Description', e.target.value)} />

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
                                <FaHome />
                                <h1 className='font-[600] ms-2'>
                                    Home Team Content
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'> Home Team Content</span></p>
                            </div>
                        </section>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey] mb-[20px]'> Home Team Content</p>
                            {
                                aboutdata === null ?
                                    <div className='text-center font-[600] text-[grey]'>
                                        No Data Found
                                    </div>

                                    :
                                    <section className='mb-[50px]'>
                                        <section className=''>
                                            <section className='home_about_us w-[100%] py-[20px] px-[20px] flex'>
                                                <section className='w-[100%] uppercase'>
                                                    <h2 className='home_heading text-[30px] font-[700]'>
                                                        {aboutdata.Home_Team_Member_Heading}
                                                    </h2>
                                                    <p className='text-justify my-[10px] mb-[20px] leading-[25px]'>
                                                        {aboutdata.Home_Team_Member_Description}
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
            <Toaster />
        </>
    )
}
