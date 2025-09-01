import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardLine } from 'react-icons/ri'
import { FaRegAddressCard } from 'react-icons/fa6'
import { GrCopy } from 'react-icons/gr'
import { LiaCertificateSolid } from 'react-icons/lia'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsCurrencyDollar } from 'react-icons/bs'
import { IoReceiptOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { LuUserCheck } from 'react-icons/lu'


export function Sidebar() {
    return (
        <>
            <section className='user_admin_sidebar w-[275px] h-[100%] bg-[#ffffff] p-2 overflow-y-scroll'>
                <Link to={"/membership"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <LuUserCheck className='me-2 text-[20px]' /> Membership
                </Link>

                <Link to={"/user-dashboard"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <RiDashboardLine className='me-2 text-[20px]' /> Dashboard
                </Link>

                <Link to={"/id-card"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <FaRegAddressCard className='me-2 text-[20px]' /> ID Card
                </Link>

                <Link to={"/appointment-letter"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <GrCopy className='me-2 text-[20px]' /> Appointment Letter
                </Link>

                <Link to={"/certificates"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <LiaCertificateSolid className='me-2 text-[20px]' /> Certificates
                </Link>

                <Link to={"/notice"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <IoMdNotificationsOutline className='me-2 text-[20px]' /> Notices
                </Link>

                <Link to={"/donate-us"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <BsCurrencyDollar className='me-2 text-[20px]' /> Donate Us
                </Link>

                <Link to={"/transactions"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <IoReceiptOutline className='me-2 text-[20px]' /> Transactions
                </Link>

                <Link to={"/profile"} className='admin_side_options w-[100%] rounded-[10px] font-[600] mt-1 flex items-center p-3'>
                    <CgProfile className='me-2 text-[20px]' /> Profile
                </Link>
            </section>
        </>
    )
}
