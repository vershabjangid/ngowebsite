import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { IoIosSend } from 'react-icons/io'
import { FaXmark } from 'react-icons/fa6'
import * as Yup from 'yup'
export function DashSendPersonalNotice() {

    let [data, setdata] = useState([])
    let [filterdata, setfilterdata] = useState([])
    let [profiledata, setprofiledata] = useState([])
    let [filterprofiledata, setfilterprofiledata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-users', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    setdata(res.data.viewprofile)
                    setfilterdata(res.data.viewprofile)
                    setprofiledata(res.data.viewdata)
                    setfilterprofiledata(res.data.viewdata)
                    setimgurl(res.data.imageurl)
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


    let [sendmodal, setsendmodal] = useState(false)

    let search = (value) => {
        if (value !== null) {
            setprofiledata(filterprofiledata.filter((e) => e.Full_Name.toLowerCase().includes(value)))
        }
        else {
            setdata(filterdata)
        }
    }

    let [userdata, setuserdata] = useState([])

    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    let formik = useFormik({
        initialValues: {
            Notice_Heading: "",
            Notice_Description: "",
            Notice_Reason: "",
            Send_To: ""
        },

        validationSchema: Yup.object().shape({
            Notice_Heading: Yup.string().required("Notice heading is required"),
            Notice_Description: Yup.string().required("Notice description is required"),
            Notice_Reason: Yup.string().required("Notice reason is required"),
        }),

        onSubmit: () => {
            formik.values.Send_To = userdata
            insertdata(formik.values)
        }
    })


    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-notice', value, {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setsendmodal(false)
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
            <form onSubmit={formik.handleSubmit}>
                {
                    sendmodal ?
                        <section className='w-[100%] h-[100vh] bg-[#00000069] fixed top-0 right-0 overflow-y-scroll'>
                            <section className='w-[100%] flex justify-between mt-3 items-center pe-5'>
                                <input type="text" className='w-[95%] h-[40px] px-2 m-auto rounded-[20px]' placeholder='Search by Full Name' onChange={(e) => search(e.target.value)} />
                                <section className='w-[40px] h-[40px] bg-[white] rounded-[10px] flex justify-center items-center' onClick={() => setsendmodal(false)}>
                                    <FaXmark className=' text-[20px] text-[skyblue]' />
                                </section>
                            </section>

                            {
                                profiledata.length === 0 ?
                                    <section className=' text-center mt-5 text-white'>
                                        No Data Found
                                    </section>
                                    :
                                    profiledata.map((items, index) => {
                                        return (
                                            <section key={index}>
                                                {
                                                    data.map((value, ind) => {
                                                        return (
                                                            <section key={ind}>
                                                                {
                                                                    value._id === items.Sub_Id ?
                                                                        <section className='w-[98%] my-3 p-2 bg-[white] m-auto rounded-[10px] flex items-center justify-between'>
                                                                            <section className='flex items-center'>
                                                                                <section className='w-[35px] h-[35px]  rounded-[50%]'>
                                                                                    <img src={imgurl + items.Profile_Picture} alt="" className='w-[100%] h-[100%] rounded-[50%]' />
                                                                                </section>

                                                                                <section className='ms-2'>
                                                                                    <p>{items.Full_Name}</p>
                                                                                </section>
                                                                            </section>

                                                                            <section>
                                                                                <button type='submit' className='w-[35px] h-[35px] bg-[skyblue] flex items-center justify-center rounded-[50%] text-[#ffffff]' onClick={() => setuserdata(items.Sub_Id)}>
                                                                                    <IoIosSend />
                                                                                </button>
                                                                            </section>
                                                                        </section> :
                                                                        null
                                                                }
                                                            </section>
                                                        )
                                                    })
                                                }
                                            </section>
                                        )
                                    })
                            }
                        </section>
                        :
                        null
                }
                <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                    <p className='font-[600] text-[grey]'>Send Personal Notice</p>
                    <section className='w-[100%] '>
                        <div className='w-[100%] flex justify-between my-[10px]'>
                            <div className='w-[48%]'>
                                <label>
                                    Notice Heading
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Heading', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Notice_Heading}
                                </div>
                            </div>

                            <div className='w-[48%]'>
                                <label>
                                    Notice Description
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Description', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Notice_Description}
                                </div>
                            </div>
                        </div>


                        <div className='w-[100%] flex justify-between my-[10px]'>

                            <div className='w-[48%]'>
                                <label>
                                    Notice Subject
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Reason', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Notice_Reason}
                                </div>
                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between mt-[20px]'>
                            <div className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setsendmodal(true)}>
                                Send To
                            </div>

                            <Link to={"/view-all-notices"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                View Data
                            </Link>
                        </div>
                    </section>
                </section>
                <Toaster />
            </form>
        </>
    )
}

