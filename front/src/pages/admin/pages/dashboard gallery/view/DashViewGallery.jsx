import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { IoMdPhotos } from 'react-icons/io'
import { Loader } from '../../../../../common/Loader'

export function DashViewGallery() {
    let [imgurl, setimgurl] = useState([])
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-gallery')
                .then((res) => {
                    sethomegoalscarddata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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

    // /update-home-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState([])
    let formik = useFormik({
        initialValues: {
            _id: "",
            Gallery_Event_Heading: "",
            Gallery_Event_Description: "",
            Gallery_Event_Image: ""
        },
        onSubmit: (values, { resetForm }) => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
            setloader(true)
            resetForm({
                _id: "",
                Gallery_Event_Heading: "",
                Gallery_Event_Description: "",
                Gallery_Event_Image: ""
            })
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    // /update-home-banner

    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])


    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-gallery', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
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

    let deletedata = (value) => {
        setloader(true)
        try {
            apiurl.delete('/admin/delete-gallery', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
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
                                            <h3 className='text-[25px] font-[600]'>Update Cards</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="cardheading">
                                                            Card Heading
                                                        </label>

                                                        <input id='cardheading' autoComplete='true' maxLength={100} defaultValue={updatemodaldata.Gallery_Event_Heading} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Heading', e.target.value)} />
                                                    </div>

                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="carddescription">
                                                            Card Description
                                                        </label>
                                                        <input id='carddescription' autoComplete='true' defaultValue={updatemodaldata.Gallery_Event_Description} maxLength={500} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Description', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="cardimage">
                                                            Card Icon
                                                        </label>

                                                        <input id='cardimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Gallery_Event_Image', e.target.files[0])} />
                                                        <div className='text-[#ff6780]'>
                                                            {formik.errors.Home_Goals_Card_Icon}
                                                        </div>
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
                                            <IoMdPhotos />
                                            <h1 className='font-[600] ms-2'>
                                                View Gallery
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'> View Gallery</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'> View Gallery Section</p>

                                        <section className='w-[100%] my-[10px] flex justify-evenly flex-wrap py-2'>
                                            {
                                                homegoalscarddata.length === 0 ?
                                                    <div className='text-center font-[600] text-[grey]'>
                                                        No Data Found
                                                    </div> :
                                                    homegoalscarddata.map((items, index) => {
                                                        return (
                                                            <section key={index} className='w-[320px] border-[2px] border-[black] p-[10px] rounded-[20px] mb-[20px]'>
                                                                <img src={imgurl + items.Gallery_Event_Image} alt="" className='m-auto' />
                                                                <p className='my-[5px] text-[20px] font-[600]'>
                                                                    {items.Gallery_Event_Heading}
                                                                </p>
                                                                <p className='text-[13px]'>
                                                                    {items.Gallery_Event_Description}
                                                                </p>

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
                    </>
            }
            <Toaster />
        </>
    )
}
