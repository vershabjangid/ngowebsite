import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { GoGoal } from 'react-icons/go'
import { FaDeleteLeft, FaXmark } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export function DashViewParagraphHeading() {
    let [imgurl, setimgurl] = useState([])
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [homegoalscardheading, sethomegoalscardheading] = useState([])
    let [homegoalscardparagraph, sethomegoalscardparagraph] = useState([])
    let allfetch = async () => {
        try {
            let [fetchcard, fetchcardparagraphheading, fetchcardparagraph, homegoalscardheadingdata] = await Promise.all([
                apiurl.get('/admin/view-goals-card'),
                apiurl.get('/admin/view-goals-paragraph-heading'),
                apiurl.get('/admin/view-goals-card-paragraph'),
                apiurl.get('/admin/view-goals-paragraph-heading')
            ])
            return {
                fetchcarddata: fetchcard.data.viewdata,
                fetchcardparagraphheadingdata: fetchcardparagraphheading.data.viewdata,
                fetchcardparagraphdata: fetchcardparagraph.data.viewdata,
                homegoalscardheading: homegoalscardheadingdata.data.viewdata,
                imgurldata: fetchcard.data.imgurl
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    let viewdata = () => {
        try {
            allfetch()
                .then((res) => {
                    sethomegoalscarddata(res.fetchcarddata)
                    sethomegoalscardheading(res.fetchcardparagraphheadingdata)
                    sethomegoalscardparagraph(res.fetchcardparagraphdata)
                    setimgurl(res.imgurldata)
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


    let [model, setmodel] = useState(false)
    let [modalheading, setmodalheading] = useState(null)


    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])

    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let deletedata = (value) => {
        try {
            if (value.Home_Card_Content_Id) {
                apiurl.delete('/admin/delete-goals-card-paragraph', {
                    data: value,
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                })
                    .then((res) => {
                        if (res.data.Status === 1) {
                            notificationsuccess(res.data.Message)
                            viewdata()

                        }
                        else {
                            notificationerror(res.data.Message)
                        }
                        setdeletemodal(false)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                apiurl.delete('/admin/delete-goals-paragraph-heading', {
                    data: value,
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                })
                    .then((res) => {
                        if (res.data.Status === 1) {
                            notificationsuccess(res.data.Message)
                            viewdata()

                        }
                        else {
                            notificationerror(res.data.Message)
                        }
                        setdeletemodal(false)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    let navigate = useNavigate()
    let updateheading = (value) => {
        navigate('/update-home-paragraph-heading', { state: value })
    }

    let updateparagraph = (value) => {
        navigate('/update-home-paragraph-paragraph', { state: value })
    }
    return (
        <>
            {
                model ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#0000004f] z-[9999] flex justify-center items-center'>
                        <section className='w-[95%] h-[95%] bg-[white] rounded-[20px]'>
                            <section className='w-[100%] border-b-[1px] border-[black] p-3 text-[20px] flex justify-end'>
                                <FaXmark className=' cursor-pointer' onClick={() => setmodel(false)} />
                            </section>
                            <section className='w-[100%] h-[calc(100vh-80px)] overflow-y-scroll rounded-b-[20px]  p-3'>
                                <p className='text-[25px] font-[700] mb-[30px]'>{modalheading[0]}</p>

                                {
                                    homegoalscardheading.length === 0 ?
                                        null :
                                        homegoalscardheading.map((items, index) => {
                                            return (
                                                <section key={index}>
                                                    {
                                                        modalheading[1] === items.Home_Card_Id ?
                                                            <div className=''>
                                                                <div className=' flex items-center justify-between text-[red]'>
                                                                    <p className='mb-[5px] text-[20px] font-[600]'>{items.Home_Card_Paragraph_Heading}</p>
                                                                    <div className='flex text-[20px]'>
                                                                        <FaEdit onClick={() => updateheading(items)} />
                                                                        < FaDeleteLeft className='ms-5' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)} />
                                                                    </div>
                                                                </div>
                                                                {
                                                                    homegoalscardparagraph.length === 0 ?
                                                                        null :
                                                                        homegoalscardparagraph.map((value, index) => {
                                                                            return (
                                                                                <section key={index}>
                                                                                    {
                                                                                        items._id === value.Home_Card_Content_Heading ?
                                                                                            <div className=' flex items-center justify-between text-[#54accf]'>
                                                                                                <p className='mb-[15px] text-[16px]'>{value.Home_Card_Content_Paragraph}</p>
                                                                                                <div className='flex text-[20px]'>
                                                                                                    <FaEdit onClick={() => updateparagraph(value)} />
                                                                                                    <FaDeleteLeft className='ms-5' onClick={() => setdeletemodal(true) || setdeletemodaldata(value)} />
                                                                                                </div>
                                                                                            </div> :
                                                                                            null
                                                                                    }
                                                                                </section>
                                                                            )
                                                                        })
                                                                }
                                                            </div>
                                                            : null
                                                    }
                                                </section>
                                            )
                                        })
                                }
                            </section>
                        </section>
                    </section>
                    : null
            }




            {
                deletemodal ?
                    <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                        <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                            <div className=' border-b-[1px] border-[black] pb-1'>
                                <h3 className='text-[25px] font-[600]'>Delete Slide</h3>
                            </div>
                            <div className='py-4'>
                                <p>Are you sure to delete a slide?</p>
                            </div>
                            <div>
                                <div className='w-[100%] flex justify-end mt-[20px]'>
                                    <button type='submit' className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => deletedata(deletemodaldata)}>
                                        Delete
                                    </button>

                                    <button className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setdeletemodal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </section>
                    </section>
                    :
                    null
            }

            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <AdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <AdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <GoGoal />
                                <h1 className='font-[600] ms-2'>
                                    Home Goals Cards
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#000000]'>Home</span> / <span className='text-[#1385ff]'>Home Goals Cards</span></p>
                            </div>
                        </section>

                        <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                            <p className='font-[600] text-[grey] mb-[20px]'>Home Goals Cards</p>

                            <section className='w-[100%] my-[10px] flex justify-evenly flex-wrap py-2'>
                                {
                                    homegoalscarddata.length === 0 ?
                                        <div className='text-center font-[600] text-[grey]'>
                                            No Data Found
                                        </div> :
                                        homegoalscarddata.map((items, index) => {
                                            return (
                                                <section key={index} className='w-[260px] cursor-pointer border-[2px] border-[black] p-[10px] rounded-[20px] mb-[20px]' onClick={() => setmodel(true) || setmodalheading([items.Home_Goals_Heading, items._id])}>
                                                    <img src={imgurl + items.Home_Goals_Card_Icon} alt="" className='m-auto' />
                                                    <p className='my-[5px] text-[20px] font-[600]'>
                                                        {items.Home_Goals_Heading}
                                                    </p>
                                                    <p className='text-[13px]'>
                                                        {items.Home_Goals_Description}
                                                    </p>
                                                </section>
                                            )
                                        })
                                }

                            </section>


                        </section>
                    </section>
                </section>
            </section>
            <Toaster />
        </>
    )
}
