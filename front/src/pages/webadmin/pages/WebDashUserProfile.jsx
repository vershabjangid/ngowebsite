import React, { useState } from 'react'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { FiUser } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaXmark } from 'react-icons/fa6'
import { RiDeleteBinLine } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { Toaster } from 'react-hot-toast'
import { Loader } from '../../../common/Loader'
import { useFormik } from 'formik'

export function WebDashUserProfile() {
    let [loader, setloader] = useState(false)


    let location = useLocation()
    let data = location.state

    let [modal, setmodal] = useState(false)
    let [modaldata, setmodaldata] = useState(false)

    let [updatemodal, setupdatemodal] = useState(false)

    let formik = useFormik({
        initialValues: {
            Sub_Id: data[0] === undefined ? null : data[0]._id,
            Is_Verified: 1,
            Select_Designation: ""
        },

        onSubmit: () => {
            updatedata(formik.values)
            setloader(true)
        }
    })


    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-users-status', value, {
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
                    setupdatemodal(false)
                    navigate('/dash-users')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate()
    let deletedata = (value) => {
        setloader(true)
        try {
            apiurl.delete('/admin/delete-users', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setmodal(false)
                    setloader(false)
                    navigate('/dash-users')
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
                loader ? <Loader />
                    :
                    <>
                        {
                            modal ?
                                <section className='w-[100%] h-[100vh] fixed top-0 bg-[#0000005c] z-[9999] flex items-center justify-center'>
                                    <section className='w-[400px] border-[2px] border-[#7FC2EF] p-2 rounded-[10px] bg-[white]'>
                                        <div>
                                            <p className='py-1 text-[17px] font-[500]'>Are your sure to delete this record?</p>
                                        </div>
                                        <div className='w-[100%] flex mt-4'>
                                            <button className='bg-[#7FC2EF] px-3 py-2 rounded-[10px] text-white my-2 flex items-center' onClick={() => setmodal(false)}><FaXmark className='me-1' /> Cancel</button>
                                            <button className='bg-[red] px-3 py-2 rounded-[10px] text-white ms-2 my-2 flex items-center' onClick={() => deletedata(modaldata)}><RiDeleteBinLine className='me-1' />Delete</button>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }



                        {
                            updatemodal ?
                                <section className='w-[100%] h-[100vh] fixed top-0 bg-[#0000005c] z-[9999] flex items-center justify-center'>
                                    <section className='w-[400px] border-[2px] border-[#7FC2EF] p-2 rounded-[10px] bg-[white]'>
                                        <div>
                                            <p className='py-1 text-[17px] font-[500]'>Update Data</p>
                                        </div>

                                        <form onSubmit={formik.handleSubmit}>
                                            <div className='mt-3'>
                                                <label htmlFor="Select_Designation">Designation</label>
                                                <select className='border-[1px] border-[black] w-[100%] p-2 rounded-[10px]' onChange={(e) => formik.setFieldValue('Select_Designation', e.target.value)} >
                                                    <option>Select Designation</option>
                                                    <option value="Director">Director</option>
                                                    <option value="Secretory">Secretory</option>
                                                    <option value="President">President</option>
                                                    <option value="Vice-President">Vice-President</option>
                                                    <option value="Treasurer">Treasurer</option>
                                                    <option value="Member">Member</option>
                                                    <option value="Volunteer">Volunteer</option>
                                                    <option value="Social Worker">Social Worker</option>
                                                </select>
                                            </div>

                                            <div className='w-[100%] flex mt-4'>
                                                <div className='bg-[#7FC2EF] px-3 py-2 rounded-[10px] text-white my-2 flex items-center' onClick={() => setupdatemodal(false)}><FaXmark className='me-1' /> Cancel</div>
                                                <button type='submit' className='bg-[#009113] px-3 py-2 rounded-[10px] text-white ms-2 my-2 flex items-center'>Update</button>
                                            </div>
                                        </form>
                                    </section>
                                </section>
                                :
                                null
                        }



                        <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                            <WebAdminSidebar />
                            <section className='w-[100%] h-[100%]'>
                                <WebAdminHeader />

                                <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                                    <section className='w-[100%] px-3'>
                                        <div className='text-[25px] flex items-center'>
                                            <FiUser />
                                            <h1 className='font-[600] ms-2'>
                                                User Profile
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / Users /<span className='text-[#1385ff]'> User profile</span></p>
                                        </div>
                                    </section>


                                    <section className='w-[100%] bg-[white] p-2  mt-[30px] rounded-[10px]'>
                                        <section className='flex justify-between'>
                                            <section>
                                                <section className='w-[300px] h-[300px]'>
                                                    <img src={data[2] + data[1].Profile_Picture} alt="" className='w-[100%] h-[100%] rounded-[10px]' />
                                                </section>

                                                <section className='pt-4 w-[100%]'>
                                                    <a href={data[2] + data[1].Upload_Aadhar} className='bg-[#fdc396] py-2 px-2 rounded-[10px] me-2 text-[#ff7105] font-[600]'>View Document</a>
                                                </section>


                                                <section className='pt-4 w-[100%]'>
                                                    <button className='w-[48%] bg-[#ff0000] py-2 px-2 rounded-[10px] text-[#ffacac] font-[600] me-2' onClick={() => setmodal(true) || setmodaldata(data[0])}>Delete</button>
                                                    <button className='w-[48%] bg-[skyblue] py-2 px-2 rounded-[10px] text-[#00668e] font-[600]' onClick={() => setupdatemodal(true)}>Accept</button>
                                                </section>
                                            </section>

                                            <section className='w-[calc(100%-320px)]'>
                                                <p className='text-[20px] font-[600]'>Full Name: {data[1].Full_Name}</p>
                                                <p className='text-[16px] font-[600] text-[grey]'>Designation: {data[1].Select_Designation}</p>
                                                <p className='text-[16px] font-[600] mt-5'>Father Name: {data[1].Father_Name}</p>
                                                <p className='text-[16px] font-[600] mt-2'>Date Of Birth: {data[1].Date_Of_Birth}</p>
                                                <p className='text-[16px] font-[600] mt-2'>Occupation: {data[1].Occupation}</p>
                                                <p className='text-[25px] font-[600] mt-[20px]'>Contact Information</p>
                                                <p className='text-[16px] font-[600] mt-4'>Email Address: {data[0].Email}</p>
                                                <p className='text-[16px] font-[600] mt-2'>Phone Number: {data[0].Phone}</p>
                                                <p className='text-[16px] font-[600] mt-2'>Address: {data[1].Address}</p>
                                                <p className='text-[16px] font-[600] mt-2'>City: {data[1].City}</p>
                                            </section>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>
                        <Toaster />
                    </>
            }
        </>
    )
}
