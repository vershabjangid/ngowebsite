import React from 'react'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { FiUser } from 'react-icons/fi'
import { Logo } from '../../../common/Logo'
import { useLocation } from 'react-router-dom'

export function WebDashUserProfile() {
    let location = useLocation()
    let data = location.state
    return (
        <>
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

                                    <section className='pt-4'>
                                        <a href={data[2] + data[1].Upload_Aadhar} className='bg-[skyblue] py-2 px-2 rounded-[10px] text-[#00668e] font-[600]'>View Document</a>
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
        </>
    )
}
