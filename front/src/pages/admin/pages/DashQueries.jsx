import React, { useEffect, useState } from 'react'
import { FaQuestion, FaXmark } from 'react-icons/fa6'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import toast from 'react-hot-toast'
import { RiDeleteBinLine } from 'react-icons/ri'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { Loader } from '../../../common/Loader'



export function DashQueries() {
    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-query', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 0) {
                        sethomegoalscarddata([])
                    }
                    else {
                        sethomegoalscarddata(res.data.viewdata)
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



    let [modal, setmodal] = useState(false)
    let [modaldata, setmodaldata] = useState([])

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let deletedata = (value) => {
        try {
            apiurl.delete('/admin/delete-query', {
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
                    setmodal(false)
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

    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <>
                        {
                            modal ?
                                <section className='w-[100%] h-[100vh] fixed top-0 bg-[#0000005c] z-[9999] flex items-center justify-center'>
                                    <section className='w-[600px] border-[2px] border-[#7FC2EF] p-2 rounded-[10px] bg-[white]'>
                                        <div>
                                            <p className='py-1'>Full Name : {modaldata.Full_Name}</p>
                                            <p className='py-1'>Phone : {modaldata.Phone}</p>
                                            <p className='py-1'>Email : {modaldata.Email}</p>
                                            <p className='py-1' style={{ whiteSpace: "pre-wrap", }}>Message : {`${modaldata.Message}`}</p>
                                        </div>
                                        <div className='w-[100%] flex mt-4'>
                                            <div className='bg-[#7FC2EF] px-3 py-2 rounded-[10px] text-white my-2 flex items-center' onClick={() => setmodal(false)}><FaXmark className='me-1' /> Cancel</div>
                                            <button className='bg-[red] px-3 py-2 rounded-[10px] text-white ms-2 my-2 flex items-center' onClick={() => deletedata(modaldata)}><RiDeleteBinLine className='me-1' />Delete</button>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }

                        <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                            <WebAdminSidebar />
                            <section className='w-[100%] h-[100%]'>
                                <WebAdminHeader />

                                <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                                    <section className='w-[100%] px-3'>
                                        <div className='text-[25px] flex items-center'>
                                            <FaQuestion />
                                            <h1 className='font-[600] ms-2'>
                                                Queries
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#1385ff]'>Queries</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'> View Queries</p>

                                        {
                                            homegoalscarddata.length === undefined || homegoalscarddata.length === 0 ?
                                                <div className='text-center font-[600] text-[grey]'>No Data Found</div>
                                                :
                                                <table className='w-[100%] bg-[white] rounded-[10px]'>
                                                    <thead>
                                                        <tr>
                                                            <th className='py-5'>S.no</th>
                                                            <th className='py-5'>Full Name</th>
                                                            <th className='py-5'>Phone</th>
                                                            <th className='py-5'>Email</th>
                                                            <th className='py-5'>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            homegoalscarddata.map((items, index) => {
                                                                return (
                                                                    <tr key={index} className='text-center '>
                                                                        <td className='py-5'>{index + 1}</td>
                                                                        <td className='py-5'>{items.Full_Name}</td>
                                                                        <td className='py-5'>{items.Phone}</td>
                                                                        <td className='py-5'>{items.Email}</td>
                                                                        <td className='py-1'><button className='w-[70%] bg-[#7FC2EF] py-3 text-white font-[700] rounded-[10px] ' onClick={() => setmodal(true) || setmodaldata(items)}> View</button></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                        }

                                    </section>
                                </section>
                            </section>
                        </section>
                    </>
            }
        </>
    )
}
