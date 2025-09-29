import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { Loader } from '../../../../../common/Loader'
import { IoNewspaperOutline } from 'react-icons/io5'

export function DashViewNewsParagraph() {
    let [imgurl, setimgurl] = useState([])
    let [aboutdata, setaboutdata] = useState([])
    let [aboutparagraphdata, setaboutparagraphdata] = useState([])
    let [loader, setloader] = useState(false)

    let viewdata = async () => {
        try {
            let [viewparagraph, viewallparagraph] = await Promise.all([
                apiurl.get('/admin/view-news'),
                apiurl.get('/admin/view-news-extra-paragraph')
            ])

            return {
                viewparagraphdata: viewparagraph.data.viewdata,
                viewallparagraphdata: viewallparagraph.data.viewdata,
                imgurl: viewparagraph.data.imgurl
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let finaldata = () => {
        try {
            viewdata()
                .then((res) => {
                    setaboutdata(res.viewparagraphdata)
                    setaboutparagraphdata(res.viewallparagraphdata)
                    setimgurl(res.imgurl)
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
        finaldata()
        setloader(true)
    }, [])

    // /update-about-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState(null)

    let formik = useFormik({
        initialValues: {
            _id: "",
            News_Section_Id: "",
            News_Paragraph: "",
            News_Image: "",
            News_Sub_Heading: ""

        },
        onSubmit: (value, { resetForm }) => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
            setloader(true)
            resetForm({
                _id: "",
                News_Section_Id: "",
                News_Paragraph: "",
                News_Image: "",
                News_Sub_Heading: ""
            })
        }
    })

    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-news-extra-paragraph', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        finaldata()
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setupdatemodal(false)
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


    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])


    let deletedata = (value) => {
        setloader(true)
        try {
            apiurl.delete('/admin/delete-news-extra-paragraph', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        finaldata()
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setdeletemodal(false)
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
                    <>
                        {
                            updatemodal ?
                                <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                                    <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                                        <div className=' border-b-[1px] border-[black] pb-1'>
                                            <h3 className='text-[25px] font-[600]'>Update News Paragraph</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="newsparagraphsection">
                                                            Choose Paragraph Section
                                                        </label>

                                                        <select id='newsparagraphsection' defaultValue={updatemodaldata.News_Section_Id} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Section_Id', e.target.value)} >
                                                            <option value="">Choose Option</option>
                                                            {
                                                                aboutdata.length === 0 ?
                                                                    null :
                                                                    aboutdata.map((items, index) => {
                                                                        return (
                                                                            <option key={index} value={items._id}>{items.News_Heading}</option>
                                                                        )
                                                                    })
                                                            }
                                                        </select>
                                                    </div>

                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="newssubheading">
                                                            News Sub-Heading
                                                        </label>
                                                        <input id='newssubheading' autoComplete='true' defaultValue={updatemodaldata.News_Sub_Heading} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Sub_Heading', e.target.value)} />
                                                    </div>
                                                </div>


                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="newsparagraphdescription">
                                                            News Paragraph
                                                        </label>
                                                        <textarea id='newsparagraphdescription' autoComplete='true' defaultValue={updatemodaldata.News_Paragraph} type="text" className='w-[100%] h-[100px] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Paragraph', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="newsimage">
                                                            News Image
                                                        </label>
                                                        <input id='newsimage' type="file" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Image', e.target.files[0])} />
                                                    </div>
                                                </div>


                                                <div className='w-[100%] flex justify-end mt-[20px]'>
                                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                                        Submit
                                                    </button>

                                                    <div className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setupdatemodal(false)}>
                                                        Cancel
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }


                        {
                            deletemodal ?
                                <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                                    <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                                        <div className=' border-b-[1px] border-[black] pb-1'>
                                            <h3 className='text-[25px] font-[600]'>Delete Slide</h3>
                                        </div>
                                        <div className='py-4'>
                                            <p>Are you sure to delete a slide?</p>
                                        </div>
                                        <div>
                                            <div className='w-[100%] flex justify-end mt-[20px]'>
                                                <button type='submit' className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => deletedata(deletemodaldata)}>
                                                    Delete
                                                </button>

                                                <button className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setdeletemodal(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }

                        <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                            <AdminSidebar />
                            <section className='w-[100%] h-[100%]'>
                                <AdminHeader />

                                <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                                    <section className='w-[100%] px-3'>
                                        <div className='text-[25px] flex items-center'>
                                            <IoNewspaperOutline />
                                            <h1 className='font-[600] ms-2'>
                                                News & Events
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#000000]'>News & Events</span> / <span className='text-[#1385ff]'> News All Paragraph Section</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'> News Paragraph Section</p>

                                        {
                                            aboutdata.length === 0 ?
                                                <div className='text-center font-[600] text-[grey]'>
                                                    No Data Found
                                                </div>

                                                :
                                                aboutdata.map((items, index) => {
                                                    console.log(items)
                                                    return (
                                                        <section className='mb-[50px]' key={index}>
                                                            <section className=''>
                                                                <section key={index} className='home_about_us w-[100%] py-[20px] px-[20px] flex'>
                                                                    <section className='w-[30%] flex justify-center items-center'>
                                                                        <section className='w-[300px]'>
                                                                            <img src={imgurl + items.News_Image} alt="" className='w-[100%]' />
                                                                        </section>
                                                                    </section>
                                                                    <section className='w-[70%] uppercase'>
                                                                        <h2 className='home_heading text-[30px] font-[700]'>
                                                                            {items.News_Heading}
                                                                        </h2>
                                                                        <p className='text-justify my-[10px] mb-[10px] leading-[25px] whitespace-pre-wrap'>
                                                                            {items.News_Description}
                                                                        </p>
                                                                    </section>
                                                                </section>

                                                                {
                                                                    aboutparagraphdata.length === 0 ?
                                                                        null :
                                                                        aboutparagraphdata.map((value, ind) => {
                                                                            return (
                                                                                <section key={ind} className=' mt-5'>
                                                                                    {
                                                                                        value.News_Section_Id !== items._id ?
                                                                                            null :
                                                                                            <div className='w-[100%]'>
                                                                                                <section className='w-[100%]'>
                                                                                                    {
                                                                                                        value.News_Image === null ?
                                                                                                            <section className=''>
                                                                                                                <p className=' capitalize text-[18px] font-[700] text-[#000000]'>{value.News_Sub_Heading}</p>
                                                                                                                <p className='mt-2 text-[15px] font-[500] italic text-[grey] capitalize whitespace-pre-wrap'>{value.News_Paragraph}</p>
                                                                                                            </section> :
                                                                                                            <section className='flex justify-between w-[100%]'>
                                                                                                                <section className='w-[300px]'>
                                                                                                                    <img src={imgurl + value.News_Image} alt="" className='w-[100%]' />
                                                                                                                </section>
                                                                                                                <section className='w-[calc(100%-340px)]'>
                                                                                                                    <p className=' capitalize text-[18px] font-[700] text-[#000000]'>{value.News_Sub_Heading}</p>
                                                                                                                    <p className='mt-2 text-[15px] font-[500] italic text-[grey] capitalize whitespace-pre-wrap'>{value.News_Paragraph}</p>
                                                                                                                </section>
                                                                                                            </section>
                                                                                                    }
                                                                                                </section>
                                                                                                <div className='w-[220px] mb-[100px] mt-4'>
                                                                                                    <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(value)}>
                                                                                                        Update
                                                                                                    </button>

                                                                                                    <button className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white] ms-2' onClick={() => setdeletemodal(true) || setdeletemodaldata(value)}>
                                                                                                        Delete
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                    }

                                                                                </section>
                                                                            )
                                                                        })
                                                                }
                                                            </section>

                                                        </section>
                                                    )
                                                })
                                        }
                                    </section>
                                </section>
                            </section>
                        </section>
                    </>
            }
            <Toaster />
        </>
    )
}
