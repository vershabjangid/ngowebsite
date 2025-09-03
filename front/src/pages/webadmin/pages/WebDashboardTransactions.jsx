import React, { useEffect, useRef, useState } from 'react'
import { IoReceiptOutline } from 'react-icons/io5'
import { FiCalendar } from 'react-icons/fi'
import { FaDollarSign, FaDownload, FaXmark } from 'react-icons/fa6'
import { BsPatchCheckFill, BsPatchExclamationFill } from 'react-icons/bs'
import { LuIndianRupee } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import DateFormat from '../../../common/DateFormat'
import { Loader } from '../../../common/Loader'

export function WebDashboardTransactions() {
    let [data, setdata] = useState([])
    let [filternoticedata, setfilternoticedata] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = (value) => {
        try {
            apiurl.get('/admin/view-all-donations', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setdata([])
                    }
                    else {
                        setdata(res.data)
                        setfilternoticedata(res.data)
                        setloader(false)
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
        setloader(true)
    }, [])


    let [status, setstatus] = useState('All')
    let filterdata = (value) => {
        if (value === 'All') {
            viewdata()
        }
        else {
            if (value === 'Paid') {
                setdata(filternoticedata.filter((e) => e.Status === 'Paid'))
            }
            else {
                setdata(filternoticedata.filter((e) => e.Status === 'Failed'))
            }
        }
    }


    let [modal, setmodal] = useState(false)
    let [modaldata, setmodaldata] = useState(true)

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        {
                            modal ?
                                <section className='payment_overlay w-[100%] h-[100vh] bg-[#00000091] fixed z-[9999] flex items-center justify-center px-2'>
                                    <section>
                                    </section>
                                    <section className='w-[100%] flex items-center justify-center py-2'>
                                        <section className='payment_overlay_inner w-[450px] h-[100%] bg-[white] py-3 rounded-[10px] overflow-y-scroll relative' >
                                            <section className='flex justify-end me-2'>
                                                <section className='z-[9999] top-[50px] p-3 px-5 rounded-[20px] right-[100px] text-[#000000] text-[16px] flex justify-center items-center flex-col' onClick={reactToPrintFn}>
                                                    <FaDownload />
                                                </section>

                                                <section className='z-[9999]  top-[50px] right-[30px] text-[#000000] text-[16px] flex justify-center items-center flex-col cursor-pointer' onClick={() => setmodal(false)}>
                                                    <FaXmark />
                                                </section>
                                            </section>
                                            <section className='w-[100%] ' ref={contentRef}>
                                                <section className='flex justify-center items-center flex-col w-[100%] pt-2'>
                                                    {
                                                        modaldata.Status === "Paid" ?
                                                            <BsPatchCheckFill className='text-[70px] text-[green]' />
                                                            :
                                                            <BsPatchExclamationFill className='text-[70px] text-[red]' />
                                                    }
                                                    <p className='font-[600] mt-2'>Donation at rcmicci</p>
                                                    <p className='flex items-center text-[40px] font-[600]'><LuIndianRupee className='text-[30px]' /> {modaldata.Amount.toLocaleString()}</p>




                                                    {
                                                        modaldata.Status === "Paid" ?
                                                            <p className='w-[50%] text-center text-[16px] font-[500] pb-2 pt-5 border-b-[2px]'>Success</p>
                                                            :
                                                            <p className='w-[50%] text-center text-[16px] font-[500] pb-2 pt-5 border-b-[2px]'>Failed</p>
                                                    }

                                                    <p className='w-[50%] text-center text-[14px] font-[500] pt-2'><DateFormat value={modaldata.CreatedOn} /></p>
                                                </section>


                                                <section className='w-[95%] mt-5 m-auto border-[1px] border-[black] rounded-[10px] py-3 px-1 leading-[30px] text-[14px]'>
                                                    <p>
                                                        Receipt No : {modaldata.Receipt_No}
                                                    </p>


                                                    <p>
                                                        Bank Name : {modaldata.Bank_Name}
                                                    </p>

                                                    <p>
                                                        Order ID : {modaldata.Order_Id}
                                                    </p>

                                                    {
                                                        modaldata.Status === "Paid" ?
                                                            <p>
                                                                Payment ID : {modaldata.Payment_Id}
                                                            </p> :
                                                            null
                                                    }
                                                </section>
                                            </section>

                                        </section>
                                    </section>
                                </section>
                                :
                                null
                        }
                        <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                            <WebAdminSidebar />
                            <section className='w-[100%] h-[100%] overflow-y-scroll'>
                                <WebAdminHeader />

                                <section className='useradmin_content_section w-[100%] p-5 text-[30px] '>
                                    <section className=' w-[100%] px-3'>
                                        <div className='text-[25px] flex items-center'>
                                            <IoReceiptOutline />
                                            <h1 className='font-[600] ms-2'>
                                                Transactions
                                            </h1>
                                        </div>

                                        <div className='font-[500] text-[15px]'>
                                            <p className='text-[#1385ff]'>Here you can see your all transactions</p>
                                        </div>
                                    </section>



                                    <section className='mt-[20px]'>
                                        <button className='text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]'>
                                            Donations
                                        </button>

                                        <Link to={"/dash-membership-transactions"} className={status === "Personal" ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px] ms-2' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px] ms-2'}>
                                            Membership
                                        </Link>

                                    </section>

                                    {/* /view-all-donations */}
                                    <section className='mt-[20px]'>
                                        <button className={status === 'All' ? 'text-[14px] border-[2px] font-[600] bg-[#1385ff] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]' : 'text-[14px] border-dashed border-[2px] font-[600] border-[#1385ff] text-[#1385ff] px-[20px] py-1 rounded-[10px]'} onClick={() => filterdata('All') || setstatus('All')}>
                                            All
                                        </button>
                                    </section>
                                    {/* /view-all-donations */}

                                    <section className='bg-[#1385ff] py-2 rounded-[10px] mt-4'>
                                        <p className='text-[18px] text-center font-[600] text-white'>Transactions</p>
                                    </section>


                                    {
                                        data.length === 0 ?
                                            <section className='text-center w-[100%] mt-4 text-[16px] font-[600]'>No Data Found</section>
                                            :
                                            data.map((items, index) => {
                                                return (
                                                    <section key={index} className='dashboard_notice w-[100%] mt-5 mb-2'>
                                                        <section className='mt-[10px] border-[1px] border-[#1385ff] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                            <div className='flex'>
                                                                <FaDollarSign className='text-[25px] text-[#1385ff]' /> <p className='text-[18px] font-[600] ms-1'>Donation received of Rs. {items.Amount.toLocaleString()}</p>
                                                            </div>
                                                            <div className='flex mt-2'>
                                                                <p className={items.Status === 'Paid' ? 'text-[10px] font-[600] bg-[#cefdd8] px-2 py-1 rounded-[15px] text-[green]' : 'text-[10px] font-[600] bg-[#fdcece] px-2 py-1 rounded-[15px] text-[red]'}> Status : {items.Status}</p>
                                                            </div>

                                                            <div className='flex mt-3 '>
                                                                <p className='text-[16px] ms-1 w-[100%]'>{items.Notice_Description}</p>
                                                            </div>

                                                            <div className='flex mt-3 items-center text-[grey]'>

                                                                <div className='flex'>
                                                                    <FiCalendar className='text-[18px]' /> <p className='text-[14px] ms-2 '><DateFormat value={items.CreatedOn} /></p>
                                                                </div>


                                                                <button className='text-[12px] bg-[#1385ff] text-white font-[600] ms-4 px-2 py-2 rounded-[20px]' onClick={() => setmodal(true) || setmodaldata(items)}>
                                                                    View Details
                                                                </button>
                                                            </div>
                                                        </section>
                                                    </section>
                                                )
                                            })
                                    }

                                </section>
                            </section>
                        </section>
                    </>
            }
        </>
    )
}
