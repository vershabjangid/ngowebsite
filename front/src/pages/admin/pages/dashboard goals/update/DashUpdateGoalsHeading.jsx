import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import { GoGoal } from 'react-icons/go'

export function DashUpdateGoalsHeading() {
    let location = useLocation()
    let data = location.state

    let formik = useFormik({
        initialValues: {
            _id: "",
            Home_Card_Id: "",
            Home_Card_Paragraph_Heading: "",
        },

        onSubmit: () => {
            formik.values._id = data._id
            updateparagraphdata(formik.values)
        }
    })




    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let navigate = useNavigate()
    let updateparagraphdata = (value) => {
        try {

            apiurl.put('/admin/update-goals-paragraph-heading', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate('/view-home-paragraph-heading')
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




    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-goals-card')
                .then((res) => {
                    sethomegoalscarddata(res.data.viewdata)
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


    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />


                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <GoGoal />
                                <h1 className='font-[600] ms-2'>
                                    Goals
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / Goals / Home Goals Cards / <span className='text-[#1385ff]'>Update Goals Paragraph Heading</span></p>
                            </div>
                        </section>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey]'> Home Update Goals Paragraph Heading</p>

                            <section className='w-[100%] '>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[48%]'>
                                            <label htmlFor="">
                                                Choose Card
                                            </label>

                                            <select defaultValue={data.Home_Card_Id} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Id', e.target.value)} >
                                                <option>Choose Option</option>
                                                {
                                                    homegoalscarddata.length === 0 ?
                                                        null :
                                                        homegoalscarddata.map((items, index) => {
                                                            return (
                                                                <option key={index} value={items._id}>{items.Home_Goals_Heading}</option>
                                                            )
                                                        })
                                                }
                                            </select>
                                        </div>


                                        <div className='w-[48%]'>
                                            <label htmlFor="">
                                                Content  Heading
                                            </label>

                                            <input defaultValue={data.Home_Card_Paragraph_Heading} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Paragraph_Heading', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-between mt-[20px]'>
                                        <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </section>
                    </section>

                </section>
            </section>
            <Toaster />
        </>
    )
}
