import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'

export function DashAddTermsBanner() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Terms_Banner_Heading: "",
            Terms_Banner_Description: "",
            Terms_Banner_Image: ""
        },
        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Terms_Banner_Heading: "",
                Terms_Banner_Description: "",
                Terms_Banner_Image: ""
            })
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
                    setloader(false)
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
                        <p className='font-[600] text-[grey]'> Terms Banner Section</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>

                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="termsbannerheading">
                                            Terms Banner Heading
                                        </label>

                                        <input id='termsbannerheading' autoComplete='true' maxLength={100} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Heading', e.target.value)} />

                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="termsbannerparagraph">
                                            Terms Banner Paragraph
                                        </label>

                                        <input id='termsbannerparagraph' autoComplete='true' maxLength={300} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Description', e.target.value)} />

                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between my-[10px]'>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="termsbannerimage">
                                            Terms Banner Image
                                        </label>

                                        <input id='termsbannerimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Banner_Image', e.target.files[0])} />
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-terms-banner"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
