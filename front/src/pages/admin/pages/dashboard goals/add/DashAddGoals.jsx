import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'


export function DashAddGoals() {
    let formik = useFormik({
        initialValues: {
            Home_Goals_Heading: "",
            Home_Goals_Description: "",
            Home_Goals_Card_Icon: ""
        },


        validationSchema: Yup.object().shape({
            Home_Goals_Heading: Yup.string().required("Card heading is required"),
            Home_Goals_Description: Yup.string().required("Card description is required"),
            Home_Goals_Card_Icon: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Card icon is required")
        }),


        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-goals-card', toFormData(value), {
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
            <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                <p className='font-[600] text-[grey]'> Home Add Goals</p>

                <section className='w-[100%] '>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='w-[100%] flex justify-between my-[10px]'>
                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Card Heading
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Goals_Heading', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Home_Goals_Heading}
                                </div>
                            </div>

                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Card Description
                                </label>

                                <input type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Goals_Description', e.target.value)} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Home_Goals_Description}
                                </div>
                            </div>
                        </div>


                        <div className='w-[100%] flex justify-between my-[10px]'>


                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Card Icon
                                </label>

                                <input type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Goals_Card_Icon', e.target.files[0])} />
                                <div className='text-[#ff6780]'>
                                    {formik.errors.Home_Goals_Card_Icon}
                                </div>
                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between mt-[20px]'>
                            <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                Submit
                            </button>

                            <Link to={"/view-home-Goals-cards"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
