import React from 'react'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { FaRegBell } from 'react-icons/fa6'
import { DashAddNotices } from './web dashboard notices/add/DashAddNotices'
import { DashSendPersonalNotice } from './web dashboard notices/add/DashSendPersonalNotice'

export function WebDashboardNotice() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <WebAdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <WebAdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaRegBell />
                                <h1 className='font-[600] ms-2'>
                                    Notice
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Notice</span></p>
                            </div>
                        </section>

                        <DashAddNotices />
                        <DashSendPersonalNotice />
                    </section>
                </section>
            </section>
        </>
    )
}
