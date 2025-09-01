import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { IoNewspaperOutline } from 'react-icons/io5'

export function DashViewNews() {
    let [imgurl, setimgurl] = useState([])
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-news')
                .then((res) => {
                    sethomegoalscarddata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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

    // /update-home-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState([])
    let formik = useFormik({
        initialValues: {
            _id: "",
            News_Heading: "",
            News_Description: "",
            News_Image: "",
            News_Additional_Links: ""
        },
        onSubmit: () => {
            console.log(updatemodaldata)
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    // /update-home-banner

    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])


    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-news', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                        setupdatemodal(false)
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

    let deletedata = (value) => {
        try {
            apiurl.delete('/admin/delete-news', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                        setdeletemodal(false)
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
                updatemodal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                        <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                            <div className=' border-b-[1px] border-[black] pb-1'>
                                <h3 className='text-[25px] font-[600]'>Update News</h3>
                            </div>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerheading">
                                                News Heading
                                            </label>

                                            <input defaultValue={updatemodaldata.News_Heading} id='homebannerheading' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Heading', e.target.value)} />
                                        </div>

                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                News Description
                                            </label>
                                            <textarea id='homebannerdescription' defaultValue={updatemodaldata.News_Description} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Description', e.target.value)} />
                                        </div>
                                    </div>


                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                Additional Links
                                            </label>
                                            <input id='homebannerdescription' defaultValue={updatemodaldata.News_Additional_Links} type="url" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Additional_Links', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homeimage">
                                                News Image
                                            </label>

                                            <input id='homeimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('News_Image', e.target.files[0])} />
                                        </div>
                                    </div>

                                    <div className='w-[100%] flex justify-end mt-[20px]'>
                                        <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                            Submit
                                        </button>

                                        <button className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setupdatemodal(false)}>
                                            Cancel
                                        </button>
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
                                    View News
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'> View News</span></p>
                            </div>
                        </section>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey] mb-[20px]'> View News Section</p>

                            <section className='w-[100%] my-[10px] flex justify-evenly flex-wrap py-2'>
                                {
                                    homegoalscarddata.length === 0 ?
                                        <div className='text-center font-[600] text-[grey]'>
                                            No Data Found
                                        </div> :
                                        homegoalscarddata.map((items, index) => {
                                            return (
                                                <section key={index} className='w-[49%] border-[2px] border-[black] p-[10px] rounded-[20px] mb-[20px]'>
                                                    <img src={imgurl + items.News_Image} alt="" className='m-auto' />
                                                    <p className='my-[5px] text-[20px] font-[600]'>
                                                        {items.News_Heading}
                                                    </p>
                                                    <p className='text-[13px] mb-[20px]'>
                                                        {items.News_Description}
                                                    </p>

                                                    {
                                                        items.News_Additional_Links === "" ?
                                                            null :
                                                            <a href={items.News_Additional_Links} className='text-[13px] bg-[black] text-[white] p-3 rounded-[20px]'>
                                                                Additional Links
                                                            </a>
                                                    }

                                                    <div className='pt-5'>
                                                        <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)}>
                                                            Update
                                                        </button>

                                                        <button className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white] ms-2' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </section>
                                            )
                                        })
                                }

                            </section>


                        </section>
                    </section>
                </section>
            </section>
            <Toaster />
        </>
    )
}
