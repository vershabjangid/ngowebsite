import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'


export function DashAddPrivacyExtraParagraph() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Privacy_Section_Id: "",
            Privacy_Paragraph: ""
        },
        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Privacy_Section_Id: "",
                Privacy_Paragraph: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-privacy-extra-paragraph', toFormData(value), {
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


    let [aboutdata, setaboutdata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-privacy-paragraph-section')
                .then((res) => {
                    setaboutdata(res.data.viewdata)
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
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'>Add Privacy Paragraph</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>

                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="ParagraphSection">
                                            Choose Paragraph Section
                                        </label>

                                        <select id='ParagraphSection' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Privacy_Section_Id', e.target.value)} >
                                            <option>Choose Option</option>
                                            {
                                                aboutdata.length === 0 ?
                                                    null :
                                                    aboutdata.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items._id}>{items.Privacy_Heading}</option>
                                                        )
                                                    })
                                            }
                                        </select>

                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="PrivacyParagraph">
                                            Privacy Paragraph
                                        </label>

                                        <input id='PrivacyParagraph' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Privacy_Paragraph', e.target.value)} />

                                    </div>
                                </div>



                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-all-privacy-paragraph"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
