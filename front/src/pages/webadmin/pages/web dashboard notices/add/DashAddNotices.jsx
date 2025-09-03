import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import * as Yup from 'yup'
import { Loader } from '../../../../../common/Loader'


export function DashAddNotices() {
    let [loader, setloader] = useState(false)
    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    let formik = useFormik({
        initialValues: {
            Notice_Heading: "",
            Notice_Description: "",
            Notice_Reason: "",
            Send_To: "All"
        },
        validationSchema: Yup.object().shape({
            Notice_Heading: Yup.string().required("Notice heading is required"),
            Notice_Description: Yup.string().required("Notice description is required"),
            Notice_Reason: Yup.string().required("Notice reason is required"),
        }),

        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Notice_Heading: "",
                Notice_Description: "",
                Notice_Reason: ""
            })
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
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'>Send  Notice To All</p>
                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor='noticeheading'>
                                            Notice Heading
                                        </label>

                                        <input id='noticeheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Notice_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor='noticedescription'>
                                            Notice Description
                                        </label>

                                        <input id='noticedescription' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Notice_Description}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>


                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor='noticesubject'>
                                            Notice Subject
                                        </label>

                                        <input id='noticesubject' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Reason', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Notice_Reason}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Send
                                    </button>

                                    <Link to={"/view-all-notices"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View Data
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
