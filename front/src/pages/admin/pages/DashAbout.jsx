import React from 'react'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { FaInfo } from 'react-icons/fa6'
import { DashAddParagraph } from './dashboard about/add/DashAddParagraph'
import { DashAddAboutBanner } from './dashboard about/add/DashAddAboutBanner'
import { DashAddAboutParagraph } from './dashboard about/add/DashAddAboutParagraph'

export function DashAbout() {
 
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaInfo />
                                <h1 className='font-[600] ms-2'>
                                    About Us
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>About Us</span></p>
                            </div>
                        </section>

                        <DashAddAboutBanner />
                        <DashAddParagraph />
                        <DashAddAboutParagraph/>
                    </section>
                </section>
            </section>
        </>
    )
}
