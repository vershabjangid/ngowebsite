import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Logo } from '../../../common/Logo'
import { FixedOptionHeader } from '../../../common/FixedOptionHeader'
import { FaChevronRight } from 'react-icons/fa6'
import { Loader } from '../../../common/Loader'

export function TermsConditions() {
    let [termsbannerdata, settermsbannerdata] = useState([])
    let [termsparagraph, settermsparagraph] = useState([])
    let [termsextraparagraph, settermsextraparagraph] = useState([])
    let [imageurl, setimageurl] = useState([])
    let [loader, setloader] = useState(false)

    let fetchalldata = async () => {
        try {
            let [termsbanner, termsparagraphsection, extratermsparagraphsection] = await Promise.all([
                apiurl.get('/admin/view-terms-banner-section'),
                apiurl.get('/admin/view-terms-paragraph-section'),
                apiurl.get('/admin/view-terms-extra-paragraph')
            ])
            return {
                termsbannerdata: termsbanner.data.viewdata,
                termsparagraphsectiondata: termsparagraphsection.data.viewdata,
                extratermsparagraphsectiondata: extratermsparagraphsection.data.viewdata,
                imgurl: termsbanner.data.imgurl
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
                    settermsbannerdata(res.termsbannerdata)
                    settermsparagraph(res.termsparagraphsectiondata)
                    settermsextraparagraph(res.extratermsparagraphsectiondata)
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
                            termsbannerdata === null ?
                                null :
                                termsbannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imageurl + items.Terms_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <FixedOptionHeader />
                                            <section className='bg-[#00000088] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>Terms & Conditions</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  Terms & Conditions</span>  </p>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }

                        <section className='w-[100%] py-[0px] '>
                            {
                                termsbannerdata === null ?
                                    null :
                                    termsbannerdata.map((items, index) => {
                                        return (

                                            <section key={index} className="Slide_home w-[100%] mt-3">
                                                <section className='w-[100%] pb-[10px] bg-[#ffffff] '>
                                                    <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                        <section className='Slider_content_section px-5 w-[90%] '>
                                                            <section>
                                                                <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize text-center'>{items.Terms_Banner_Heading}</h1>
                                                                <p className='About_banner_description text-[grey] text-[18px] italic my-5 text-center'>{items.Terms_Banner_Description}</p>
                                                            </section>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        )
                                    })
                            }





                            {
                                termsparagraph.length === 0 ? null
                                    :
                                    <section className='meet_the_founder_Section w-[100%] px-10 my-8'>
                                        {
                                            termsparagraph.map((items, index) => {
                                                return (
                                                    <section key={index} className=' w-[100%] h-auto mb-[10px]'>
                                                        <section className='founder_profile_section w-[100%] text-[var(--primary-color--)] shadow h-auto border-e-[5px] rounded-[15px]  text-start p-2 '>
                                                            <h1 className='font-[700] text-[30px] mb-[10px]'>
                                                                {items.Terms_Heading}
                                                            </h1>

                                                            <section className='meet_the_founder_inner_Section flex justify-between'>
                                                                {
                                                                    items.Terms_Image !== null ?
                                                                        <section className='w-[25%] '>
                                                                            <img src={imageurl + items.Terms_Image} alt="" className='rounded-[10px] w-[100%]' />
                                                                        </section>
                                                                        :
                                                                        null
                                                                }

                                                                <section className={items.Terms_Image !== null ? 'mb-[10px] w-[73%] text-start' : 'mb-[10px] w-[100%] text-start'}>
                                                                    <p className='mb-[20px] mt-2 text-[16px] font-[500] italic text-[black] capitalize'>
                                                                        {items.Terms_Description}
                                                                    </p>


                                                                    <section className='w-[100%] mb-[10px]'>
                                                                        {
                                                                            termsextraparagraph.length === 0 ? null :
                                                                                termsextraparagraph.map((value, ind) => {
                                                                                    return (
                                                                                        <section className='w-[100%] text-start' key={ind}>
                                                                                            {
                                                                                                value.Terms_Section_Id !== items._id ?
                                                                                                    null :
                                                                                                    <p className='mb-[20px] mt-2 text-[16px] font-[500] italic capitalize text-[black]'>
                                                                                                        {value.Terms_Paragraph}
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
