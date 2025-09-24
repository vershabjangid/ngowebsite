import React, { useContext, useRef } from 'react'
import { Header } from '../../../../common/Header';
import { UserContext } from '../Context/UserDataContext';
import { useReactToPrint } from 'react-to-print';
import { Sidebar } from '../../../../common/Sidebar';
import { FaDownload, FaEnvelope } from 'react-icons/fa6';
import { Logo } from '../../../../common/Logo';
import { FaPhoneAlt } from 'react-icons/fa';
import { GrCopy } from 'react-icons/gr';
import DateFormat from '../../../../common/DateFormat';
import QRCode from 'react-qr-code';
import { Signature } from '../../../../common/Signature';
export function AppointmentLetter() {
    let { user } = useContext(UserContext)
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <>
            <section className='w-[100%] h-[100vh] bg-[#f3f1f1]'>
                <Header />

                <section className='flex h-[calc(100%-93px)] border-t-[1px] mt-2 overflow-y-scroll'>
                    <Sidebar />
                    <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                        <section className=' w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <GrCopy />
                                <h1 className='font-[600] ms-2'>
                                    Appointment Letter
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p className='text-[var(--primary-color--)]'>Here you can see your appointment letter</p>
                            </div>
                        </section>

                        {
                            user[0] === null || user[0] === undefined || user[0].Address === undefined ? null :
                                <section className='text-black w-[100%] flex justify-center h-auto my-[10px]'>
                                    <button className='text-[16px] py-3 px-3 rounded-[10px] border-[1px] bg-[var(--primary-color--)] text-white flex items-center' onClick={reactToPrintFn}><FaDownload className='me-2' /> DOWNLOAD AND PRINT</button>
                                </section>
                        }

                        <section className='mt-[30px] flex justify-evenly flex-wrap py-2 ' ref={contentRef}>
                            <section className=' w-[99%] rounded-[10px] bg-[white]  pt-2 mt-[10px]'>
                                <section className='appiontment_letter_heading_section flex justify-between'>
                                    <section className='ms-2'>
                                        <section className=' w-[150px] mt-2 mb-4'>
                                            <Logo />
                                        </section>
                                        <section className=''>
                                            {/* <p className=' text-[18px] font-[600]'>RCMICCI</p> */}
                                            <p className='font-[500] text-[16px] mt-1'>info@balkrishnam.org</p>
                                            <p className='font-[500] text-[16px] mt-1 px-1'>Jalori Gate, Jodhpur, Rajasthan, India</p>
                                        </section>
                                    </section>

                                    {
                                        user[0] === null || user[0] === undefined ?
                                            null :
                                            <section className='w-[95px] h-[95px]  me-2 rounded-[5px]  mt-3 flex items-center justify-center'>
                                                <QRCode
                                                    value={`http://194.238.22.240:3001/qr-appointment-letter/${user[0].Full_Name}/${user[0].Address}`}
                                                    width={100}
                                                    height={100}
                                                    bgColor='white'
                                                    fgColor='var(--primary-color--)'
                                                />
                                            </section>
                                    }
                                </section>
                                <section className='w-[100%] overflow-hidden text-[24px] py-1 text-white m-auto mt-5 font-[600] flex items-center justify-center bg-[var(--primary-color--)] text-center'>
                                    <p> Appointment Letter</p>
                                </section>

                                <section className='px-2 mt-[20px] font-[500]'>
                                    <p className='text-[15px] mt-2 font-[600]'>To,</p>
                                    <p className='text-[15px] mt-[5px]'>{user[0] === null || user[0] === undefined ? "No Data Found" : user[0].Full_Name}</p>
                                    <p className='text-[14px] mt-[5px]'>Address: {user[0] === null || user[0] === undefined ? "No Data Found" : user[0].Address} </p>
                                    <p className='text-[14px] mt-[5px] font-[600]'>Date: <span className='font-[500]'> <DateFormat value={Date.now()} /></span> </p>
                                    <p className='text-[14px] mt-[30px] font-[600]'>Dear Mr.: <span className='font-[500]'> {user[0] === null || user[0] === undefined ? "No Data Found" : user[0].Full_Name}</span> </p>
                                    <p className='text-[14px] mt-[10px]'>We are thrilled to extend an invitation to you to become a member of our organization. On behalf of our entire team, we warmly welcome you to our organization.</p>
                                    <p className='text-[14px] mt-[10px]'>Your commitment to our cause and your passion for making a difference in the community have not gone unnoticed. We believe that your involvement will greatly contribute to our efforts in our mission.</p>
                                    <p className='text-[14px] mt-[10px]'>As a member, you will have the opportunity to participate in our various initiatives, events, and projects aimed at our organization. Your input and contributions will be invaluable in advancing our mission and creating positive change.</p>
                                    <p className='text-[14px] mt-[10px]'>In addition to actively participating in our programs, as a member, you will also enjoy exclusive benefits, including:</p>
                                    <ul className='text-[14px] mt-[15px]'>
                                        <li>1) Access to members-only events and workshops</li>
                                        <li>2) Networking opportunities with like-minded individuals and organizations</li>
                                        <li>3) Regular updates and newsletters on our projects and initiatives</li>
                                        <li>4) Opportunities for professional development and growth within the organization</li>
                                    </ul>
                                    <p className='text-[14px] mt-[10px]'>We are excited to have you on board and look forward to your active participation and collaboration. Should you have any questions or require further information, please do not hesitate to contact our membership coordinator.</p>
                                    <p className='text-[14px] mt-[10px]'>Once again, welcome to our organization. Together, we can make a meaningful impact and create positive change in our community.</p>

                                    <Signature/>
                                    <p className='text-[14px] mt-[10px]'>Yours’ sincerely</p>
                                    <p className='text-[14px] mt-[5px]'>Dr.Prakash Singaria</p>
                                    <p className='text-[14px] mt-[5px]'>( Director / Founder )</p>
                                    <p className='text-[14px] mt-[5px]'>Balkrishnam International Foundation</p>
                                </section>

                                <div className=' flex justify-evenly items-end mt-[40px]'>
                                    <div className=' text-[15px] font-[700] flex px-2 text-center'>
                                        <p> Jalori Gate, Jodhpur, Rajasthan, India</p>
                                    </div>
                                </div>

                                <section className='w-[100%] mt-2 bg-[var(--primary-color--)] py-2 rounded-b-[10px] text-white'>
                                    <div className=' flex justify-evenly items-end flex-wrap'>
                                        <div className=' text-[15px] font-[700] flex items-center'>
                                            <FaPhoneAlt />
                                            <p>&nbsp;&nbsp;+91 85600 26002</p>
                                        </div>

                                        <div className=' text-[15px] font-[700] flex items-center  mt-2'>
                                            <FaEnvelope />
                                            <p>&nbsp;&nbsp;info@balkrishnam.org</p>
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
