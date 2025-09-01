import React from 'react'
import { AdminHeader } from '../../../common/AdminHeader'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { FaHome } from 'react-icons/fa'
import { DashAddHomeBanner } from './dashboard home/add/DashAddHomeBanner'
import { DashAddHomeAbout } from './dashboard home/add/DashAddHomeAbout'
import { DashAddHomeGoals } from './dashboard home/add/DashAddHomeGoals'
import { DashAddHomeManagement } from './dashboard home/add/DashAddHomeManagement'
import { DashAddHomeManagementCard } from './dashboard home/add/DashAddHomeManagementCard'
import { DashAddHomeGallery } from './dashboard home/add/DashAddHomeGallery'
import { DashAddHomeTeamMember } from './dashboard home/add/DashAddHomeTeamMember'
import { DashAddHomeTeamCard } from './dashboard home/add/DashAddHomeTeamCard'
import { DashAddHomeDonation } from './dashboard home/add/DashAddHomeDonation'

export function DashHome() {
  
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaHome />
                                <h1 className='font-[600] ms-2'>
                                    Home
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Home</span></p>
                            </div>
                        </section>

                        <DashAddHomeBanner />
                        <DashAddHomeAbout />
                        <DashAddHomeGoals />
                        <DashAddHomeManagement />
                        <DashAddHomeManagementCard />
                        <DashAddHomeGallery />
                        <DashAddHomeTeamMember />
                        <DashAddHomeTeamCard />
                        <DashAddHomeDonation />
                    </section>
                </section>
            </section>
        </>
    )
}
