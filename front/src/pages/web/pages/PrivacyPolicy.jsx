import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Logo } from '../../../common/Logo'
import { FixedOptionHeader } from '../../../common/FixedOptionHeader'
import { QuickLinks } from './QuickLinks'
import { FaChevronRight } from 'react-icons/fa6'


export function PrivacyPolicy() {
    let [privacybannerdata, setprivacybannerdata] = useState([])
    let [privacyparagraph, setprivacyparagraph] = useState([])
    let [privacyextraparagraph, setprivacyextraparagraph] = useState([])
    let [imageurl, setimageurl] = useState([])

    let fetchalldata = async () => {
        try {
            let [privacybanner, privacyparagraphsection, extraprivacyparagraphsection] = await Promise.all([
                apiurl.get('/admin/view-privacy-banner-section'),
                apiurl.get('/admin/view-privacy-paragraph-section'),
                apiurl.get('/admin/view-privacy-extra-paragraph')
            ])
            return {
                privacybannerdata: privacybanner.data.viewdata,
                privacyparagraphsectiondata: privacyparagraphsection.data.viewdata,
                extraprivacyparagraphsectiondata: extraprivacyparagraphsection.data.viewdata,
                imgurl: privacybanner.data.imgurl
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
                    setprivacybannerdata(res.privacybannerdata)
                    setprivacyparagraph(res.privacyparagraphsectiondata)
                    setprivacyextraparagraph(res.extraprivacyparagraphsectiondata)
                    setimageurl(res.imgurl)
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
    }, [])
    return (
        <>
            <section className='main m-auto w-[100%]'>
                <Header />
                {
                    privacybannerdata === null ?
                        null :
                        privacybannerdata.map((items, index) => {
                            return (
                                <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imageurl + items.Privacy_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                    <FixedOptionHeader />
                                    <section className='bg-[#00000088] w-[100%] h-[100%] flex justify-center items-center'>
                                        <section className='w-[100%] text-center p-3'>.
                                            <section className='w-[200px] mb-4 m-auto'>
                                                <Logo />
                                            </section>
                                            <p className='text-white text-[30px] font-[700]'>Privacy Policy</p>
                                            <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  Privacy Policy</span>  </p>
                                        </section>
                                    </section>
                                </section>
                            )
                        })
                }

                <section className='w-[100%] py-[20px] '>
                    {
                        privacybannerdata === null ?
                            null :
                            privacybannerdata.map((items, index) => {
                                return (
                                    <section key={items} className='w-[100%]  border-b-[1px] border-[black]' >
                                        <section className='w-[100%] h-[100%] flex justify-center items-center'>
                                            <section className='w-[100%] text-justify p-3'>.

                                                <div className='text-center'>
                                                    <p className=' text-[30px] font-[700] capitalize mb-1'>{items.Privacy_Banner_Heading}</p>
                                                    <div className='heading_hoverline border-b-[3px] border-[#1385ff] w-[300px] m-auto mb-6 '></div>
                                                </div>
                                                <p className='w-[100%] text-[16px] leading-[30px] m-auto'>{items.Privacy_Banner_Description}</p>

                                            </section>
                                        </section>
                                    </section>
                                )
                            })
                    }

                    {
                        privacyparagraph.length === 0 ? null :
                            <section section className='w-[100%] py-[20px]'>
                                <section id='donation_section' className='donation_section w-[100%] py-[20px] px-[10px] '>
                                    {
                                        privacyparagraph.length === 0 ? null
                                            :
                                            privacyparagraph.map((items, index) => {
                                                return (
                                                    <section key={index} className='mt-4 w-[100%] '>
                                                        <section className="w-[100%] bg-[#ffffff95] backdrop-blur-[20px] rounded-[20px] flex items-center justify-center">

                                                            {
                                                                items.Privacy_Image === null ?
                                                                    <section className='about_inner_section w-[100%] border-[1px] border-[#ffffff] m-auto overflow-hidden rounded-[20px] flex justify-between ' >
                                                                        <section className='p-3 backdrop-blur-[2] w-[100%]'>
                                                                            <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                {items.Privacy_Heading}
                                                                                <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                            </section>

                                                                            <section>
                                                                                <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                    {items.Privacy_Description}
                                                                                </p>
                                                                            </section>


                                                                            <section className='w-[100%] mb-[10px]'>
                                                                                {
                                                                                    privacyextraparagraph.length === 0 ? null :
                                                                                        privacyextraparagraph.map((value, ind) => {
                                                                                            return (
                                                                                                <section className='w-[100%]' key={ind}>
                                                                                                    {
                                                                                                        value.Privacy_Section_Id !== items._id ?
                                                                                                            null :
                                                                                                            <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
                                                                                                                {value.Privacy_Paragraph}
                                                                                                            </p>
                                                                                                    }
                                                                                                </section>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </section>
                                                                        </section>
                                                                    </section>
                                                                    :

                                                                    <section className='about_inner_section w-[100%] border-[1px] border-[#ffffff] m-auto overflow-hidden rounded-[20px] flex justify-between p-1' >
                                                                        <section className='backdrop-blur-[2] w-[350px] h-[350px]'>
                                                                            <img src={imageurl + items.Privacy_Image} alt="" className='h-[100%] rounded-[20px]' />
                                                                        </section>

                                                                        <section className='p-3 backdrop-blur-[2] w-[calc(100%-370px)]'>
                                                                            <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                {items.Privacy_Heading}
                                                                                <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                            </section>

                                                                            <section>
                                                                                <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                    {items.Privacy_Description}
                                                                                </p>
                                                                            </section>


                                                                            <section className='w-[100%] mb-[10px]'>
                                                                                {
                                                                                    privacyextraparagraph.length === 0 ? null :
                                                                                        privacyextraparagraph.map((value, ind) => {
                                                                                            return (
                                                                                                <section className='w-[100%]' key={ind}>
                                                                                                    {
                                                                                                        value.Privacy_Section_Id !== items._id ?
                                                                                                            null :
                                                                                                            <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
                                                                                                                {value.Privacy_Paragraph}
                                                                                                            </p>
                                                                                                    }
                                                                                                </section>
                                                                                            )
                                                                                        })
                                                                                }
                                                                            </section>
                                                                        </section>
                                                                    </section>
                                                            }

                                                        </section>
                                                    </section>
                                                )
                                            })
                                    }
                                </section>

                            </section>
                    }

                    <QuickLinks />
                </section>
                <Footer />
            </section >
        </>
    )
}
