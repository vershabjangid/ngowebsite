import { useFormik } from 'formik'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'

export function DashAddTermsBanner() {
    let formik = useFormik({
        initialValues: {
            Terms_Banner_Heading: "",
            Terms_Banner_Description: "",
            Terms_Banner_Image: ""
        },
        onSubmit: () => {
            insertdata(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-terms-banner-section', toFormData(value), {
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
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                <p className='font-[600] text-[grey]'> Terms Banner Section</p>

                <section className='w-[100%] '>
                    <form onSubmit={formik.handleSubmit}>

                        <div className='w-[100%] flex justify-between my-[10px]'>
                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Terms Banner Heading
                                </label>

                                <input maxLength={100} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Heading', e.target.value)} />

                            </div>

                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Terms Banner Paragraph
                                </label>

                                <input maxLength={300} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Description', e.target.value)} />

                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between my-[10px]'>

                            <div className='w-[48%]'>
                                <label htmlFor="">
                                    Terms Banner Image
                                </label>

                                <input type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Image', e.target.files[0])} />
                            </div>
                        </div>

                        <div className='w-[100%] flex justify-between mt-[20px]'>
                            <button className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                Submit
                            </button>

                            <Link to={"/view-terms-banner"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
