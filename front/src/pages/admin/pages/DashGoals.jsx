import React from 'react'
import { AdminSidebar } from '../../../common/AdminSidebar'
import { AdminHeader } from '../../../common/AdminHeader'
import { GoGoal } from 'react-icons/go'
import { DashAddGoals } from './dashboard goals/add/DashAddGoals'
import { DashAddGoalsHeading } from './dashboard goals/add/DashAddGoalsHeading.'
import { DashAddGoalsParagraph } from './dashboard goals/add/DashAddGoalsParagraph'

export function DashGoals() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <GoGoal />
                                <h1 className='font-[600] ms-2'>
                                    Goals
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Goals</span></p>
                            </div>
                        </section>

                        <DashAddGoals />
                        <DashAddGoalsHeading />
                        <DashAddGoalsParagraph />
                    </section>
                </section>
            </section>
        </>
    )
}
