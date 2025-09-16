import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Logo } from '../../../common/Logo'
import { FixedOptionHeader } from '../../../common/FixedOptionHeader'
import { FaChevronRight } from 'react-icons/fa6'
import { Loader } from '../../../common/Loader'


export function PrivacyPolicy() {
    let [privacybannerdata, setprivacybannerdata] = useState([])
    let [privacyparagraph, setprivacyparagraph] = useState([])
    let [privacyextraparagraph, setprivacyextraparagraph] = useState([])
    let [imageurl, setimageurl] = useState([])
    let [loader, setloader] = useState(false)

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

                        <section className='w-[100%] py-[0px] '>
                            {
                                privacybannerdata === null ?
                                    null :
                                    privacybannerdata.map((items, index) => {
                                        return (

                                            <section key={index} className="Slide_home w-[100%] mt-3">
                                                <section className='w-[100%] pb-[10px] bg-[#ffffff] '>
                                                    <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                        <section className='Slider_content_section px-5 w-[90%] '>
                                                            <section>
                                                                <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize text-center'>{items.Privacy_Banner_Heading}</h1>
                                                                <p className='About_banner_description text-[grey] text-[18px] italic my-5 text-center'>{items.Privacy_Banner_Description}</p>
                                                            </section>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        )
                                    })
                            }



                            {
                                privacyparagraph.length === 0 ? null
                                    :
                                    <section className='meet_the_founder_Section w-[100%] px-10 my-8'>
                                        {
                                            privacyparagraph.map((items, index) => {
                                                return (
                                                    <section key={index} className=' w-[100%] h-auto mb-[10px]'>
                                                        <section className='founder_profile_section w-[100%] text-[var(--primary-color--)] shadow h-auto border-e-[5px] rounded-[15px]  text-start p-2 '>
                                                            <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                                {items.Privacy_Heading}
                                                            </h1>

                                                            <section className='meet_the_founder_inner_Section flex justify-between'>
                                                                {
                                                                    items.Privacy_Image !== null ?
                                                                        <section className='w-[25%] '>
                                                                            <img src={imageurl + items.Privacy_Image} alt="" className='rounded-[10px] w-[100%]' />
                                                                        </section>
                                                                        :
                                                                        null
                                                                }

                                                                <section className={items.Privacy_Image !== null ? 'mb-[10px] w-[73%] text-start' : 'mb-[10px] w-[100%] text-start'}>
                                                                    <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                        {items.Privacy_Description}
                                                                    </p>
                                                            <section className='w-[100%] mb-[10px]'>
                                                                {
                                                                    privacyextraparagraph.length === 0 ? null :
                                                                        privacyextraparagraph.map((value, ind) => {
                                                                            return (
                                                                                <section className='w-[100%] text-start' key={ind}>
                                                                                    {
                                                                                        value.Privacy_Section_Id !== items._id ?
                                                                                            null :
                                                                                            <p className='mb-[20px] mt-2 text-[16px] font-[500] italic capitalize text-[black]'>
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

                                                        </section>



                                                    </section>
                                                )
                                            })
                                        }
                                    </section>
                            }
                        </section>
                        <Footer />
                    </section >
            }
        </>
    )
}
