import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { FaQuestion, FaRegBell } from 'react-icons/fa6'
import { MdOutlineDashboard } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import { LiaCertificateSolid } from 'react-icons/lia'
import { BsCurrencyDollar } from 'react-icons/bs'

export function WebAdminSidebar() {
    return (
        <section className='admin_sidebar w-[300px] h-[100%] px-2 overflow-y-scroll bg-[white]'>
            <div className='flex  items-center my-3'>
                <div className='w-[200px]'>
                    <Logo />
                </div>

                {/* <div className='ms-2'>
                    <p className='text-[10px] font-[600]'>RESERVE CATEGORY & MINORITY</p>
                    <p className='text-[8px]'>INDIAN CHAMBER OF COMMERCE & INDUSTRY</p>
                </div> */}
            </div>
            {/* <Link to={"/dashboard"} className='admin_side_options w-[100%] rounded-[20px] font-[600]  flex items-center p-3'>
                <LuLayoutDashboard className='me-2 text-[20px]' /> Dashboard
            </Link> */}

            <Link to={"/dashboard"} className='admin_side_options w-[100%] rounded-[20px] font-[600]    flex items-center p-3'>
                <MdOutlineDashboard className='me-2 text-[20px]' /> Dashboard
            </Link>

            <Link to={"/dash-notice"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <FaRegBell className='me-2 text-[20px]' /> Notices
            </Link>

            <Link to={"/dash-users"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <FiUser className='me-2 text-[20px]' /> Users
            </Link>


            <Link to={"/dash-certificates"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <LiaCertificateSolid className='me-2 text-[20px]' /> Cerificates
            </Link>


            <Link to={"/dash-transactions"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <BsCurrencyDollar className='me-2 text-[20px]' /> Transactions
            </Link>


            <Link to={"/dash-queries"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <FaQuestion className='me-2 text-[20px]' /> Queries
            </Link>

            {/* <Link to={"/dash-goals"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <GoGoal className='me-2 text-[20px]' /> Goals
            </Link>

            <Link to={"/dash-gallery"} className='admin_side_options w-[100%] rounded-[20px] font-[600]    flex items-center p-3'>
                <IoMdPhotos className='me-2 text-[20px]' /> Gallery
            </Link>



            <Link to={"/dash-about"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <FaInfo className='me-2 text-[20px]' /> About  Us
            </Link>

            <Link to={"/dash-news"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <IoNewspaperOutline className='me-2 text-[20px]' /> News & Events
            </Link>


            <Link to={"/dash-contact"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <FaPhoneAlt className='me-2 text-[20px]' /> Contact Us
            </Link>

           
            <Link to={"/dash-terms"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
                <LuClipboardList className='me-2 text-[20px]' /> Terms & Conditions
            </Link>


            <Link to={"/dash-privacy"} className='admin_side_options w-[100%]  flex items-center rounded-[20px] font-[600]   p-3'>
                <MdOutlinePrivacyTip className='me-2 text-[20px]' /> Privacy Policy
            </Link> */}


            {/* <Link className='admin_side_options w-[100%]  flex items-center rounded-[20px] font-[600]   p-3'>
                <FaHome className='me-2 text-[20px]' /> Home
            </Link> */}

        </section>
    )
}
