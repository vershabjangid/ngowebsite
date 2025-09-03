import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Logo } from '../../../common/Logo'
import { FixedOptionHeader } from '../../../common/FixedOptionHeader'
import { QuickLinks } from './QuickLinks'
import { FaChevronRight } from 'react-icons/fa6'
import { Loader } from '../../../common/Loader'

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
                        {
                            aboutbannerdata === null ?
                                null :
                                aboutbannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imageurl + items.About_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <FixedOptionHeader />
                                            <section className='bg-[#00000079] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>About Us</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  About</span>  </p>
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
                                        <section key={index} className='w-[100%]' >
                                            <section className='w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-justify p-2 px-[10px]'>.

                                                    <div className='text-center'>
                                                        <p className=' text-[30px] font-[700] capitalize mb-1'>{items.About_Banner_Heading}</p>
                                                        <div className='heading_hoverline border-b-[3px] border-[#1385ff] w-[300px] m-auto mb-6 '></div>
                                                    </div>
                                                    <p className='w-[100%] text-[16px] leading-[30px] m-auto'>{items.About_Banner_Description}</p>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }

                        {
                            aboutparagraph.length === 0 ? null :
                                <section className='w-[100%] pt-[20px] '>
                                    <section id='donation_section' className='donation_section w-[100%] py-[20px] px-[10px]'>

                                        <section className='w-[100%] text-center'>
                                            <h2 className=' capitalize text-[35px] font-[700] text-[#1385ff]'>
                                                About Us
                                                <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1 '></div>
                                            </h2>
                                            <p className='text-justify capitalize  my-[20px] mb-[20px] leading-[30px] text-[16px] '>
                                                For over a decade, we've been dedicated to creating sustainable change in communities worldwide. Our mission is simple: to provide hope, opportunity, and resources where they're needed most.
                                            </p>
                                        </section>

                                        {
                                            aboutparagraph.length === 0 ? null
                                                :
                                                aboutparagraph.map((items, index) => {
                                                    return (
                                                        <section key={index} className='mt-4 w-[100%]'>
                                                            {
                                                                items.About_Image === undefined || items.About_Image === null ?
                                                                    <section className="w-[100%] h-auto bg-[#ffffff95] backdrop-blur-[20px] rounded-[20px] flex items-center justify-center">
                                                                        <section className='about_inner_section w-[100%] border-[1px] border-[#ffffff] m-auto overflow-hidden rounded-[20px] flex justify-between' >
                                                                            <section className=' px-[10px] backdrop-blur-[2] w-[100%]'>
                                                                                <section className='capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                    {items.About_Heading}
                                                                                    <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                                </section>

                                                                                <section>
                                                                                    <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                        {items.About_Description}
                                                                                    </p>
                                                                                </section>


                                                                                <section className='w-[100%] mb-[10px]'>
                                                                                    {
                                                                                        aboutextraparagraph.length === 0 ? null :
                                                                                            aboutextraparagraph.map((value, ind) => {
                                                                                                return (
                                                                                                    <section className='w-[100%]' key={ind}>
                                                                                                        {
                                                                                                            value.About_Section_Id !== items._id ?
                                                                                                                null :
                                                                                                                <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
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
                                                                    </section>
                                                                    :

                                                                    <section className="w-[100%] h-auto bg-[#ffffff95] backdrop-blur-[20px] rounded-[20px] flex items-center justify-center">
                                                                        <section className='about_inner_section w-[100%] h-auto border-[1px]  p-[10px] border-[#ffffff] m-auto overflow-hidden rounded-[20px] flex justify-between' >
                                                                            <section className='backdrop-blur-[2] w-[350px] h-auto'>
                                                                                <img src={imageurl + items.About_Image} alt="" className='w-[100%] rounded-[20px]' />
                                                                            </section>

                                                                            <section className='p-3 backdrop-blur-[2] w-[calc(100%-370px)]'>
                                                                                <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                    {items.About_Heading}
                                                                                    <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                                </section>

                                                                                <section>
                                                                                    <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                        {items.About_Description}
                                                                                    </p>
                                                                                </section>


                                                                                <section className='w-[100%] mb-[10px]'>
                                                                                    {
                                                                                        aboutextraparagraph.length === 0 ? null :
                                                                                            aboutextraparagraph.map((value, ind) => {
                                                                                                return (
                                                                                                    <section className='w-[100%]' key={ind}>
                                                                                                        {
                                                                                                            value.About_Section_Id !== items._id ?
                                                                                                                null :
                                                                                                                <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
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
                                                                    </section>
                                                            }

                                                        </section>
                                                    )
                                                })
                                        }
                                    </section>

                                </section>
                        }
                        <QuickLinks />
                        <Footer />
                    </section >
            }
        </>
    )
}
