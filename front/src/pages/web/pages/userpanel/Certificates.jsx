import React, { useEffect, useState } from 'react'
import { Header } from '../../../../common/Header'
import { Sidebar } from '../../../../common/Sidebar'
import { LiaCertificateSolid } from 'react-icons/lia'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'
import { FaDownload } from 'react-icons/fa6'
import { Loader } from '../../../../common/Loader'

export function Certificates() {

    let [data, setdata] = useState([])
    let [filternoticedata, setfilternoticedata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/user/view-certificates', {
                headers: {
                    Authorization: getCookie('logintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        setdata([])
                    }
                    else {
                        setdata(res.data.viewdata)
                        setfilternoticedata(res.data.viewdata)
                        setimgurl(res.data.imageurl)
                    }
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
        setloader(true)
    }, [])



    let [status, setstatus] = useState('All')
    let filterdata = (value) => {
        setdata(filternoticedata.filter((e) => e.Certificate_ID.includes(value)))
    }


    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] h-[100vh] bg-[#f3f1f1]'>
                        <Header />
                        <section className='pt-[66px]'>
                        </section>
                        <section className='flex h-[calc(100%-75px)] border-t-[1px] mt-2 overflow-y-scroll'>
                            <Sidebar />
                            <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                                <section className=' w-[100%] px-3'>
                                    <div className='text-[25px] flex items-center'>
                                        <LiaCertificateSolid />
                                        <h1 className='font-[600] ms-2'>
                                            Certificates
                                        </h1>
                                    </div>
                                    <div className='font-[500] text-[15px]'>
                                        <p className='text-[var(--primary-color--)]'>Here you can see your all certificates</p>
                                    </div>
                                </section>


                                <section className='mt-[20px]'>
                                    <button className={status === 'All' ? 'text-[14px] border-[2px] font-[600] bg-[var(--primary-color--)] text-[#ffffff] px-[20px] py-[6px] rounded-[10px]' : 'text-[14px] border-dashed border-[2px] font-[600] border-[var(--primary-color--)] text-[var(--primary-color--)] px-[20px] py-1 rounded-[10px]'} onClick={() => filterdata('All') || setstatus('All')}>
                                        All
                                    </button>

                                    <input type="text" className='border-[1px] border-[black] rounded-[5px] py-1 ms-2 px-1 text-[15px]' onChange={(e) => filterdata(e.target.value)} placeholder='Search with CERT ID' />
                                </section>

                                {
                                    data.length === 0 ?
                                        <section className='text-center w-[100%] mt-4 text-[18px]'>No Data Found</section>
                                        :
                                        <section className='w-[100%] flex justify-between flex-wrap'>
                                            {
                                                data.map((items, index) => {
                                                    return (
                                                        <section key={index} className='dashboard_notice w-[30%] mt-5'>
                                                            <section className='mt-[10px] border-[1px] border-[var(--primary-color--)] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                                <section className='flex justify-between'>
                                                                    <div className='flex justify-center items-center rounded-[10px] w-[50px] h-[50px] bg-[white]'>
                                                                        <LiaCertificateSolid className='text-[25px] text-[var(--primary-color--)]' /> <p className='text-[18px] font-[600] ms-1'>{items.Notice_Heading}</p>
                                                                    </div>

                                                                    <div className='flex items-start  mt-2'>
                                                                        <p className='text-[10px] font-[600] bg-[#ffdfc1] px-2 py-1 rounded-[15px] text-[#ff8e25]'> {items.Certificate_Category}</p>
                                                                    </div>
                                                                </section>

                                                                <div className='flex mt-2'>
                                                                    <p className='text-[18px] font-[600] ms-1'>{items.Certificate_Heading}</p>
                                                                </div>

                                                                <div className='flex mt-1 '>
                                                                    <p className='text-[15px] text-[grey]  ms-1 w-[100%]'>{items.Certificate_Description}</p>
                                                                </div>

                                                                <div className='flex justify-between mt-[30px] '>
                                                                    <p className='text-[13px] text-[grey]  ms-1 w-[100%]'>Certificate ID:</p>
                                                                    <p className='text-[13px] text-[grey]  ms-1 w-[100%] text-end'>{items.Certificate_ID}</p>
                                                                </div>


                                                                <div className='flex justify-between my-[5px] '>
                                                                    <p className='text-[13px] text-[grey]  ms-1 w-[100%]'>Issue Date:</p>
                                                                    <p className='text-[13px] text-[grey]  ms-1 w-[100%] text-end'>{items.Date_Of_Issue}</p>
                                                                </div>


                                                                <div className='flex items-center justify-between mt-5 text-[15px]'>
                                                                    <a href={imgurl + items.Certificate_File} download={items.Certificate_File} className='flex w-[60%] py-2 bg-[skyblue] rounded-[10px] text-white justify-center items-center font-[600]'><FaDownload className='me-2' /> Download</a>
                                                                    <a href={imgurl + items.Certificate_File} className='flex w-[38%] py-2 bg-[white] rounded-[10px] text-[skyblue] justify-center items-center font-[600]'>View</a>
                                                                </div>
                                                            </section>
                                                        </section>
                                                    )
                                                })
                                            }
                                            <section className='dashboard_notice w-[30%] mt-5'></section>
                                            <section className='dashboard_notice w-[30%] mt-5'></section>
                                        </section>
                                }

                            </section>
                        </section>
                    </section>
            }
        </>
    )
}
