import React, { useEffect, useState } from 'react'
import { WebAdminSidebar } from '../../../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../../../common/WebAdminHeader'
import { FaRegBell } from 'react-icons/fa6'
import { FiCalendar, FiEdit, FiUser } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import DateFormat from '../../../../../common/DateFormat'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'

export function DashViewNotices() {

    let [data, setdata] = useState([])
    let [filternoticedata, setfilternoticedata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-notice', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setdata([])
                    }
                    else {
                        setdata(res.data)
                        setfilternoticedata(res.data)
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

    useEffect(() => {
        viewdata()
    }, [])


    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState([])
    let formik = useFormik({
        initialValues: {
            _id: "",
            Notice_Heading: "",
            Notice_Description: "",
            Notice_Reason: "",
        },
        onSubmit: () => {
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
            apiurl.put('/admin/update-notice', value, {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        window.location.reload()
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
            apiurl.delete('/admin/delete-notice', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        window.location.reload()
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

    let [status, setstatus] = useState('All')
    let filterdata = (value) => {
        console.log(value)
        if (value === 'All') {
            viewdata()
        }
        else {
            if (value === 'Personal') {
                setdata(filternoticedata.filter((e) => e.Send_To !== 'All'))
            }
            else {
                setdata(filternoticedata.filter((e) => e.Send_To === 'All'))
            }
        }
    }
    return (
        <>
            {
                updatemodal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                        <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                            <div className=' border-b-[1px] border-[black] pb-1'>
                                <h3 className='text-[25px] font-[600]'>Update Notice</h3>
                            </div>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerheading">
                                                Notice Heading
                                            </label>

                                            <input defaultValue={updatemodaldata.Notice_Heading} id='homebannerheading' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Heading', e.target.value)} />
                                        </div>

                                    </div>

                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                Notice Description
                                            </label>
                                            <input id='homebannerdescription' defaultValue={updatemodaldata.Notice_Description} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Description', e.target.value)} />
                                        </div>
                                    </div>


                                    <div className='w-[100%] flex justify-between my-[10px]'>
                                        <div className='w-[100%]'>
                                            <label htmlFor="homebannerdescription">
                                                Notice Subject
                                            </label>
                                            <input id='homebannerdescription' defaultValue={updatemodaldata.Notice_Reason} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Notice_Reason', e.target.value)} />
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
                                <p>Are you sure to delete?</p>
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
                <WebAdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <WebAdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px] pb-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaRegBell />
                                <h1 className='font-[600] ms-2'>
                                    Notices
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>View All Notice</span></p>
                            </div>
                        </section>


                        <section className='mt-[20px]'>
                            <button className={status === 'All' ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px]'} onClick={() => filterdata('All') || setstatus('All')}>
                                All
                            </button>

                            <button className={status === "Personal" ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px] ms-2' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px] ms-2'} onClick={() => filterdata('Personal') || setstatus("Personal")}>
                                Personal
                            </button>


                            <button className={status === "General" ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px] ms-2' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px] ms-2'} onClick={() => filterdata('General') || setstatus("General")}>
                                General
                            </button>
                        </section>

                        {
                            data.length === 0 ?
                                <section className='text-center w-[100%] mt-4'>No Data Found</section>
                                :
                                data.map((items, index) => {
                                    return (
                                        <section key={index} className='dashboard_notice w-[100%] mt-5'>
                                            <section className='mt-[10px] border-[1px] border-[#1385ff] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                <div className='flex'>
                                                    <IoMdNotificationsOutline className='text-[25px] text-[#1385ff]' /> <p className='text-[18px] font-[600] ms-1'>{items.Notice_Heading}</p>
                                                </div>
                                                <div className='flex mt-2'>
                                                    <p className='text-[10px] font-[600] bg-[#fdcece] px-2 py-1 rounded-[15px] text-[red]'> Subject : {items.Notice_Heading}</p>
                                                </div>

                                                <div className='flex mt-3 '>
                                                    <p className='text-[16px] ms-1 w-[100%]'>{items.Notice_Description}</p>
                                                </div>

                                                <div className='flex items-center justify-between'>
                                                    <div className='flex mt-3 text-[grey]'>
                                                        <div className='flex'>
                                                            <FiUser className='text-[18px]' /> <p className='text-[14px] ms-2 '>Admin</p>
                                                        </div>

                                                        <div className='flex ms-4'>
                                                            <FiCalendar className='text-[18px]' /> <p className='text-[14px] ms-2 '><DateFormat value={items.Date} /></p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center'>
                                                        <RiDeleteBin6Line className='text-[red] cursor-pointer' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)} />
                                                        <FiEdit className='ms-4 text-[blue] cursor-pointer' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)} />
                                                    </div>
                                                </div>
                                            </section>
                                        </section>
                                    )
                                })
                        }
                    </section>
                </section>
            </section>
        </>
    )
}
