import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { Loader } from '../../../common/Loader'
import { Logo } from '../../../common/Logo'
import { FaChevronRight } from 'react-icons/fa6'

export function NewsEvents() {
    let [newsbannerdata, setnewsbannerdata] = useState([])
    let [newsparagraph, setnewsparagraph] = useState([])
    let [imageurl, setimageurl] = useState([])
    let [loader, setloader] = useState(false)


    let fetchalldata = async () => {
        try {
            let [newsbanner, newsparagraphsection] = await Promise.all([
                apiurl.get('/admin/view-news-banner-section'),
                apiurl.get('/admin/view-news'),
            ])
            return {
                newsbannerdata: newsbanner.data.viewdata,
                newsparagraphsectiondata: newsparagraphsection.data.viewdata,
                imgurl: newsbanner.data.imgurl
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
                    setnewsbannerdata(res.newsbannerdata)
                    setnewsparagraph(res.newsparagraphsectiondata)
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
                            newsbannerdata === null ?
                                null :
                                newsbannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imageurl + items.News_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <section className='bg-[#000000ac] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>News & Events</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  News & Events</span>  </p>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }
                        {
                            newsbannerdata === null ?
                                null :
                                newsbannerdata.map((items, index) => {
                                    return (

                                        <section key={index} className="Slide_home w-[100%] mt-3">
                                            <section className='w-[100%] pb-[10px] bg-[#ffffff] '>
                                                <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                    <section className='Slider_content_section px-5 w-[90%] '>
                                                        <section>
                                                            <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize text-center'>{items.News_Banner_Heading}</h1>
                                                            <p className='About_banner_description text-[grey] text-[18px] my-5 text-center italic'>{items.News_Banner_Description}</p>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }


                        <section className=''>

                            {
                                newsparagraph.length === 0 ? null
                                    :
                                    newsparagraph.map((items, index) => {
                                        return (
                                            <section key={index} className='news_report_section py-3 w-[100%] px-10'>
                                                <section className="w-[100%] bg-[#ffffff95] backdrop-blur-[20px] rounded-[20px] border-e-[5px] shadow flex items-center justify-center p-2">
                                                    <section className='about_inner_section w-[100%] h-auto m-auto overflow-hidden rounded-[20px] flex justify-between ' >
                                                        <section className='backdrop-blur-[2] w-[350px] h-auto'>
                                                            <img src={imageurl + items.News_Image} alt="" className='h-[auto] rounded-[20px]' />
                                                        </section>

                                                        <section className='p-3 backdrop-blur-[2] w-[calc(100%-370px)]'>
                                                            <section className=' capitalize text-[25px] font-[700] text-[#000000]'>
                                                                {items.News_Heading}
                                                                <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] mt-2 w-[auto]'></div>
                                                            </section>

                                                            <section>
                                                                <p className='mt-5 text-[16px] font-[500] italic text-[grey] capitalize whitespace-pre-wrap'>
                                                                    {items.News_Description}
                                                                </p>
                                                            </section>
                                                            {
                                                                items.News_Additional_Links && items.News_Additional_Links !== undefined ?
                                                                    <section className='mt-5 mb-3'>
                                                                        <a href={items.News_Additional_Links} className='bg-[var(--primary-color--)] text-white p-3 rounded-[20px]'>Additional Links</a>
                                                                    </section> :
                                                                    null
                                                            }
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        )
                                    })
                            }

                        </section>
                        <Footer />
                    </section >
            }
        </>
    )
}
