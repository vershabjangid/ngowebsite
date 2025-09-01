import React from 'react'
import { FaHome, FaInfo, FaPhoneAlt } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { GoGoal } from 'react-icons/go'
import { IoMdPhotos } from 'react-icons/io'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdOutlinePrivacyTip } from 'react-icons/md'

export function AdminSidebar() {
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

            <Link to={"/dash-home"} className='admin_side_options w-[100%] rounded-[20px] font-[600]    flex items-center p-3'>
                <FaHome className='me-2 text-[20px]' /> Home
            </Link>

            <Link to={"/dash-goals"} className='admin_side_options w-[100%] rounded-[20px] font-[600]   flex items-center p-3'>
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
            </Link>


            {/* <Link className='admin_side_options w-[100%]  flex items-center rounded-[20px] font-[600]   p-3'>
                <FaHome className='me-2 text-[20px]' /> Home
            </Link> */}

        </section>
    )
}
