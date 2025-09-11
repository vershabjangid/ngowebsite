import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Footer } from '../../../common/Footer'
import { Header } from '../../../common/Header'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { FaArrowRight, FaUser } from 'react-icons/fa6';
import { TbCertificate } from 'react-icons/tb'
import { Donation } from './Donation'
import { Loader } from '../../../common/Loader'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import { LiaIdCard } from 'react-icons/lia'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { BiDonateHeart } from 'react-icons/bi'
import { MdOutlineNotifications } from 'react-icons/md'

export function Home() {

    let [bannerdata, setbannerdata] = useState([])
    let [aboutdata, setaboutdata] = useState([])
    let [goalsdata, setgoalsdata] = useState([])
    let [homemanagement, sethomemanagement] = useState([])
    let [homemanagementprofiles, sethomemanagementprofiles] = useState([])
    let [homegallerydata, sethomegallerydata] = useState([])
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [homegalleryimagesdata, sethomegalleryimagesdata] = useState([])
    let [homegoalscardheading, sethomegoalscardheading] = useState([])
    let [homegoalscardparagraph, sethomegoalscardparagraph] = useState([])
    let [loader, setloader] = useState(false)
    let [imgurl, setimgurl] = useState([])

    let fetchalldata = async () => {
        try {
            let [homebannerdata, homeaboutdata, homegoalsdata, homemanagementdata, homemanagementprofilesdata, homegallerydata, homedonationdata, homegoalscarddata, homegalleryimagesdata, fetchcardparagraphheading, fetchcardparagraph, homegoalscardheadingdata] = await Promise.all([
                apiurl.get('/admin/view-home-banner'),
                apiurl.get('/admin/view-home-about-banner'),
                apiurl.get('/admin/view-home-goals'),
                apiurl.get('/admin/view-home-management-body'),
                apiurl.get('/admin/view-home-management-card'),
                apiurl.get('/admin/view-home-gallery'),
                apiurl.get('/admin/view-home-donation'),
                apiurl.get('/admin/view-goals-card'),
                apiurl.get('/admin/view-gallery'),
                apiurl.get('/admin/view-goals-paragraph-heading'),
                apiurl.get('/admin/view-goals-card-paragraph'),
                apiurl.get('/admin/view-goals-paragraph-heading')
            ])

            return {
                homebanner: homebannerdata.data.viewdata,
                imgurl: homebannerdata.data.imgurl,
                homeabout: homeaboutdata.data.viewdata,
                homegoals: homegoalsdata.data.viewdata,
                homemanagement: homemanagementdata.data.viewdata,
                homemanagementprofiles: homemanagementprofilesdata.data.viewdata,
                homegallery: homegallerydata.data.viewdata,
                homedonations: homedonationdata.data.viewdata,
                homegoalscard: homegoalscarddata.data.viewdata,
                homegalleryimages: homegalleryimagesdata.data.viewdata,
                fetchcardparagraphheadingdata: fetchcardparagraphheading.data.viewdata,
                fetchcardparagraphdata: fetchcardparagraph.data.viewdata,
                homegoalscardheading: homegoalscardheadingdata.data.viewdata,
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    let viewdata = () => {
        try {
            fetchalldata()
                .then((res) => {
                    setbannerdata(res.homebanner)
                    setimgurl(res.imgurl)
                    setaboutdata(res.homeabout)
                    setgoalsdata(res.homegoals)
                    sethomemanagementprofiles(res.homemanagementprofiles)
                    sethomemanagement(res.homemanagement)
                    sethomegallerydata(res.homegallery)
                    sethomegoalscarddata(res.homegoalscard)
                    sethomegalleryimagesdata(res.homegalleryimages)
                    sethomegoalscardheading(res.fetchcardparagraphheadingdata)
                    sethomegoalscardparagraph(res.fetchcardparagraphdata)
                    setloader(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        viewdata()
        window.scrollTo(0, 0)
        setloader(true)
    }, [])


    let [status, setstatus] = useState(0)
    return (
        <>
            {
                loader ?
                    <Loader />
                    :

                    <section className='main m-auto w-[100%] bg-[white]'>
                        <Header />
                        <section className='pt-[66px] bg-[black]'>
                        </section>
                        <section className='py-[10px] h-auto'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000, // 3 seconds per slide
                                    disableOnInteraction: false, // keep autoplay running on interaction
                                }}
                            >
                                {
                                    bannerdata.map((items, ind) => {
                                        return (
                                            <SwiperSlide>
                                                <section key={ind} className="Slide_home w-[100%] ">
                                                    <section className='w-[100%] pb-[10px] bg-[#ffffff] '>

                                                        <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                            <section className='Slider_content_section px-5 w-[48%]'>
                                                                <section>
                                                                    <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize'>{items.Home_Banner_Heading}</h1>
                                                                    <p className='home_banner_description text-[var(--primary-color--)] text-[20px] my-5'>{items.Home_Banner_Description}</p>
                                                                </section>

                                                                {
                                                                    getCookie('logintoken')
                                                                        ?
                                                                        null
                                                                        :
                                                                        <section className='slider_btn_section flex'>
                                                                            <a href='#donation_section' className='slider_btn bg-[var(--primary-color--)] p-2 px-4 rounded-[10px] text-white font-[600] flex items-center'>
                                                                                <p className=''>Donate Now</p>
                                                                            </a>

                                                                            <Link to={"/sign-up"} className='slider_btn border-[1px] border-[var(--primary-color--)] bg-[white]  p-2 px-4 rounded-[10px] text-[var(--primary-color--)] font-[600] flex items-center ms-2'>
                                                                                <p className='me-2'>Join Us</p> <FaArrowRight />
                                                                            </Link>
                                                                        </section>
                                                                }
                                                            </section>

                                                            <section className='home_banner_section w-[48%] flex items-center justify-center'>
                                                                <section className='home_banner w-[600px] h-[600px] border rounded-[10px]' style={{ backgroundImage: `url(${imgurl + items.Home_Banner_Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                                </section>
                                                            </section>
                                                        </section>
                                                    </section>
                                                </section>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </section>

                        <section className='counter_section w-[100%] flex justify-evenly text-[var(--primary-color--)] mt-8 px-1'>
                            <section className='flex items-center justify-center flex-col me-[40px]'>
                                <section className='text-[30px] mb-2 p-4 rounded-[20px] bg-[#bbbbbb30]'>
                                    <FaUser />
                                </section>
                                <section>
                                    <p className='counter_value text-[25px] font-[700] text-center'>2000<sup>+</sup> </p>
                                    <p className='counter_title text-[16px]  text-center'>Live Impacted</p>
                                </section>
                            </section>

                            <section className='flex items-center justify-center flex-col me-[40px]'>
                                <section className='text-[30px] mb-2 p-4 rounded-[20px] bg-[#bbbbbb30]'>
                                    <FaUser />
                                </section>
                                <section>
                                    <p className='counter_value text-[25px] font-[700] text-center'>2000<sup>+</sup> </p>
                                    <p className='counter_title text-center'>Live Impacted</p>
                                </section>
                            </section>

                            <section className='flex items-center justify-center flex-col'>
                                <section className='text-[30px] mb-2 p-4 rounded-[20px] bg-[#bbbbbb30]'>
                                    <FaUser />
                                </section>
                                <section>
                                    <p className='counter_value text-[25px] font-[700] text-center'>2000<sup>+</sup> </p>
                                    <p className='counter_title text-[16px] text-center'>Live Impacted</p>
                                </section>
                            </section>
                        </section>

                        {
                            aboutdata === null ?
                                null :
                                <section className='home_about_us w-[100%] py-[20px] px-[10px] flex justify-evenly items-center mt-8'>

                                    <section className='w-[45%] flex flex-col items-start'>
                                        <h2 className='home_about_heading text-[var(--primary-color--)] text-[35px] font-[700] capitalize w-auto '>
                                            {aboutdata.Home_About_Heading}

                                            <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] w-[0px]'></div>
                                        </h2>
                                        <p className='text-justify my-[15px] mb-[20px] leading-[25px] text-[16px]'>
                                            {aboutdata.Home_About_Description}
                                        </p>

                                        <Link to={"/about"} className='w-[160px] h-[50px] rounded-[30px] bg-[var(--primary-color--)] text-white font-[600] flex items-center justify-center'>
                                            Know More <FiArrowRight className='text-[20px] ms-3' />
                                        </Link>
                                    </section>


                                    <section className='w-[47%] flex justify-center items-center py-2'>
                                        <section className='w-[100%] flex'>
                                            <img src={imgurl + aboutdata.Home_About_Image} alt="" className=' w-[100%]  rounded-[20px]' />
                                        </section>
                                    </section>
                                </section>

                        }





                        <section className='quick_links_section px-[50px] mt-8'>
                            <h2 className='home_heading text-[var(--primary-color--)]  text-[35px] font-[700] text-center'>
                                Quick Links

                                <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] m-auto mt-1'></div>
                            </h2>
                            <p className=' my-[20px] mb-[30px] leading-[25px] text-[18px] text-center text-[grey]'>
                                Access key features in just one click—donate, volunteer, explore programs, and more
                            </p>
                            <section className='w-[100%]  flex justify-evenly flex-wrap'>
                                <section className='Quick_cards_sections w-[30%] shadow p-2 mb-5 rounded-[10px]'>
                                    <section className=''>
                                        <section className='bg-[#bbbbbb30] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-[30px] text-[var(--primary-color--)]'>
                                            <LiaIdCard />
                                        </section>
                                        <section className='text-[var(--primary-color--)]'>
                                            <p className='font-[600] mt-2'>ID Card</p>
                                        </section>
                                    </section>
                                    <section>
                                        <p className='text-[15px] mt-3 font-[500] text-[grey]'>Click on the view button to view and download your ID card instantly.</p>
                                        <div className='my-5'>
                                            <Link to={"/id-card"} className='px-3 py-3 border-[1px] border-[var(--primary-color--)] text-[14px]  font-[600] text-[var(--primary-color--)] rounded-[10px]'>
                                                View Details
                                            </Link>
                                        </div>
                                    </section>
                                </section>


                                <section className='Quick_cards_sections w-[30%] shadow p-2 mb-5 rounded-[10px]'>

                                    <section className=''>
                                        <section className='bg-[#bbbbbb30] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-[30px] text-[var(--primary-color--)]'>
                                            <HiOutlineClipboardList />
                                        </section>
                                        <section className='text-[var(--primary-color--)]'>
                                            <p className='font-[600] mt-2'>Appointment Letter</p>
                                        </section>
                                    </section>
                                    <section>
                                        <p className='text-[15px] mt-3 font-[500] text-[grey]'>Click on the view button to view and download your Appointment Letter instantly.</p>
                                        <div className='my-5'>
                                            <Link to={"/appointment-letter"} className='px-3 py-3 border-[1px] border-[var(--primary-color--)] text-[14px]  font-[600] text-[var(--primary-color--)] rounded-[10px]'>
                                                View Details
                                            </Link>
                                        </div>
                                    </section>
                                </section>


                                <section className='Quick_cards_sections w-[30%] shadow p-2 mb-5 rounded-[10px]'>
                                    <section className=''>
                                        <section className='bg-[#bbbbbb30] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-[30px] text-[var(--primary-color--)]'>
                                            <TbCertificate />
                                        </section>
                                        <section className='text-[var(--primary-color--)]'>
                                            <p className='font-[600] mt-2'>Certificates</p>
                                        </section>
                                    </section>
                                    <section>
                                        <p className='text-[15px] mt-3 font-[500] text-[grey]'>Click on the view button to view and download your Certificates instantly.</p>
                                        <div className='my-5'>
                                            <Link to={"/certificates"} className='px-3 py-3 border-[1px] border-[var(--primary-color--)] text-[14px]  font-[600] text-[var(--primary-color--)] rounded-[10px]'>
                                                View Details
                                            </Link>
                                        </div>
                                    </section>
                                </section>



                                <section className='Quick_cards_sections w-[30%] shadow p-2 mb-5 rounded-[10px]'>
                                    <section className=''>
                                        <section className='bg-[#bbbbbb30] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-[30px] text-[var(--primary-color--)]'>
                                            <MdOutlineNotifications />
                                        </section>
                                        <section className='text-[var(--primary-color--)]'>
                                            <p className='font-[600] mt-2'>Notices</p>
                                        </section>
                                    </section>
                                    <section>
                                        <p className='text-[15px] mt-3 font-[500] text-[grey]'>Click on the view button to view your Notices instantly.</p>
                                        <div className='my-5'>
                                            <Link to={"/notice"} className='px-3 py-3 border-[1px] border-[var(--primary-color--)] text-[14px]  font-[600] text-[var(--primary-color--)] rounded-[10px]'>
                                                View Details
                                            </Link>
                                        </div>
                                    </section>
                                </section>



                                <section className='Quick_cards_sections w-[30%] shadow p-2 mb-5 rounded-[10px]'>
                                    <section className=''>
                                        <section className='bg-[#bbbbbb30] w-[50px] h-[50px] rounded-[10px] flex items-center justify-center text-[30px] text-[var(--primary-color--)]'>
                                            <BiDonateHeart />
                                        </section>
                                        <section className='text-[var(--primary-color--)]'>
                                            <p className='font-[600] mt-2'>Donate Us</p>
                                        </section>
                                    </section>
                                    <section>
                                        <p className='text-[15px] mt-3 font-[500] text-[grey]'>Click on the Donate Us button to help instantly.</p>
                                        <div className='my-6'>
                                            <a href='#donation_section' className='px-3 py-4 border-[1px] border-[var(--primary-color--)] text-[14px] font-[600] text-[var(--primary-color--)] rounded-[10px]'>
                                                Donate Now
                                            </a>
                                        </div>
                                    </section>
                                </section>

                            </section>
                        </section>





                        {
                            goalsdata === null || homegoalscarddata.length === 0 ?
                                null :
                                <section className='about_us_section w-[100%] py-[20px] px-[50px] flex mt-8'>
                                    <section className='w-[100%] capitalize text-center'>
                                        <h2 className='home_heading text-[var(--primary-color--)]  text-[35px] font-[700]'>
                                            {goalsdata.Home_Goals_Heading}

                                            <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] m-auto mt-1'></div>
                                        </h2>
                                        <p className='text-justify my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                                            {goalsdata.Home_Goals_Description}
                                        </p>

                                        <section className='w-[100%] my-[10px] flex justify-evenly flex-wrap py-2'>
                                            {
                                                homegoalscarddata.length === 0 ?
                                                    null :
                                                    <section className='w-[100%] '>
                                                        <section className='w-[100%] flex justify-center '  >
                                                            <section className='home_goals_options w-[100%] overflow-x-scroll flex justify-start bg-[#f0f0f0] rounded-[15px] py-2'>
                                                                {
                                                                    homegoalscarddata.map((items, index) => {
                                                                        return (
                                                                            <section key={index} className={status === index ? ' font-[600] cursor-pointer  whitespace-nowrap px-2' : 'px-2 cursor-pointer  whitespace-nowrap font-[600]'} onClick={() => setstatus(index)}>
                                                                                <p className={status === index ? 'text-[12px] px-3 py-2 bg-[#ffffff] rounded-[10px] text-[var(--primary-color--)]' : ' text-[12px] px-3 py-2 rounded-[10px]'}>
                                                                                    {items.Home_Goals_Heading}
                                                                                </p>
                                                                            </section>
                                                                        )
                                                                    })
                                                                }
                                                            </section>
                                                        </section>

                                                        <section className='goals_content w-[100%] py-2 backdrop-blur'>
                                                            {
                                                                homegoalscarddata.map((items, index) => {
                                                                    return (
                                                                        <section key={index}>
                                                                            {
                                                                                status === index ?
                                                                                    <section className='home_our_goals_outer_section w-[100%] flex justify-between rounded-[20px] mb-[20px] mt-3'>
                                                                                        <section className='home_our_goals_section w-[100%] flex justify-between items-start rounded-[20px]'>
                                                                                            <section className='w-[40%] h-[auto] shadow rounded-[10px] flex bg-[white] p-4'>
                                                                                                <img src={imgurl + items.Home_Goals_Card_Icon} alt="" className=' w-[100%] h-[auto] rounded-[10px]' />
                                                                                            </section>
                                                                                            <section className='w-[58%] text-start'>
                                                                                                <p className='my-[5px] text-[18px] font-[600]'>
                                                                                                    {items.Home_Goals_Heading}
                                                                                                </p>
                                                                                                <p className='text-[14px]'>
                                                                                                    {items.Home_Goals_Description}
                                                                                                </p>

                                                                                                {
                                                                                                    homegoalscardheading.length === 0 ?
                                                                                                        null :
                                                                                                        homegoalscardheading.map((value, index) => {
                                                                                                            return (
                                                                                                                <section key={index} className='home_our_goals_content_section w-[100%]'>
                                                                                                                    {
                                                                                                                        value.Home_Card_Id === items._id ?
                                                                                                                            <p className='text-[16px] font-[600] mt-5 capitalize'>
                                                                                                                                {value.Home_Card_Paragraph_Heading}
                                                                                                                            </p>
                                                                                                                            : null
                                                                                                                    }

                                                                                                                    {
                                                                                                                        homegoalscardparagraph.length === 0 ?
                                                                                                                            null :
                                                                                                                            homegoalscardparagraph.map((data, index) => {
                                                                                                                                return (
                                                                                                                                    <section key={index}>
                                                                                                                                        {
                                                                                                                                            items._id === data.Home_Card_Content_Id && value._id === data.Home_Card_Content_Heading ?
                                                                                                                                                <li className='text-[14px] mt-1 mb-3 capitalize'>
                                                                                                                                                    {data.Home_Card_Content_Paragraph}
                                                                                                                                                </li> :
                                                                                                                                                null
                                                                                                                                        }
                                                                                                                                    </section>
                                                                                                                                )
                                                                                                                            })
                                                                                                                    }
                                                                                                                </section>
                                                                                                            )
                                                                                                        })
                                                                                                }
                                                                                            </section>

                                                                                        </section>
                                                                                    </section> :
                                                                                    null
                                                                            }
                                                                        </section>
                                                                    )
                                                                })
                                                            }


                                                        </section>
                                                    </section>
                                            }

                                        </section>
                                    </section>
                                </section>
                        }





                        {

                            homemanagement === null || homemanagementprofiles.length === 0 ?
                                null :
                                <section className='home_management_profile_section w-[100%] py-[20px] px-[50px] mt-8'>
                                    <section className='w-[100%] text-center'>
                                        <h2 className='capitalize text-[35px] font-[700] text-[var(--primary-color--)]'>
                                            {homemanagement.Home_Management_Heading}
                                            <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] m-auto mt-1 '></div>
                                        </h2>
                                        <p className='text-justify capitalize  my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                                            {homemanagement.Home_Management_Description}
                                        </p>
                                    </section>

                                    <section className='mt-2 w-[100%] flex justify-between'>
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={4}
                                            centeredSlides={homemanagementprofiles.length === 1 ? true : false}
                                            breakpoints={{
                                                1024: {
                                                    slidesPerView: 3,
                                                },
                                                768: {
                                                    slidesPerView: 2,
                                                },
                                                0: {
                                                    slidesPerView: 1,
                                                },
                                            }}
                                            className='w-[100%]'
                                        >
                                            {
                                                homemanagementprofiles.map((items, ind) => {
                                                    return (
                                                        <SwiperSlide className='w-[full] '>
                                                            <section className=" flex items-center justify-center py-[30px]">
                                                                <section className=' shadow h-[550px]  overflow-hidden rounded-[20px] p-2' >
                                                                    <section className='w-[100%] h-[400px] rounded-[20px] overflow-hidden'>
                                                                        <img src={imgurl + items.Home_Management_Profile_Picture} alt="" className='w-[100%] h-[100%] transition hover:scale-105' />
                                                                    </section>
                                                                    <section className='h-[100%] p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                        <p className='font-[700] text-[20px] capitalize'>{items.Home_Management_Profile_Name}</p>
                                                                        <p className='font-[600] text-[14px] text-[var(--primary-color--)] capitalize'>{items.Home_Management_Profile_Designation}</p>
                                                                        <p className='text-[12px] mt-2 text-[grey] capitalize'>{items.Home_Management_Profile_Description.slice(0, 180)} <Link className='text-[var(--primary-color--)] font-[600]' to={'/about'}>Readmore...</Link></p>
                                                                    </section>
                                                                </section>
                                                            </section>
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                    </section>
                                </section>
                        }



                        {

                            homegallerydata === null || homegalleryimagesdata.length === 0 ?
                                null :
                                <section className='home_gallery_section w-[100%] py-[20px] px-[50px] mt-8'>
                                    <section className='w-[100%] text-center'>
                                        <h2 className='home_heading text-[var(--primary-color--)] capitalize text-[35px] font-[700] '>
                                            {homegallerydata.Home_Gallery_Heading}
                                            <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] m-auto mt-1 '></div>
                                        </h2>
                                        <p className='text-justify capitalize  my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                                            {homegallerydata.Home_Gallery_Description}
                                        </p>
                                    </section>

                                    <section className='mt-2 w-[100%] flex justify-between items-start flex-wrap'>
                                        {
                                            homegalleryimagesdata.map((items, index) => {
                                                return (
                                                    index <= 5 ?
                                                        <section key={index} className="home_gallery_cards w-[32%] flex items-center justify-center py-2 px-[10px] mt-[20px]">
                                                            <section className='w-[100%] shadow m-auto rounded-[20px] overflow-hidden' >
                                                                <section className='w-[100%] h-[250px] flex items-center  overflow-hidden '>
                                                                    <img src={imgurl + items.Gallery_Event_Image} alt="" className='w-[100%] h-[100%] transition hover:scale-110' />
                                                                </section>
                                                                <section className='p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                    <p className='font-[700] text-[20px] text-[var(--primary-color--)] capitalize'>{items.Gallery_Event_Heading}</p>
                                                                    <p className='text-[12px] mt-2 text-[grey] capitalize'>{items.Gallery_Event_Description}</p>
                                                                </section>
                                                            </section>


                                                        </section> :
                                                        null
                                                )
                                            })
                                        }

                                    </section>
                                    <div className='flex justify-center m-auto'>
                                        <Link to={"/gallery"} className='bg-[var(--primary-color--)] text-white p-3 px-5 font-[600] m-auto mt-4 rounded-[10px] flex items-center'>
                                            View Gallery <FaArrowRight className='ms-2' />
                                        </Link>
                                    </div>
                                </section>
                        }


                        <Donation />
                        <Footer />
                    </section >
            }
        </>
    )
}
