import React from 'react'
import { AdminHeader } from '../../../common/AdminHeader'
import { AdminSidebar } from '../../../common/AdminSidebar'

export function Dashboard() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />
                </section>
            </section>
        </>
    )
}
