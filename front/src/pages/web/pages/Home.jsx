import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Logo } from '../../../common/Logo'
import { Footer } from '../../../common/Footer'
import { QuickLinks } from '../../../pages/web/pages/QuickLinks'
import { Header } from '../../../common/Header'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { FaArrowRight } from 'react-icons/fa6';
import { CiHeart } from "react-icons/ci";
import { FixedOptionHeader } from '../../../common/FixedOptionHeader';
import Slider from 'react-slick'
import { TbUsersPlus } from 'react-icons/tb'
import { Donation } from './Donation'
import { Loader } from '../../../common/Loader'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export function Home() {

    let [bannerdata, setbannerdata] = useState([])
    let [aboutdata, setaboutdata] = useState([])
    let [goalsdata, setgoalsdata] = useState([])
    let [homemanagement, sethomemanagement] = useState([])
    let [homemanagementprofiles, sethomemanagementprofiles] = useState([])
    let [homegallerydata, sethomegallerydata] = useState([])
    let [hometeamprofiledata, sethometeamprofiledata] = useState([])
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [homegalleryimagesdata, sethomegalleryimagesdata] = useState([])
    let [homegoalscardheading, sethomegoalscardheading] = useState([])
    let [homegoalscardparagraph, sethomegoalscardparagraph] = useState([])
    let [loader, setloader] = useState(false)
    let [imgurl, setimgurl] = useState([])

    let fetchalldata = async () => {
        try {
            let [homebannerdata, homeaboutdata, homegoalsdata, homemanagementdata, homemanagementprofilesdata, homegallerydata, hometeamdata, hometeamprofiledata, homedonationdata, homegoalscarddata, homegalleryimagesdata, fetchcardparagraphheading, fetchcardparagraph, homegoalscardheadingdata] = await Promise.all([
                apiurl.get('/admin/view-home-banner'),
                apiurl.get('/admin/view-home-about-banner'),
                apiurl.get('/admin/view-home-goals'),
                apiurl.get('/admin/view-home-management-body'),
                apiurl.get('/admin/view-home-management-card'),
                apiurl.get('/admin/view-home-gallery'),
                apiurl.get('/admin/view-home-team'),
                apiurl.get('/admin/view-home-team-card'),
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
                hometeams: hometeamdata.data.viewdata,
                hometeamsprofiles: hometeamprofiledata.data.viewdata,
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
                    sethometeamprofiledata(res.hometeamsprofiles)
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



    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: "100%",
        height: "100%"
    };



    let [status, setstatus] = useState(0)
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='main m-auto w-[100%]'>
                        <Header />
                        <section className='slider_main w-[100%] h-[100vh] bg-[#00000079] relative' >
                            <FixedOptionHeader />
                            <Slider {...settings} className='w-[100%] h-[100%]'>
                                {
                                    bannerdata.map((items, ind) => {
                                        return (
                                            <section key={ind} className="Slide_home w-[100%]">
                                                <section className='w-[100%] h-[100vh]' style={{ backgroundImage: `url(${imgurl + items.Home_Banner_Image})`, backgroundSize: 'cover' }}>
                                                    <section className='Slide_home_overlay w-[100%] h-[100%] bg-[#0000005f] flex items-center justify-center'>
                                                        <section className='Slider_content_section px-5'>
                                                            <section className='w-[200px] m-auto'>
                                                                <Logo />
                                                            </section>

                                                            <section>
                                                                <h1 className='mt-[10px] text-white text-[40px] font-[700] text-center'>{items.Home_Banner_Heading}</h1>
                                                                <p className='text-white text-[18px] text-center'>{items.Home_Banner_Description}</p>
                                                            </section>

                                                            {
                                                                getCookie('logintoken')
                                                                    ?
                                                                    null
                                                                    :
                                                                    <section className='slider_btn_section mt-5 flex justify-center'>
                                                                        <a href='#donation_section' className='slider_btn bg-[#1385ff] p-4 px-6 rounded-[15px] text-white font-[600] flex items-center'>
                                                                            <CiHeart className='text-[20px]' />   <p className='ms-2'>Donate Now</p>
                                                                        </a>

                                                                        <Link to={"/sign-up"} className='slider_btn border-[1px] border-[#1385ff] bg-[white] p-4 px-6 rounded-[15px] text-[#1385ff] font-[600] flex items-center ms-2'>
                                                                            <TbUsersPlus className='text-[20px]' />   <p className='ms-2'>Become a member</p>
                                                                        </Link>
                                                                    </section>
                                                            }
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>

                                        )
                                    })
                                }
                            </Slider>
                        </section>


                        {
                            aboutdata === null ?
                                null :
                                <section className='home_about_us w-[100%] py-[50px] px-[10px] flex border-b-[1px] border-[#1385ff]'>
                                    <section className='w-[30%]  flex justify-center items-center py-2'>
                                        <section className='w-[80%] rounded-[10px] border-[1px] flex'>
                                            <img src={imgurl + aboutdata.Home_About_Image} alt="" className='home_about_image w-[100%] rounded-[10px]' />
                                        </section>
                                    </section>
                                    <section className='w-[70%] flex flex-col items-start'>
                                        <h2 className='home_about_heading text-[30px] font-[700] capitalize w-auto '>
                                            {aboutdata.Home_About_Heading}

                                            <div className='heading_hoverline border-b-[3px] border-[#1385ff] w-[0px]'></div>
                                        </h2>
                                        <p className='text-justify my-[15px] mb-[20px] leading-[25px] text-[16px]'>
                                            {aboutdata.Home_About_Description}
                                        </p>

                                        <Link to={"/about"} className='w-[160px] h-[50px] rounded-[30px] bg-[#1385ff] text-white font-[600] flex items-center justify-center'>
                                            Know More <FiArrowRight className='text-[20px] ms-3' />
                                        </Link>
                                    </section>
                                </section>

                        }

                        {
                            goalsdata === null || homegoalscarddata.length === 0 ?
                                null :
                                <section className='w-[100%] py-[20px] px-[10px]  flex'>
                                    <section className='w-[100%] capitalize text-center'>
                                        <h2 className='home_heading text-[30px] font-[700]'>
                                            {goalsdata.Home_Goals_Heading}

                                            <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1'></div>
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
                                                            <section className='home_goals_options w-[100%] overflow-x-scroll grid grid-flow-col border-b-[1px] border-[#00000029]'>
                                                                {
                                                                    homegoalscarddata.map((items, index) => {
                                                                        return (
                                                                            <section key={index} className={status === index ? ' text-[#ffffff] font-[600] cursor-pointer  px-[10px] mb-[20px]  whitespace-nowrap' : ' px-[10px] mb-[20px] cursor-pointer  whitespace-nowrap font-[600]'} onClick={() => setstatus(index)}>
                                                                                <p className={status === index ? 'my-[5px] text-[14px] border-[1px] border-[#1385ff] rounded-[30px] p-3 bg-[#1385ff]' : 'my-[5px] text-[14px] border-[1px] border-[#000000] rounded-[30px] p-3'}>
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
                                                                                    <section className='home_our_goals_outer_section w-[100%] flex justify-between rounded-[20px] mb-[20px]'>
                                                                                        <section className='home_our_goals_section w-[100%] flex justify-between p-[10px] rounded-[20px]'>
                                                                                            <section className='w-[40%] shadow rounded-[10px] border-[1px] flex'>
                                                                                                <img src={imgurl + items.Home_Goals_Card_Icon} alt="" className=' w-[100%] h-auto rounded-[10px]' />
                                                                                            </section>
                                                                                            <section className='w-[58%] text-start'>
                                                                                                <p className='my-[5px] text-[20px] font-[600]'>
                                                                                                    {items.Home_Goals_Heading}
                                                                                                </p>
                                                                                                <p className='text-[16px]'>
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
                                                                                                                                                <li className='text-[15px] mt-1 mb-3 capitalize'>
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
                                <section className='home_management_profile_section w-[100%] py-[20px] px-[10px]  '>
                                    <section className='w-[100%] text-center'>
                                        <h2 className='home_heading capitalize text-[30px] font-[700] text-[#1385ff]'>
                                            {homemanagement.Home_Management_Heading}
                                            <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1 '></div>
                                        </h2>
                                        <p className='text-justify capitalize  my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                                            {homemanagement.Home_Management_Description}
                                        </p>
                                    </section>

                                    <section className='mt-2 w-[100%] flex justify-between'>
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={4}
                                            breakpoints={{

                                                1224: {
                                                    slidesPerView: 4,
                                                },
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
                                                                <section className='home_management_card h-[480px]  overflow-hidden rounded-[20px]' >
                                                                    <section className='w-[100%] h-[300px] rounded-b-[10px]'>
                                                                        <img src={imgurl + items.Home_Management_Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                                    </section>
                                                                    <section className='h-[100%] p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                        <p className='font-[700] text-[20px] capitalize'>{items.Home_Management_Profile_Name}</p>
                                                                        <p className='font-[600] text-[14px] text-[#1385ff] capitalize'>{items.Home_Management_Profile_Designation}</p>
                                                                        <p className='text-[12px] mt-2 text-[grey] capitalize'>{items.Home_Management_Profile_Description.slice(0, 180)} <Link className='text-[#3970de] font-[600]' to={'/about'}>Readmore...</Link></p>
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
                                <section className=' w-[100%] py-[20px] px-[10px] '>
                                    <section className='w-[100%] text-center'>
                                        <h2 className='home_heading capitalize text-[30px] font-[700] '>
                                            {homegallerydata.Home_Gallery_Heading}
                                            <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1 '></div>
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
                                                            <section className='home_management_card w-[100%] shadow m-auto overflow-hidden rounded-[20px]' >
                                                                <section className='w-[100%] h-[250px] rounded-b-[10px]'>
                                                                    <img src={imgurl + items.Gallery_Event_Image} alt="" className='w-[100%] h-[100%]' />
                                                                </section>
                                                                <section className='p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                    <p className='font-[700] text-[20px] capitalize'>{items.Gallery_Event_Heading}</p>
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
                                        <Link to={"/gallery"} className='bg-[#1385ff] text-white p-3 px-5 font-[600] m-auto mt-4 rounded-[10px] flex items-center'>
                                            View Gallery <FaArrowRight className='ms-2' />
                                        </Link>
                                    </div>
                                </section>
                        }


                        {/* {

                    hometeamdata === null || hometeamprofiledata.length === 0 ?
                        null :
                        <section className='home_management_profile_section w-[100%] py-[20px] px-[10px] border-b-[1px] border-[black]'>
                            <section className='w-[100%] text-center'>
                                <h2 className='home_heading capitalize text-[30px] font-[700] text-[#1385ff]'>
                                    {hometeamdata.Home_Team_Member_Heading}
                                    <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1 '></div>
                                </h2>
                                <p className='text-justify capitalize  my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                                    {hometeamdata.Home_Team_Member_Description}
                                </p>
                            </section>

                            <section className='mt-2 w-[100%] '>
                                <Slider {...managementsettings} className='w-[100%] h-[100%]'>
                                    {
                                        hometeamprofiledata.map((items, ind) => {
                                            return (
                                                <section className="w-[30%] flex items-center justify-center py-[30px]">
                                                    <section className='home_management_card w-[300px] border-[1px] border-[black] m-auto overflow-hidden rounded-[20px]' >
                                                        <section className='w-[100%] h-[300px] rounded-b-[10px]'>
                                                            <img src={imgurl + items.Home_Team_Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                        </section>
                                                        <section className='p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                            <p className='font-[700] text-[20px] capitalize'>{items.Home_Team_Profile_Name}</p>
                                                            <p className='font-[600] text-[14px] text-[#1385ff] capitalize'>{items.Home_Team_Profile_Designation}</p>
                                                            <p className='text-[12px] mt-2 text-[grey] capitalize'>{items.Home_Team_Profile_Description}</p>
                                                        </section>
                                                    </section>
                                                </section>
                                            )
                                        })
                                    }
                                </Slider>
                            </section>
                        </section>

                } */}
                        <QuickLinks />
                        <Donation />
                        <Footer />
                    </section >
            }
        </>
    )
}