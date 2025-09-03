import React, { useEffect, useState } from 'react'
import { AdminHeader } from '../../../../../common/AdminHeader'
import { FaHome } from 'react-icons/fa'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { useFormik } from 'formik'
import { toFormData } from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Loader } from '../../../../../common/Loader'


export function DashViewHomeManagementProfile() {
    let [bannerdata, setbannerdata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-home-management-card')
                .then((res) => {
                    setbannerdata(res.data.viewdata)
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
    let [updatemodaldata, setupdatemodaldata] = useState(null)
    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])

    let formik = useFormik({
        initialValues: {
            _id: "",
            Home_Banner_Heading: "",
            Home_Banner_Description: "",
            Home_Banner_Image: ""
        },
        onSubmit: (value, { resetForm }) => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
            setloader(true)
            resetForm({
                _id: "",
                Home_Banner_Heading: "",
                Home_Banner_Description: "",
                Home_Banner_Image: ""
            })
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-home-management-card', toFormData(value), {
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
            apiurl.delete('/admin/delete-home-management-card', {
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
                                            <h3 className='text-[25px] font-[600]'>Update Slide</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="homemanagementnameheading">
                                                            Name
                                                        </label>

                                                        <input autoComplete='true' id='homemanagementnameheading' maxLength={100} defaultValue={updatemodaldata.Home_Management_Profile_Name} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Profile_Name', e.target.value)} />
                                                    </div>

                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="homemanagementdesignation">
                                                            Designation
                                                        </label>
                                                        <input autoComplete='true' id='homemanagementdesignation' defaultValue={updatemodaldata.Home_Management_Profile_Designation} maxLength={200} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Profile_Designation', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="homemanagementdescription">
                                                            Description
                                                        </label>
                                                        <input autoComplete='true' id='homemanagementdescription' defaultValue={updatemodaldata.Home_Management_Profile_Description} maxLength={300} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Profile_Description', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="homemanagementprofile">
                                                            Profile Picture
                                                        </label>

                                                        <input id='homemanagementprofile' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Management_Profile_Name', e.target.files[0])} />
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
                                            <FaHome />
                                            <h1 className='font-[600] ms-2'>
                                                Home Management Profile
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'> Home Management Profile</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'> Home Management Profiles</p>

                                        {
                                            bannerdata.length === 0 ?
                                                <div className='text-center font-[600] text-[grey]'>
                                                    No Data Found
                                                </div>

                                                :
                                                bannerdata.map((items, index) => {
                                                    return (

                                                        <section key={index} className='mb-[50px]'>
                                                            <section className=''>
                                                                <div className='w-[100%]'>
                                                                    <img src={imgurl + items.Home_Management_Profile_Picture} alt="" />
                                                                </div>

                                                                <div className='w-[100%] text-[black] my-2'>
                                                                    <p className='text-[20px] font-[600]'>
                                                                        {items.Home_Management_Profile_Name}
                                                                    </p>

                                                                    <p className='text-[18px] font-[600]'>
                                                                        {items.Home_Management_Profile_Designation}
                                                                    </p>
                                                                    <p>{items.Home_Management_Profile_Description}</p>
                                                                </div>

                                                                <div>
                                                                    <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)}>
                                                                        Update
                                                                    </button>

                                                                    <button className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white] ms-2' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
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
