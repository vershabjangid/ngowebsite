import React, { useEffect, useState } from 'react'
import { Header } from '../../../../common/Header'
import { Sidebar } from '../../../../common/Sidebar'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FiCalendar, FiUser } from 'react-icons/fi'
import DateFormat from '../../../../common/DateFormat'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'

export function Notices() {
    let [data, setdata] = useState([])
    let [filternoticedata, setfilternoticedata] = useState([])

    let viewdata = () => {
        try {
            apiurl.get('/user/view-notice', {
                headers: {
                    Authorization: getCookie('logintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setdata([])
                    }
                    else {
                        setdata(res.data)
                        setfilternoticedata(res.data)
                    }
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


    let [status, setstatus] = useState('All')
    let filterdata = (value) => {
        if (value === 'All') {
            viewdata()
        }
        else {
            if (value === 'Personal') {
                setdata(filternoticedata.filter((e) => e.Send_To !== 'All'))
            }
            else {
                setdata(filternoticedata.filter((e) => e.Send_To === 'All'))
            }
        }
    }
    return (
        <>
            <section className='w-[100%] h-[100vh] border-[1px] border-[red] bg-[#f3f1f1]'>
                <Header />
                <section className='flex h-[calc(100%-90px)] border-t-[1px]'>
                    <Sidebar />
                    <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                        <section className=' w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <IoMdNotificationsOutline />
                                <h1 className='font-[600] ms-2'>
                                    Notices
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p className='text-[#1385ff]'>Here you can see your all notices</p>
                            </div>
                        </section>

                        <section className='mt-[20px]'>
                            <button className={status === 'All' ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px]'} onClick={() => filterdata('All') || setstatus('All')}>
                                All
                            </button>

                            <button className={status === "Personal" ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px] ms-2' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px] ms-2'} onClick={() => filterdata('Personal') || setstatus("Personal")}>
                                Personal
                            </button>


                            <button className={status === "General" ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px] ms-2' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px] ms-2'} onClick={() => filterdata('General') || setstatus("General")}>
                                General
                            </button>
                        </section>


                        <section className='bg-[#1385ff] py-2 rounded-[10px] mt-4'>
                            <p className='text-[18px] text-center font-[600] text-white'>Notices</p>
                        </section>


                        {
                            data.length === 0 ?
                                <section className='text-center w-[100%] mt-4 text-[16px] font-[600]'>No Data Found</section>
                                :
                                data.map((items, index) => {
                                    return (
                                        <section key={index} className='dashboard_notice w-[100%] mt-5'>
                                            <section className='mt-[10px] border-[1px] border-[#1385ff] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                <div className='flex'>
                                                    <IoMdNotificationsOutline className='text-[25px] text-[#1385ff]' /> <p className='text-[18px] font-[600] ms-1'>{items.Notice_Heading}</p>
                                                </div>
                                                <div className='flex mt-2'>
                                                    <p className='text-[10px] font-[600] bg-[#fdcece] px-2 py-1 rounded-[15px] text-[red]'> Subject : {items.Notice_Heading}</p>
                                                </div>

                                                <div className='flex mt-3 '>
                                                    <p className='text-[16px] ms-1 w-[100%]'>{items.Notice_Description}</p>
                                                </div>

                                                <div className='flex mt-3 text-[grey]'>
                                                    <div className='flex'>
                                                        <FiUser className='text-[18px]' /> <p className='text-[14px] ms-2 '>Admin</p>
                                                    </div>

                                                    <div className='flex ms-4'>
                                                        <FiCalendar className='text-[18px]' /> <p className='text-[14px] ms-2 '><DateFormat value={items.Date} /></p>
                                                    </div>
                                                </div>
                                            </section>
                                        </section>
                                    )
                                })
                        }                    </section>
                </section>
            </section>
        </>
    )
}
