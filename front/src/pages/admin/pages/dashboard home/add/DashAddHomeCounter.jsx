import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Loader } from '../../../../../common/Loader'

export function DashAddHomeCounter() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_Counter_Heading: "",
            Counter_Value: "",
            CounterIcon: ""
        },

        validationSchema: Yup.object().shape({
            Home_Counter_Heading: Yup.string().required("Counter heading is required"),
            Counter_Value: Yup.string().required("Counter value is required"),
            CounterIcon: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Counter Icon is required")
        }),


        onSubmit: (values, { resetForm }) => {
            insertdata(formik.values)
            resetForm({
                Home_Counter_Heading: "",
                Counter_Value: "",
                CounterIcon: ""
            })
            setloader(true)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-counters', toFormData(value), {
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
                        <p className='font-[600] text-[grey]'> Counter Section</p>
                        <p className='my-[20px] text-[15px]'>Add Counters that will appear at the top of the homepage counter section.</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="counterheading">
                                            Counter Heading
                                        </label>

                                        <input maxLength={15} id='counterheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Counter_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Counter_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="countervalue">
                                            Counter Value
                                        </label>
                                        <input id='countervalue' autoComplete='true' type="number" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Counter_Value', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Counter_Value}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="countericon">
                                            Counter Icon
                                        </label>

                                        <input id='countericon' type="file" autoComplete='true' className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('CounterIcon', e.target.files[0])} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.CounterIcon}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-counters"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View All
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
