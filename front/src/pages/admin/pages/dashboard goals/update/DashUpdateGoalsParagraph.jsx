import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import { GoGoal } from 'react-icons/go'
import { Loader } from '../../../../../common/Loader'

export function DashUpdateGoalsParagraph() {
    let location = useLocation()
    let data = location.state
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            _id: "",
            Home_Card_Content_Id: "",
            Home_Card_Content_Heading: "",
            Home_Card_Content_Paragraph: "",
        },


        onSubmit: (value, { resetForm }) => {
            formik.values._id = data._id
            insertdata(formik.values)
            setloader(true)
            resetForm({
                _id: "",
                Home_Card_Content_Id: "",
                Home_Card_Content_Heading: "",
                Home_Card_Content_Paragraph: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)


    let navigate = useNavigate()
    let insertdata = (value) => {
        try {
            apiurl.put('/admin/update-goals-card-paragraph', toFormData(value), {
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


    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [homecardheadingdata, sethomecardheadingdata] = useState([])
    let [filterhomecardheadingdata, setfilterhomecardheadingdata] = useState([])

    let fetchall = async () => {
        try {
            let [homecarddata, homegoalscardheadingdata] = await Promise.all([
                apiurl.get('/admin/view-goals-card'),
                apiurl.get('/admin/view-goals-paragraph-heading')
            ])

            return {
                homecardheading: homecarddata.data.viewdata,
                homegoalscardheading: homegoalscardheadingdata.data.viewdata
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    let viewdata = () => {
        try {
            fetchall()
                .then((res) => {
                    sethomegoalscarddata(res.homecardheading)
                    sethomecardheadingdata(res.homegoalscardheading)
                    setfilterhomecardheadingdata(res.homegoalscardheading)
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


    let filterheading = (values) => {
        if (filterhomecardheadingdata.length !== 0 || homecardheadingdata.length !== 0) {
            sethomecardheadingdata(filterhomecardheadingdata.filter((e) => e.Home_Card_Id.includes(values)))
        }
        else {
            sethomecardheadingdata([
                {
                    Home_Card_Paragraph_Heading: "No Data Found"
                }
            ])
        }
    }

    return (
        <>
            {
                loader ?
                    <Loader />
                    :
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
                                        <p>Dashboard / Goals / Home Goals Cards / <span className='text-[#1385ff]'>Update Goals Paragraph</span></p>
                                    </div>
                                </section>

                                <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                    <p className='font-[600] text-[grey]'> Home Update Goals Paragraph</p>


                                    <section className='w-[100%] '>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className='w-[100%] flex justify-between my-[10px]'>
                                                <div className='w-[48%]'>
                                                    <label className='font-[600]' htmlFor="choosecard">
                                                        Choose Card
                                                    </label>

                                                    <select id="choosecard" defaultValue={data.Home_Card_Content_Id} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Id', e.target.value) && filterheading(e.target.value)} >
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
                                                    <div className='text-[#ff6780]'>
                                                        {formik.errors.Home_Card_Content_Id}
                                                    </div>
                                                </div>


                                                <div className='w-[48%]'>
                                                    <label className='font-[600]' htmlFor="contentheading">
                                                        Content  Heading
                                                    </label>

                                                    <select id='contentheading' defaultValue={data.Home_Card_Content_Heading} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Heading', e.target.value)} >
                                                        <option>Choose Option</option>
                                                        {
                                                            homecardheadingdata.length === 0 ?
                                                                <option value="">No Data Found</option> :
                                                                <>
                                                                    <option value="">Choose Option</option>
                                                                    {
                                                                        homecardheadingdata.map((items, index) => {
                                                                            return (
                                                                                <option key={index} value={items._id}>{items.Home_Card_Paragraph_Heading}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                        }
                                                    </select>
                                                    <div className='text-[#ff6780]'>
                                                        {formik.errors.Home_Card_Content_Heading}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='w-[100%] flex justify-between my-[10px]'>
                                                <div className='w-[48%]'>
                                                    <label className='font-[600]' htmlFor="cardparagraph">
                                                        Card Paragraph
                                                    </label>

                                                    <input id='cardparagraph' autoComplete='true' type="text" defaultValue={data.Home_Card_Content_Paragraph} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Paragraph', e.target.value)} />
                                                </div>
                                            </div>

                                            <div className='w-[100%] flex justify-between mt-[20px]'>
                                                <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
            }
            <Toaster />
        </>
    )
}
