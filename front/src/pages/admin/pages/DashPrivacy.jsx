import React from 'react'
import { DashAddPrivacyBanner } from './dashboard privacy/add/DashAddPrivacyBanner'
import { DashAddPrivacyExtraParagraph } from './dashboard privacy/add/DashAddPrivacysExtraParagraph'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import { DashAddPrivacyParagraph } from './dashboard privacy/add/DashAddPrivacyParagraph'

export function DashPrivacy() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <MdOutlinePrivacyTip />
                                <h1 className='font-[600] ms-2'>
                                    Privacy Policy
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Privacy Policy</span></p>
                            </div>
                        </section>

                        <DashAddPrivacyBanner />
                        <DashAddPrivacyParagraph />
                        <DashAddPrivacyExtraParagraph />
                    </section>
                </section>
            </section>
        </>
    )
}
