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
                                            <section key={items} className='w-[100%] border-b-[1px] border-[#1385ff]' >
                                                <section className='w-[100%] h-[100%] flex justify-center items-center'>
                                                    <section className='w-[100%] text-justify p-3'>.

                                                        <div className='text-center'>
                                                            <p className=' text-[30px] font-[700] capitalize mb-1'>{items.Terms_Banner_Heading}</p>
                                                            <div className='heading_hoverline border-b-[3px] border-[#1385ff] w-[300px] m-auto mb-6 '></div>
                                                        </div>
                                                        <p className='w-[100%] text-[16px] leading-[30px] m-auto'>{items.Terms_Banner_Description}</p>
                                                    </section>
                                                </section>
                                            </section>
                                        )
                                    })
                            }

                            {
                                termsparagraph.length === 0 ? null :
                                    <section className='w-[100%]'>
                                        <section id='donation_section' className='donation_section w-[100%] py-[10px] px-[10px]  '>
                                            {
                                                termsparagraph.length === 0 ? null
                                                    :
                                                    termsparagraph.map((items, index) => {
                                                        return (
                                                            <section key={index} className='mt-4 w-[100%] '>
                                                                <section className="w-[100%] bg-[#ffffff95] backdrop-blur-[20px] rounded-[20px] flex items-center justify-center">

                                                                    {
                                                                        items.Terms_Image === null ?
                                                                            <section className='about_inner_section w-[100%] border-[1px] border-[#1385ff] m-auto overflow-hidden rounded-[20px] flex justify-between p-3' >
                                                                                <section className='p-3 backdrop-blur-[2] w-[100%]'>
                                                                                    <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                        {items.Terms_Heading}
                                                                                        <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                                    </section>

                                                                                    <section>
                                                                                        <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                            {items.Terms_Description}
                                                                                        </p>
                                                                                    </section>


                                                                                    <section className='w-[100%] mb-[10px]'>
                                                                                        {
                                                                                            termsextraparagraph.length === 0 ? null :
                                                                                                termsextraparagraph.map((value, ind) => {
                                                                                                    return (
                                                                                                        <section className='w-[100%]' key={ind}>
                                                                                                            {
                                                                                                                value.Terms_Section_Id !== items._id ?
                                                                                                                    null :
                                                                                                                    <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
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
                                                                            :

                                                                            <section className='about_inner_section w-[100%] h-[auto] border-[1px] border-[#1385ff] m-auto overflow-hidden rounded-[20px] flex justify-between p-3' >
                                                                                <section className='backdrop-blur-[2] w-[350px] h-[auto]'>
                                                                                    <img src={imageurl + items.Terms_Image} alt="" className='h-[auto] rounded-[20px]' />
                                                                                </section>

                                                                                <section className='p-3 backdrop-blur-[2] w-[calc(100%-370px)]'>
                                                                                    <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                                        {items.Terms_Heading}
                                                                                        <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-2 w-[auto]'></div>
                                                                                    </section>

                                                                                    <section>
                                                                                        <p className='mt-5 text-[16px] font-[500]  capitalize'>
                                                                                            {items.Terms_Description}
                                                                                        </p>
                                                                                    </section>


                                                                                    <section className='w-[100%] mb-[10px]'>
                                                                                        {
                                                                                            termsextraparagraph.length === 0 ? null :
                                                                                                termsextraparagraph.map((value, ind) => {
                                                                                                    return (
                                                                                                        <section className='w-[100%]' key={ind}>
                                                                                                            {
                                                                                                                value.Terms_Section_Id !== items._id ?
                                                                                                                    null :
                                                                                                                    <p className='mb-[20px] mt-3 text-[16px] font-[500] capitalize'>
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
                                                                    }

                                                                </section>
                                                            </section>
                                                        )
                                                    })
                                            }
                                        </section>

                                    </section>
                            }

                        </section>
                        <Footer />
                    </section >
            }
        </>
    )
}
