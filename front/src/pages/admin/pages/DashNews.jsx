import React from 'react'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { IoNewspaperOutline } from 'react-icons/io5'
import { DashAddNewsBanner } from './dashboard news/add/DashAddNewsBanner'
import { DashAddNews } from './dashboard news/add/DashAddNews'

export function DashNews() {
    return (
        <>
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
                                <p>Dashboard / <span className='text-[#1385ff]'>News & Events</span></p>
                            </div>
                        </section>

                        <DashAddNewsBanner />
                        <DashAddNews />
                    </section>
                </section>
            </section>
        </>
    )
}
