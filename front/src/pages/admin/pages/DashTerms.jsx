import React from 'react'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { LuClipboardList } from 'react-icons/lu'
import { DashAddTermsBanner } from './dashboard terms/add/DashAddTermsBanner'
import { DashAddTermsParagraph } from './dashboard terms/add/DashAddTermsParagraph'
import { DashAddTermsExtraParagraph } from './dashboard terms/add/DashAddTermsExtraParagraph'

export function DashTerms() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <LuClipboardList />
                                <h1 className='font-[600] ms-2'>
                                    Terms & Conditions
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Terms & Conditions</span></p>
                            </div>
                        </section>

                        <DashAddTermsBanner />
                        <DashAddTermsParagraph />
                        <DashAddTermsExtraParagraph />
                    </section>
                </section>
            </section>
        </>
    )
}
