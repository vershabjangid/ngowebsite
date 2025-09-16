import React, { useEffect, useState } from 'react'
import { Header } from '../../../common/Header'
import { Footer } from '../../../common/Footer'
import { apiurl } from '../../../apiurl/Apiurl'
import { FixedOptionHeader } from '../../../common/FixedOptionHeader';
import { Logo } from '../../../common/Logo';
import { FaChevronRight } from 'react-icons/fa6';
import { Loader } from '../../../common/Loader';

export function Gallery() {
    let [gallerybannerdata, sethomegallerybannerdata] = useState([])
    let [homegallerydata, sethomegallerydata] = useState([])
    let [homegalleryimagesdata, sethomegalleryimagesdata] = useState([])
    let [loader, setloader] = useState(false)

    let [imgurl, setimgurl] = useState([])

    let fetchalldata = async () => {
        try {
            let [homegallerybanner, homegallerydata, homegalleryimagesdata] = await Promise.all([
                apiurl.get('/admin/view-gallery-banner-section'),
                apiurl.get('/admin/view-home-gallery'),
                apiurl.get('/admin/view-gallery')
            ])

            return {
                imgurl: homegallerydata.data.imgurl,
                homegallery: homegallerydata.data.viewdata,
                homegalleryimages: homegalleryimagesdata.data.viewdata,
                homegallerybannerdata: homegallerybanner.data.viewdata
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
                    setimgurl(res.imgurl)
                    sethomegallerydata(res.homegallery)
                    sethomegalleryimagesdata(res.homegalleryimages)
                    sethomegallerybannerdata(res.homegallerybannerdata)
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
                            gallerybannerdata === null ?
                                null :
                                gallerybannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imgurl + items.Gallery_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <section className='bg-[#000000ac] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>Gallery</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  Gallery</span>  </p>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }
                        {
                            gallerybannerdata === null ?
                                null :
                                gallerybannerdata.map((items, index) => {
                                    return (

                                        <section key={index} className="Slide_home w-[100%] mt-3">
                                            <section className='w-[100%] pb-[10px] bg-[#ffffff] '>
                                                <section className='Slide_home_overlay w-[100%] flex items-center justify-evenly'>
                                                    <section className='Slider_content_section px-5 w-[90%] '>
                                                        <section>
                                                            <h1 className='home_banner_heading mt-[10px] text-[var(--primary-color--)] text-[50px] font-[800] capitalize text-center'>{items.Gallery_Banner_Heading}</h1>
                                                            <p className='About_banner_description text-[grey] text-[18px] italic my-5 text-center'>{items.Gallery_Banner_Description}</p>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>
                                        </section>
                                    )
                                })
                        }


                        {

                            homegallerydata === null || homegalleryimagesdata.length === 0 ?
                                null :
                                <section className=' w-[100%] py-[20px] px-[10px] '>
                                    <section className='mt-2 w-[100%] flex justify-between items-start flex-wrap'>
                                        {
                                            homegalleryimagesdata.map((items, index) => {
                                                return (
                                                    <section key={index} className="home_gallery_cards w-[32%] h-auto flex items-center justify-center py-2 px-[10px] mt-[20px]">
                                                        <section className='w-[100%] shadow m-auto rounded-[20px] overflow-hidden' >
                                                            <section className='w-[100%] h-[250px] flex items-center  overflow-hidden '>
                                                                <img src={imgurl + items.Gallery_Event_Image} alt="" className='w-[100%] h-[100%] transition hover:scale-110' />
                                                            </section>
                                                            <section className='p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                <section>
                                                                    <p className='font-[700] text-[20px] text-[var(--primary-color--)] capitalize'>{items.Gallery_Event_Heading}</p>
                                                                    <div className='heading_hoverline border-b-[3px] border-[var(--primary-color--)] mt-1 mb-2 w-[auto]'></div>
                                                                </section>
                                                                <p className='text-[13px] mt-2 text-[grey] capitalize'>{items.Gallery_Event_Description}</p>
                                                            </section>
                                                        </section>


                                                    </section>

                                                )
                                            })
                                        }

                                    </section>
                                </section>
                        }

                        <Footer />
                    </section >
            }
        </>
    )
}
