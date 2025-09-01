import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'


export function DashAddGoalsHeading() {
    let formik = useFormik({
        initialValues: {
            Home_Card_Id: "",
            Home_Card_Paragraph_Heading: "",
        },

        validationSchema: Yup.object().shape({
            Home_Card_Id: Yup.string().required("Card selection is required"),
            Home_Card_Paragraph_Heading: Yup.string().required("Paragraph heading is required")
        }),


        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-goals-paragraph-heading', toFormData(value), {
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
            <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                <p className='font-[600] text-[grey]'> Home Add Goals Paragraph Heading</p>

                <section className='w-[100%] '>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='w-[100%] flex justify-between my-[10px]'>
                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Choose Card
                                </label>

                                <select className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Id', e.target.value)} >
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

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Paragraph_Heading', e.target.value)} />
                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between mt-[20px]'>
                            <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                Submit
                            </button>

                            <Link to={"/view-home-paragraph-heading"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                View Data
                            </Link>
                        </div>
                    </form>
                </section>
            </section>
            <Toaster />
        </>
    )
}
