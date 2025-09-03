import React, { useState } from 'react'
import { FaRegCircleXmark } from 'react-icons/fa6'
import idcard from '../../../images/426327.png'
import appointment from '../../../images/9033709.png'
import certificate from '../../../images/certificate.png'
import donate from '../../../images/donate.png'
import profile from '../../../images/profile.png'
import { Link } from 'react-router-dom'


export function QuickLinks() {
    let [quick, setquick] = useState(false)
    return (
        <>
            {
                quick ?
                    <section className='quick_links_btn z-[999999] fixed bottom-[5%] right-[2%] flex flex-col items-end '>
                        <section className='mb-[10px] text-right '>
                            <ul>
                                <li className=''>
                                    <Link to={"/id-card"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2 '>
                                        ID Card
                                        <div className='w-[40px] h-[40px] rounded-[50%] bg-[white] ms-2'>
                                            <img src={idcard} alt="" />
                                        </div>
                                    </Link>
                                </li>

                                <li className=''>
                                    <Link to={"/appointment-letter"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                        Appointment Letter
                                        <div className='w-[40px] h-[40px] rounded-[50%] bg-[white] ms-2'>
                                            <img src={appointment} alt="" />
                                        </div>
                                    </Link>
                                </li>

                                <li className=''>
                                    <Link to={"/certificates"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                        Certificate
                                        <div className='w-[40px] h-[40px] rounded-[50%] bg-[white] ms-2'>
                                            <img src={certificate} alt="" />
                                        </div>
                                    </Link>
                                </li>

                                <li className=''>
                                    <a href='#donation_section' className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                        Donate
                                        <div className='w-[40px] h-[40px] rounded-[50%] bg-[white] ms-2'>
                                            <img src={donate} alt="" />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </section>
                        <section className=' w-[150px] z-[99999] bg-[white] rounded-[50px] p-[10px] flex justify-between items-center cursor-pointer border-[2px] border-[black]' onClick={() => setquick(false)}>
                            <p className='text-center text-[20px] font-[600]'>Close  </p><FaRegCircleXmark className='text-[30px]' />
                        </section>
                    </section>
                    :
                    <section className='quick_links_btn z-[9999] fixed bottom-[5%] right-[2%] w-[150px] bg-[white] rounded-[50px] py-[10px] cursor-pointer border-[2px] border-[black]' onClick={() => setquick(true)}>
                        <p className='text-center text-[20px] font-[600]'>Quick Links</p>
                    </section>
            }

            <section className='bottom_quick_Links fixed z-[9999] w-[100%] hidden pt-3 bg-[white] left-0 bottom-0 rounded-t-[50px]'>
                <section className='w-[100%]'>
                    <ul className='flex justify-evenly w-[100%]'>
                        <li className=''>
                            <Link to={"/id-card"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2 '>
                                <div className='w-[40px] h-[40px]  rounded-[50%] bg-[white]'>
                                    <img src={idcard} alt="" />
                                </div>
                            </Link>
                        </li>

                        <li className=''>
                            <Link to={"/appointment-letter"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                <div className='w-[40px] h-[40px] rounded-[50%] bg-[white]'>
                                    <img src={appointment} alt="" />
                                </div>
                            </Link>
                        </li>

                        <li className=''>
                            <Link to={"/certificates"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                <div className='w-[40px] h-[40px] rounded-[50%] bg-[white]'>
                                    <img src={certificate} alt="" />
                                </div>
                            </Link>
                        </li>

                        <li className=''>
                            <a href='#donation_section' className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                <div className='w-[40px] h-[40px] rounded-[50%] bg-[white]'>
                                    <img src={donate} alt="" />
                                </div>
                            </a>
                        </li>

                        <li className=''>
                            <Link to={"/profile"} className='flex justify-end items-center text-[#1385ff] text-[18px] font-[600] mb-2'>
                                <div className='w-[40px] h-[40px] rounded-[50%] bg-[white]'>
                                    <img src={profile} alt="" />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>
            </section>
        </>
    )
}
