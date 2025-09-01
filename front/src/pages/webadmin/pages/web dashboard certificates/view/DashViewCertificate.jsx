import React, { useEffect, useState } from 'react'
import { WebAdminSidebar } from '../../../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../../../common/WebAdminHeader'
import { FaDownload, FaRegBell } from 'react-icons/fa6'
import { FiCalendar, FiEdit, FiUser } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import DateFormat from '../../../../../common/DateFormat'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { LiaCertificateSolid } from 'react-icons/lia'
import { toFormData } from 'axios'

export function DashViewCertificate() {

    let [data, setdata] = useState([])
    let [filternoticedata, setfilternoticedata] = useState([])
    let [imgurl, setimgurl] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-certificates', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setdata([])
                    }
                    else {
                        setdata(res.data.viewdata)
                        setfilternoticedata(res.data.viewdata)
                        setimgurl(res.data.imageurl)
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
            Certificate_Heading: "",
            Certificate_Description: "",
            Certificate_Category: "",
            Date_Of_Issue: "",
            Certificate_File: ""
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
            apiurl.put('/admin/update-certificates', toFormData(value), {
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
            apiurl.delete('/admin/delete-certificate', {
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
        setdata(filternoticedata.filter((e) => e.Certificate_ID.includes(value)))
    }
    return (
        <>
            {
                updatemodal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                        <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                            <div className=' border-b-[1px] border-[black] pb-1'>
                                <h3 className='text-[25px] font-[600]'>Update Certificate</h3>
                            </div>
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='w-[100%] mt-3'>
                                        <label>
                                            Certificate Heading
                                        </label>

                                        <input type="text" defaultValue={updatemodaldata.Certificate_Heading} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Certificate_Heading', e.target.value)} />

                                    </div>

                                    <div className='w-[100%] mt-3'>
                                        <label>
                                            Line to appereciate
                                        </label>

                                        <input type="text" defaultValue={updatemodaldata.Certificate_Description} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Certificate_Description', e.target.value)} />

                                    </div>



                                    <div className='w-[100%] mt-3'>
                                        <label>
                                            Certificate Category
                                        </label>

                                        <select type="text" defaultValue={updatemodaldata.Certificate_Category} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Certificate_Category', e.target.value)} >
                                            <option>Choose option</option>
                                            <option value="Achievement">
                                                Achievement
                                            </option>

                                            <option value="Award">
                                                Award
                                            </option>

                                            <option value="Appreciation">
                                                Appreciation
                                            </option>

                                            <option value="Attendance">
                                                Attendance
                                            </option>

                                            <option value="Best Practice">
                                                Best Practice
                                            </option>


                                            <option value="Commitment">
                                                Commitment
                                            </option>

                                            <option value="Completion">
                                                Completion
                                            </option>

                                            <option value="Contribution">
                                                Contribution
                                            </option>

                                            <option value="Community Engagement">
                                                Community Engagement
                                            </option>

                                            <option value="Dedication">
                                                Dedication
                                            </option>

                                            <option value="Distinction">
                                                Distinction
                                            </option>

                                            <option value="Excellence">
                                                Excellence
                                            </option>

                                            <option value="Exemplary Conduct">
                                                Exemplary Conduct
                                            </option>

                                            <option value="Honor">
                                                Honor
                                            </option>

                                            <option value="Innovation">
                                                Innovation
                                            </option>

                                            <option value="Knowledge Certification">
                                                Knowledge Certification
                                            </option>

                                            <option value="Leadership">
                                                Leadership
                                            </option>

                                            <option value="Merit">
                                                Merit
                                            </option>

                                            <option value="Milestone">
                                                Milestone
                                            </option>

                                            <option value="Outstanding Performance">
                                                Outstanding Performance
                                            </option>

                                            <option value="Participation">
                                                Participation
                                            </option>

                                            <option value="Performance">
                                                Performance
                                            </option>

                                            <option value="Professional Development">
                                                Professional Development
                                            </option>

                                            <option value="Recognition">
                                                Recognition
                                            </option>

                                            <option value="Service">
                                                Service
                                            </option>

                                            <option value="Skill Certification">
                                                Skill Certification
                                            </option>

                                            <option value="Special Recognition">
                                                Special Recognition
                                            </option>

                                            <option value="Training">
                                                Training
                                            </option>

                                            <option value="Teamwork">
                                                Teamwork
                                            </option>

                                            <option value="Volunteer Service">
                                                Volunteer Service
                                            </option>
                                        </select>

                                    </div>


                                    <div className='w-[100%] mt-3'>
                                        <label>
                                            Date Of Issue
                                        </label>

                                        <input type="date" defaultValue={updatemodaldata.Date_Of_Issue} className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Date_Of_Issue', e.target.value)} />

                                    </div>



                                    <div className='w-[100%] mt-3'>
                                        <label htmlFor="">
                                            Upload File
                                        </label>

                                        <input type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Certificate_File', e.target.files[0])} />

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
                                <LiaCertificateSolid />
                                <h1 className='font-[600] ms-2'>
                                    Certificates
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>View All Certificates</span></p>
                            </div>
                        </section>


                        <section className='mt-[20px]'>
                            <button className={status === 'All' ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px]'} onClick={() => filterdata('All') || setstatus('All')}>
                                All
                            </button>

                            <input type="text" className='border-[1px] border-[black] rounded-[5px] py-1 ms-2 px-1' onChange={(e) => filterdata(e.target.value)} placeholder='Search with CERT ID' />
                        </section>

                        {
                            data.length === 0 ?
                                <section className='text-center w-[100%] mt-4'>No Data Found</section>
                                :
                                <section className='w-[100%] flex justify-between flex-wrap'>
                                    {
                                        data.map((items, index) => {
                                            return (
                                                <section key={index} className='dashboard_notice w-[30%] mt-5'>
                                                    <section className='mt-[10px] border-[1px] border-[#1385ff] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                        <section className='flex justify-between'>
                                                            <div className='flex justify-center items-center rounded-[10px] w-[50px] h-[50px] bg-[white]'>
                                                                <LiaCertificateSolid className='text-[25px] text-[#1385ff]' /> <p className='text-[18px] font-[600] ms-1'>{items.Notice_Heading}</p>
                                                            </div>

                                                            <div className='flex items-start  mt-2'>
                                                                <p className='text-[10px] font-[600] bg-[#ffdfc1] px-2 py-1 rounded-[15px] text-[#ff8e25]'> {items.Certificate_Category}</p>
                                                            </div>
                                                        </section>

                                                        <div className='flex mt-2'>
                                                            <p className='text-[18px] font-[600] ms-1'>{items.Certificate_Heading}</p>
                                                        </div>

                                                        <div className='flex mt-1 '>
                                                            <p className='text-[15px] text-[grey]  ms-1 w-[100%]'>{items.Certificate_Description}</p>
                                                        </div>

                                                        <div className='flex justify-between mt-[30px] '>
                                                            <p className='text-[13px] text-[grey]  ms-1 w-[100%]'>Certificate ID:</p>
                                                            <p className='text-[13px] text-[grey]  ms-1 w-[100%] text-end'>{items.Certificate_ID}</p>
                                                        </div>


                                                        <div className='flex justify-between my-[5px] '>
                                                            <p className='text-[13px] text-[grey]  ms-1 w-[100%]'>Issue Date:</p>
                                                            <p className='text-[13px] text-[grey]  ms-1 w-[100%] text-end'>{items.Date_Of_Issue}</p>
                                                        </div>


                                                        <div className='flex items-center justify-between mt-5'>
                                                            <a href={`${imgurl}` + `${items.Certificate_File}`} download={"Certificate_File"} target="_blank" className='flex w-[60%] py-2 bg-[skyblue] rounded-[10px] text-white justify-center items-center font-[600]'><FaDownload className='me-2' /> Download</a>
                                                            <a href={imgurl + items.Certificate_File} className='flex w-[38%] py-2 bg-[white] rounded-[10px] text-[skyblue] justify-center items-center font-[600]'>View</a>
                                                        </div>

                                                        <div className='flex items-center justify-between mt-5'>
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
                                    <section className='dashboard_notice w-[30%] mt-5'></section>
                                    <section className='dashboard_notice w-[30%] mt-5'></section>
                                </section>
                        }
                    </section>
                </section>
            </section >
            <Toaster />
        </>
    )
}
