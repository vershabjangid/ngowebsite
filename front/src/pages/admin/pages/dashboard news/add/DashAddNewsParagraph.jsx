import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'


export function DashAddNewsParagraph() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            News_Section_Id: "",
            News_Paragraph: "",
            News_Image: "",
            News_Sub_Heading: ""
        },
        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                News_Section_Id: "",
                News_Paragraph: "",
                News_Image: "",
                News_Sub_Heading: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-news-extra-paragraph', toFormData(value), {
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


    let [newsdata, setnewsdata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-news')
                .then((res) => {
                    setnewsdata(res.data.viewdata)
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
                        <p className='font-[600] text-[grey]'>Add News Paragraph</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>

                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="newaparagraphsection">
                                            Choose Paragraph Section
                                        </label>

                                        <select id='newaparagraphsection' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Section_Id', e.target.value)} >
                                            <option value="">Choose Option</option>
                                            {
                                                newsdata.length === 0 ?
                                                    null :
                                                    newsdata.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items._id}>{items.News_Heading}</option>
                                                        )
                                                    })
                                            }
                                        </select>

                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="aboutparagraph">
                                            News Sub-Heading
                                        </label>

                                        <input autoComplete='true' id='aboutparagraph' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Sub_Heading', e.target.value)} />
                                    </div>


                                </div>

                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="aboutparagraph">
                                            News Paragraph
                                        </label>

                                        <textarea autoComplete='true' id='aboutparagraph' type="text" className='w-[100%] h-[200px] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Paragraph', e.target.value)} />
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="newsparagraph">
                                            Sub Paragraph Image
                                        </label>

                                        <input id='newsparagraph' type="file" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Image', e.target.files[0])} />
                                    </div>
                                </div>



                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-all-news-paragraph"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
