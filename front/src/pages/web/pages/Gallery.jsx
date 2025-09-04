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
                        {
                            gallerybannerdata === null ?
                                null :
                                gallerybannerdata.map((items, index) => {
                                    return (
                                        <section key={items} className='about_banner_slides w-[100%] h-[400px] relative' style={{ background: `url(${imgurl + items.Gallery_Banner_Image})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                                            <FixedOptionHeader />
                                            <section className='bg-[#00000088] w-[100%] h-[100%] flex justify-center items-center'>
                                                <section className='w-[100%] text-center p-3'>.
                                                    <section className='w-[200px] mb-4 m-auto'>
                                                        <Logo />
                                                    </section>
                                                    <p className='text-white text-[30px] font-[700]'>Our Gallery</p>
                                                    <p className='text-white text-[18px] flex items-center justify-center'>Home <span className='text-[14px] mx-1'> <FaChevronRight /></span><span className='flex items-center text-[#1385ff]'>  Our Gallery</span>  </p>
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
                                                    <section key={index} className="home_gallery_cards w-[32%] flex items-start justify-center py-2 px-[10px] mt-[20px]">
                                                        <section className='home_management_card w-[100%] shadow m-auto overflow-hidden rounded-[20px]' >
                                                            <section className='w-[100%] h-[250px] rounded-b-[10px]'>
                                                                <img src={imgurl + items.Gallery_Event_Image} alt="" className='w-[100%] h-[100%]' />
                                                            </section>
                                                            <section className='p-3 bg-[#ffffff82] backdrop-blur-[2]'>
                                                                <p className='font-[700] text-[20px] capitalize text-[#1385ff]'>{items.Gallery_Event_Heading}</p>
                                                                <div className='heading_hoverline border-b-[3px] border-[#1385ff] mt-1 mb-2 w-[auto]'></div>
                                                                <p className='text-[14px] mt-2 text-[grey] capitalize'>{items.Gallery_Event_Description}</p>
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
