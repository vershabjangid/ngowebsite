import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'


export function DashAddPrivacyParagraph() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Privacy_Heading: "",
            Privacy_Description: "",
            Privacy_Image: ""
        },
        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Privacy_Heading: "",
                Privacy_Description: "",
                Privacy_Image: ""
            })
        }
    })



    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-privacy-paragraph-section', toFormData(value), {
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
                        <p className='font-[600] text-[grey]'>Add Privacy Paragraph Section</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="privacyparagraphheading">
                                            Privacy Paragraph Heading
                                        </label>

                                        <input id='privacyparagraphheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Privacy_Heading', e.target.value)} />

                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="privacyparagraph">
                                            Privacy Paragraph
                                        </label>

                                        <input id='privacyparagraph' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Privacy_Description', e.target.value)} />

                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>


                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="privacyimage">
                                            Privacy Image
                                        </label>

                                        <input type="file" id='privacyimage' className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Privacy_Image', e.target.files[0])} />
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-privacy-paragraph"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
