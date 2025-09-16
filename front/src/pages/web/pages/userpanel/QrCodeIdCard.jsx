import React from 'react'
import { useParams } from 'react-router-dom'
import { FaEnvelope, FaLocationPin, FaRegAddressCard } from 'react-icons/fa6'
import { Logo } from '../../../../common/Logo'
import { FaPhoneAlt } from 'react-icons/fa'

export function QrCodeIdCard() {
    let { IdName, IdProfilePicture, IdDesignation, IdNo, IdMobile, IdEmail, IdCity } = useParams()
    return (
        <>
            <section className='w-[100%] h-[100vh] bg-[#f3f1f1]'>
                <section className='flex h-[calc(100%-75px)] border-t-[1px]'>
                    <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                        <section className=' w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <FaRegAddressCard />
                                <h1 className='font-[600] ms-2'>
                                    Id Card
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p className='text-[var(--primary-color--)]'>Here you can see your Id Card</p>
                            </div>
                        </section>

                        <section className='mt-[30px] flex justify-evenly flex-wrap py-2 '>
                            <section className='id_card w-[300px] rounded-[10px] bg-[white]  pt-2 mt-[10px]'>
                                <section className='w-[165px] m-auto mt-2 text-center'>
                                    <Logo />
                                </section>
                                {/* <section>
                                    <p className='text-center text-[16px] font-[600]'>RCMICCI</p>
                                </section> */}

                                <section className='flex justify-center mt-3'>
                                    <section className='w-[100px] h-[100px] rounded-[10px] overflow-hidden mt-3 flex items-center justify-center'>

                                        <img src={'http://194.238.22.240:5500/uploads/' + IdProfilePicture} alt="" className='w-[100%] h-[100%]' />

                                    </section>
                                </section>
                                <section>
                                    <p className='text-[17px] text-center mt-2 font-[600]'>{IdName}</p>
                                    <p className='text-[14px] text-center'>( {IdDesignation} )</p>
                                </section>


                                <section className='w-[100%]  mt-2'>

                                    <div className='flex px-2 p-1 text-[13px]'>
                                        <div className=''>
                                            <p className=' font-[600]'>ID.No : &nbsp;</p>
                                        </div>
                                        <div>
                                            <p>{IdNo}</p>
                                        </div>
                                    </div>

                                    <div className='flex px-2 pb-1 text-[13px]'>
                                        <div className=''>
                                            <p className=' font-[600]'> MOB.No : &nbsp;</p>
                                        </div>
                                        <div>
                                            <p>{IdMobile}</p>
                                        </div>
                                    </div>

                                    <div className='flex px-2 pb-1 text-[13px]'>
                                        <div className=''>
                                            <p className=' font-[600]'> Email : &nbsp;</p>
                                        </div>
                                        <div>
                                            <p>{IdEmail}</p>
                                        </div>
                                    </div>

                                    <div className='flex px-2 pb-1 text-[13px]'>
                                        <div className=''>
                                            <p className=' font-[600]'> City : &nbsp;</p>
                                        </div>
                                        <div>
                                            <p>{IdCity}</p>
                                        </div>
                                    </div>
                                </section>


                                <section className='w-[100%] mt-2 bg-[var(--primary-color--)] py-2 rounded-b-[10px] text-white'>
                                    <div className=' flex justify-evenly items-end'>
                                        <div className=' text-[11px]  font-[700] flex items-center'>
                                            <FaPhoneAlt />
                                            <p>&nbsp;&nbsp;+91 97182 77194</p>
                                        </div>

                                        <div className=' text-[11px] font-[700] flex items-center'>
                                            <FaEnvelope />
                                            <p>&nbsp;&nbsp;rcmicci@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className=' flex justify-evenly items-end mt-1'>
                                        <div className=' text-[11px] font-[700] flex px-2'>
                                            <FaLocationPin className='me-1' />
                                            <p>&nbsp;316, Park View Plaza, 32 Park Area, Ajmal Khan Road Karol Bagh, New Delhi-110005</p>
                                        </div>
                                    </div>

                                </section>

                            </section>

                            <section className='id_card w-[300px] rounded-[10px] bg-[white] mt-[10px]'>
                                <section className='w-[130px] m-auto mt-5 mb-[9px]'>
                                    <Logo />
                                </section>
                                <section className='text-center '>
                                    {/* <p className=' text-[16px] font-[600]'>RCMICCI</p> */}
                                    <p className='font-[500] text-[13px]'>rcmicci@gmail.com</p>
                                    <p className='font-[600] text-[16px] mt-1'>TERMS & CONDITIONS</p>
                                </section>

                                <section className='w-[100%] mt-[12.5px] flex justify-end items-start flex-col text-black'>
                                    <div className='mx-5 mt-3 text-[14px] text-justify '>
                                        <div className='flex mb-[4.5px]'>
                                            <div>
                                                <p className='font-[800]'>
                                                    IDENTIFICATION : <span className='font-[500]'>Carry the ID card at all times during working hours for identification purposes.</span>
                                                </p>

                                                <p className='font-[800] mt-[20px] mb-[45px]'>
                                                    AUTHORIZED USE : <span className='font-[500]'> The ID card is strictly for official use and should not be shared or used for unauthorized purposes.</span>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </section>

                                <section className='w-[100%] bg-[var(--primary-color--)] py-2 rounded-b-[10px] text-white'>
                                    <div className=' flex justify-evenly items-end'>
                                        <div className=' text-[11px]  font-[700] flex items-center'>
                                            <FaPhoneAlt />
                                            <p>&nbsp;&nbsp;+91 97182 77194</p>
                                        </div>

                                        <div className=' text-[11px] font-[700] flex items-center'>
                                            <FaEnvelope />
                                            <p>&nbsp;&nbsp;rcmicci@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className=' flex justify-evenly items-end mt-1'>
                                        <div className=' text-[11px] font-[700] flex px-2'>
                                            <FaLocationPin className='me-1' />
                                            <p>&nbsp;316, Park View Plaza, 32 Park Area, Ajmal Khan Road Karol Bagh, New Delhi-110005</p>
                                        </div>
                                    </div>

                                </section>
                            </section>
                        </section>


                    </section>
                </section>
            </section >
        </>
    )
}
