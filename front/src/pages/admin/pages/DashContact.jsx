import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { DashAddContactBanner } from './dashboard contact/add/DashAddContactBanner'

export function DashContact() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaPhoneAlt />
                                <h1 className='font-[600] ms-2'>
                                    Contact Us
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Contact Us</span></p>
                            </div>
                        </section>

                        <DashAddContactBanner />
                        {/* <DashAddGoalsHeading />
                        <DashAddGoalsParagraph /> */}
                    </section>
                </section>
            </section>
        </>
    )
}
