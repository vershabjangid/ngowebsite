import React from 'react'
import { Logo } from './Logo'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { ContactInfo } from './ContactInfo'

export function Footer() {
    return (
        <>
            <footer className='w-[100%] p-[20px] py-[40px] bg-[black] text-white flex justify-between flex-wrap'>
                <section className='flex justify-center  flex-col'>
                    <section className='w-[250px]'>
                        <section className='w-[200px]'>
                            <Logo />
                        </section>
                        <p className='text-[14px] w-[100%] decoration-none mt-5 p-0'>Creating sustainable change in communities worldwide through education, healthcare, clean water access, and disaster relief programs.</p>
                    </section>

                    <p className='mt-[20px] text-[20px]'>Follow US ON</p>
                    <section className='mt-[10px]'>
                        <section className='flex'>
                            <a href="https://www.facebook.com/tfgti.ind">
                                <FaFacebook className='text-[25px]' />
                            </a>

                            <a href="https://x.com/tfgtrustofindia">
                                <FaTwitter className='text-[25px] ms-5' />
                            </a>


                            <a href="https://www.instagram.com/tfgti/">
                                <FaInstagram className='text-[25px] ms-5' />
                            </a>

                            <a href="https://www.linkedin.com/in/the-full-gospel-trust-of-india/">
                                <FaLinkedin className='text-[25px] ms-5' />
                            </a>

                            {/* <a href="https://youtube.com/@rcmicci9139?si=HlMYvSjnDgRhVX0c">
                                <FaYoutube className='text-[25px] mx-5' />
                            </a> */}

                        </section>
                    </section>
                </section>

                <section className='flex justify-center items-start flex-col ms-5'>
                    <p className='text-[20px] font-[600]'>Pages</p>
                    <section className='mt-[10px]'>
                        <section className=''>
                            <Link to={"/"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Home
                            </Link>

                            <Link to={"/about"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> About Us
                            </Link>


                            <Link to={"/contact-us"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Contact Us
                            </Link>


                            <Link to={"/gallery"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Gallery
                            </Link>

                            <Link to={"/news"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> News & Events
                            </Link>


                            <Link to={"/terms-conditions"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Terms & Conditions
                            </Link>


                            <Link to={"/privacy-policy"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Privacy Policy
                            </Link>


                        </section>
                    </section>
                </section>


                <section className=' flex-col ms-5'>
                    <p className='text-[20px] font-[600]'>Quick Links</p>
                    <section className='mt-[10px]'>
                        <section className=''>
                            <Link to={"/id-card"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> ID Card
                            </Link>

                            <Link to={"/certificates"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Certificates
                            </Link>


                            <Link to={"/appointment-letter"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Appointment Letter
                            </Link>




                            <Link to={"/donate-us"} className='flex mb-[10px]'>
                                <MdKeyboardArrowRight className='text-[25px]' /> Donate Us
                            </Link>

                        </section>

                    </section>

                </section>



                <section className='w-[350px] text-[14px] ms-5'>
                    <p className='mb-[20px] font-[600] text-[20px]'>
                        Contact Information
                    </p>
                    <ContactInfo />
                </section>



            </footer>
            <section className='footer_company_label w-[100%] bg-[black] text-white py-3 border-t-[1px] text-center'>
                <p>Developed by <a href="https://secureworldtech.com/" className='border-b-[1px]'>SecureworldTech</a></p>
            </section>
        </>
    )
}
