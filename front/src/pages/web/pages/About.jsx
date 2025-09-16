import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Loader } from '../../../common/Loader'
import { Logo } from '../../../common/Logo'
import { FaChevronRight } from 'react-icons/fa6'
export function About() {
    let [aboutbannerdata, setaboutbannerdata] = useState([])
    let [aboutparagraph, setaboutparagraph] = useState([])
    let [aboutextraparagraph, setaboutextraparagraph] = useState([])
    let [imageurl, setimageurl] = useState([])
    let [loader, setloader] = useState(false)


    let fetchalldata = async () => {
        try {
            let [aboutbanner, aboutparagraphsection, extraaboutparagraphsection] = await Promise.all([
                apiurl.get('/admin/view-about-banner-section'),
                apiurl.get('/admin/view-about-paragraph-section'),
                apiurl.get('/admin/view-about-extra-paragraph')
            ])
            return {
                aboutbannerdata: aboutbanner.data.viewdata,
                aboutparagraphsectiondata: aboutparagraphsection.data.viewdata,
                extraaboutparagraphsectiondata: extraaboutparagraphsection.data.viewdata,
                imgurl: aboutbanner.data.imgurl
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
                    setaboutbannerdata(res.aboutbannerdata)
                    setaboutparagraph(res.aboutparagraphsectiondata)
                    setaboutextraparagraph(res.extraaboutparagraphsectiondata)
                    setimageurl(res.imgurl)
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
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='main m-auto w-[100%]'>
                        <Header />
                        <section className='pt-[66px]'>
                        </section>
                        {
                            aboutbannerdata === null ?
                                null :
                                aboutbannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imageurl + items.About_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <section className='bg-[#000000ac] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>About Us</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  About Us</span>  </p>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }
                        {
                            aboutbannerdata === null ?
                                null :
                                aboutbannerdata.map((items, index) => {
                                    return (

                                        <section key={index} className="Slide_home w-[100%] mt-3">
                                            <section className='w-[100%] pb-[10px] bg-[#ffffff] '>
                                                <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                    <section className='Slider_content_section px-5 w-[90%] '>
                                                        <section>
                                                            <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize text-center'>{items.About_Banner_Heading}</h1>
                                                            <p className='About_banner_description text-[grey] text-[18px] italic my-5 text-center'>{items.About_Banner_Description}</p>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }



                        {
                            aboutparagraph.length === 0 ? null
                                :
                                <section className='meet_the_founder_Section w-[100%] flex justify-between items-start px-10 my-8'>
                                    {
                                        aboutparagraph.map((items, index) => {
                                            return (
                                                <section key={index} className={items.About_Heading.includes('Founder') || items.About_Heading.includes('Director') ? 'w-[100%] h-auto' : 'hidden'}>
                                                    <section className='founder_profile_section w-[100%] text-[var(--primary-color--)] shadow h-auto border-e-[5px] rounded-[15px]  text-center p-2 '>
                                                        <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                            {items.About_Heading}
                                                        </h1>

                                                        <section className='meet_the_founder_inner_Section flex justify-between'>
                                                            {
                                                                items.About_Image !== null ?
                                                                    <section className='w-[40%] '>
                                                                        <img src={imageurl + items.About_Image} alt="" className='rounded-[10px] w-[100%]' />
                                                                    </section>
                                                                    :
                                                                    null
                                                            }

                                                            <section className='mb-[10px] w-[57%] text-start'>


                                                                <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                    {items.About_Description}
                                                                </p>
                                                            </section>
                                                        </section>

                                                        <section className='mb-[10px] w-[100%]'>
                                                            {
                                                                aboutextraparagraph.length === 0 ? null :
                                                                    aboutextraparagraph.map((value, ind) => {
                                                                        return (
                                                                            <section className='w-[100%] text-start' key={ind}>
                                                                                {
                                                                                    value.About_Section_Id !== items._id ?
                                                                                        null :
                                                                                        <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                                            {value.About_Paragraph}
                                                                                        </p>
                                                                                }
                                                                            </section>
                                                                        )
                                                                    })
                                                            }
                                                        </section>
                                                    </section>



                                                </section>
                                            )
                                        })
                                    }
                                </section>
                        }


                        {
                            aboutparagraph.length === 0 ? null
                                :
                                <section className='about_mission_vision_section w-[100%] flex justify-between items-start px-10 my-8'>
                                    {
                                        aboutparagraph.map((items, index) => {
                                            return (
                                                <section key={index} className={items.About_Heading.includes('Our Mission') || items.About_Heading.includes('Our Vision') ? 'w-[49%] h-auto' : 'hidden'}>
                                                    {
                                                        items.About_Heading.includes('Mission') ?
                                                            <section className='about_our_mission w-[100%] text-[var(--primary-color--)] shadow h-auto border-e-[5px] rounded-[15px]  text-center p-2 '>
                                                                <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                                    {items.About_Heading}
                                                                </h1>

                                                                {
                                                                    items.About_Image !== null ?
                                                                        <img src={imageurl + items.About_Image} alt="" className='rounded-[10px]' /> :
                                                                        null
                                                                }

                                                                <section className='w-[100%] mb-[10px]'>
                                                                    {
                                                                        aboutextraparagraph.length === 0 ? null :
                                                                            aboutextraparagraph.map((value, ind) => {
                                                                                return (
                                                                                    <section className='w-[100%] text-start' key={ind}>
                                                                                        {
                                                                                            value.About_Section_Id !== items._id ?
                                                                                                null :
                                                                                                <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                                                    {value.About_Paragraph}
                                                                                                </p>
                                                                                        }
                                                                                    </section>
                                                                                )
                                                                            })
                                                                    }
                                                                </section>
                                                            </section> :
                                                            items.About_Heading.includes('Vision') ?
                                                                <section className='about_our_vision w-[100%]  text-[var(--primary-color--)] h-auto shadow rounded-[15px] border-e-[5px] text-center p-2 '>
                                                                    <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                                        {items.About_Heading}
                                                                    </h1>

                                                                    {
                                                                        items.About_Image !== null ?
                                                                            <img src={imageurl + items.About_Image} alt="" className='rounded-[10px]' /> :
                                                                            null
                                                                    }
                                                                    <section className='w-[100%] mb-[10px]'>
                                                                        {
                                                                            aboutextraparagraph.length === 0 ? null :
                                                                                aboutextraparagraph.map((value, ind) => {
                                                                                    return (
                                                                                        <section className='w-[100%] text-start' key={ind}>
                                                                                            {
                                                                                                value.About_Section_Id !== items._id ?
                                                                                                    null :
                                                                                                    <p className='mb-[20px] mt-2 text-[16px] font-[500] italic capitalize text-[black]'>
                                                                                                        {value.About_Paragraph}
                                                                                                    </p>
                                                                                            }
                                                                                        </section>
                                                                                    )
                                                                                })
                                                                        }
                                                                    </section>
                                                                </section> :
                                                                <section className='hidden'></section>
                                                    }
                                                </section>
                                            )
                                        })
                                    }
                                </section>
                        }




                        {
                            aboutparagraph.length === 0 ? null
                                :
                                <section className='meet_the_founder_Section w-[100%] px-10 my-8'>
                                    {
                                        aboutparagraph.map((items, index) => {
                                            return (
                                                <section key={index} className={items.About_Heading.includes('Founder') || items.About_Heading.includes('Director') || items.About_Heading.includes('Our Mission') || items.About_Heading.includes('Our Vision') ? 'hidden' : ' w-[100%] h-auto mb-[10px]'}>
                                                    <section className='founder_profile_section w-[100%] text-[var(--primary-color--)] shadow h-auto border-e-[5px] rounded-[15px]  text-start p-2 '>
                                                        <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                            {items.About_Heading}
                                                        </h1>

                                                        <section className='meet_the_founder_inner_Section flex justify-between'>
                                                            {
                                                                items.About_Image !== null ?
                                                                    <section className='w-[40%] '>
                                                                        <img src={imageurl + items.About_Image} alt="" className='rounded-[10px] w-[100%]' />
                                                                    </section>
                                                                    :
                                                                    null
                                                            }

                                                            <section className='mb-[10px] w-[57%] text-start'>
                                                                <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                    {items.About_Description}
                                                                </p>


                                                            </section>
                                                        </section>

                                                        <section className='w-[100%] mb-[10px]'>
                                                            {
                                                                aboutextraparagraph.length === 0 ? null :
                                                                    aboutextraparagraph.map((value, ind) => {
                                                                        return (
                                                                            <section className='w-[100%] text-start' key={ind}>
                                                                                {
                                                                                    value.About_Section_Id !== items._id ?
                                                                                        null :
                                                                                        <p className='mb-[20px] mt-2 text-[16px] font-[500] italic capitalize text-[black]'>
                                                                                            {value.About_Paragraph}
                                                                                        </p>
                                                                                }
                                                                            </section>
                                                                        )
                                                                    })
                                                            }
                                                        </section>
                                                    </section>



                                                </section>
                                            )
                                        })
                                    }
                                </section>
                        }

                        <Footer />
                    </section >
            }
        </>
    )
}