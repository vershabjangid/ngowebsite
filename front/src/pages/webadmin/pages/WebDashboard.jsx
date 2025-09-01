import React, { useEffect, useState } from 'react'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { MdOutlineDashboard } from 'react-icons/md'
import { FaDollarSign, FaHandHoldingDollar, FaIndianRupeeSign, FaMoneyBillTrendUp, FaQuestion } from 'react-icons/fa6'
import { FiCalendar, FiUser } from 'react-icons/fi'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { UsersChart } from './Web Dashboard/UsersChart'
import { useNavigate } from 'react-router-dom'
import DateFormat from '../../../common/DateFormat'

export function WebDashboard() {

    let [data, setdata] = useState([])
    let [profiledata, setprofiledata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let [donations, setdonations] = useState([])
    let [membership, setmembership] = useState([])
    let [queries, setqueries] = useState([])

    let calcdonation = 0;
    let calcmembership = 0;

    donations.map((items, index) => {
        calcdonation = items.Amount + calcdonation
    })


    membership.map((items, index) => {
        calcmembership = items.Amount + calcmembership
    })


    let fetchdata = async () => {
        try {
            let [usersdata, donationdata, membershipdata, queriesdata] = await Promise.all([
                apiurl.get('/admin/view-users', {
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                }),
                apiurl.get('/admin/view-all-donations', {
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                }),
                apiurl.get('/admin/view-all-membership-transactions', {
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                }),
                apiurl.get('/admin/view-query', {
                    headers: {
                        Authorization: getCookie('admintoken')
                    }
                })
            ])

            return {
                userdata: usersdata.data,
                donationdata: donationdata.data,
                membershipdata: membershipdata.data,
                queriesdata: queriesdata.data.viewdata
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let viewdata = () => {
        try {
            fetchdata()
                .then((res) => {
                    if (res.userdata.Status === 0) {
                        setdonations([])
                        setqueries([])
                        setmembership([])
                        setdata([])
                    }
                    else {
                        setdata(res.userdata.viewprofile);
                        setprofiledata(res.userdata.viewdata)
                        setimgurl(res.userdata.imageurl)
                        setdonations(res.donationdata)
                        setmembership(res.membershipdata)
                        setqueries(res.queriesdata)
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        viewdata()
    }, [])



    let navigate = useNavigate()

    let viewprofile = (value) => {
        navigate('/view-user-profile', { state: value })
    }
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <WebAdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <WebAdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <MdOutlineDashboard />
                                <h1 className='font-[600] ms-2'>
                                    Dashboard
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'></span></p>
                            </div>
                        </section>

                        <section className='w-[100%] p-2 my-2'>
                            <section className='dashboard_status_cards_section w-[100%] mt-5'>
                                <div className='dashboard_status_cards w-[23%] p-2 rounded-[10px] bg-gradient-to-r from-[#f86d02] to-[#f5af7a]'>
                                    <div className='w-[40px] h-[40px] rounded-[10px] p-2 bg-[white] text-[20px] text-[#f86d02] flex items-center justify-center'>
                                        <FiUser />
                                    </div>
                                    <div className='text-white'>
                                        <p className='text-[18px] font-[600] mt-2'>Total Users</p>
                                        <p className='text-[18px] font-[500]'>
                                            {data.length}
                                        </p>
                                    </div>
                                </div>

                                <div className='dashboard_status_cards w-[23%] p-2 rounded-[10px] bg-gradient-to-r from-[#5402f8] to-[#7a80f5]'>
                                    <div className='w-[40px] h-[40px] rounded-[10px] p-2 bg-[white] text-[20px] text-[#5402f8] flex items-center justify-center'>
                                        <FaHandHoldingDollar />
                                    </div>
                                    <div className='text-white'>
                                        <p className='text-[18px] font-[600] mt-2'>Total Donation</p>
                                        <p className='text-[18px] font-[500] flex items-center'>
                                            <FaIndianRupeeSign /> {calcdonation}
                                        </p>
                                    </div>
                                </div>

                                <div className='dashboard_status_cards w-[23%] p-2 rounded-[10px] bg-gradient-to-r from-[#004718] to-[#5ca478]'>
                                    <div className='w-[40px] h-[40px] rounded-[10px] p-2 bg-[white] text-[20px] text-[#004718] flex items-center justify-center'>
                                        <FaMoneyBillTrendUp />
                                    </div>
                                    <div className='text-white'>
                                        <p className='text-[18px] font-[600] mt-2'>Total Membership Revenue</p>
                                        <p className='text-[18px] font-[500] flex items-center'>
                                            <FaIndianRupeeSign /> {calcmembership}
                                        </p>
                                    </div>
                                </div>

                                <div className='dashboard_status_cards w-[23%] p-2 rounded-[10px] bg-gradient-to-r from-[#f802d3] to-[#f57ae7]'>
                                    <div className='w-[40px] h-[40px] rounded-[10px] p-2 bg-[white] text-[20px] text-[#f802d3] flex items-center justify-center'>
                                        <FaQuestion />
                                    </div>
                                    <div className='text-white'>
                                        <p className='text-[18px] font-[600] mt-2'>Total Queries</p>
                                        <p className='text-[16px] font-[500] flex items-center'>
                                            {queries.length}
                                        </p>
                                    </div>
                                </div>
                            </section>


                            <section className='w-[100%] p-2 my-4 rounded-[10px] flex justify-between items-start'>
                                <section className='w-[49%]'>
                                    <UsersChart value={profiledata} />

                                    <section className='w-[100%] h-[365px] bg-[white] mt-3 p-2 rounded-[20px]'>
                                        <section className='border-b-[1px] border-[#1385ff] py-1'>
                                            <p className='flex items-center text-[20px] text-[#1385ff]'><FaHandHoldingDollar className='me-2' />Donations</p>
                                        </section>

                                        <section className='h-[calc(100%-50px)] overflow-y-scroll'>
                                            {
                                                donations.length === 0 ?
                                                    <section className='text-center w-[100%] mt-4 text-[16px] font-[600]'>No Data Found</section>
                                                    :
                                                    donations.map((items, index) => {
                                                        return (
                                                            <section key={index} className='dashboard_notice w-[100%] mt-5'>
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
                                                                    </div>
                                                                </section>
                                                            </section>
                                                        )
                                                    })
                                            }
                                        </section>
                                    </section>
                                </section>


                                <section className='w-[49%] h-[700px] bg-[white] rounded-[20px] p-2 py-4'>
                                    <section className='border-b-[1px] border-[#1385ff] py-1'>
                                        <p className='flex items-center text-[20px] text-[#1385ff]'><FiUser className='me-2' /> All Users</p>
                                    </section>

                                    <section className='w-[100%] h-[calc(100%-35px)] overflow-y-scroll mt-2'>
                                        <table className='w-[100%] text-center text-[13px]'>
                                            <thead className='text-center'>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile.No</th>
                                                    <th>View Profile</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    data.map((items, index) => {
                                                        return (
                                                            <tr key={index} className='text-[12px]'>
                                                                {
                                                                    profiledata.map((values, ind) => {
                                                                        return (
                                                                            <>
                                                                                {
                                                                                    values.Sub_Id === items._id ?
                                                                                        <>
                                                                                            <td className='py-2'>{values.Full_Name}</td>
                                                                                            <td className='py-2'>{items.Email}</td>
                                                                                            <td className='py-2'>{items.Phone}</td>
                                                                                            <td className=' flex items-center justify-center py-2'>
                                                                                                <button className='px-2 py-2 bg-[#1385ff] rounded-[10px] text-white font-[600]' onClick={() => viewprofile([items, values, imgurl])}>
                                                                                                    View Profile
                                                                                                </button>
                                                                                            </td>
                                                                                        </> :
                                                                                        null
                                                                                }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </section>
                                </section>
                            </section>




                            <section className='w-[100%] p-2 rounded-[10px] flex justify-between items-start'>
                                <section className='w-[49%]'>


                                    <section className='w-[100%] h-[400px] bg-[white] p-2 rounded-[20px]'>
                                        <section className='border-b-[1px] border-[#1385ff] py-1'>
                                            <p className='flex items-center text-[20px] text-[#1385ff]'><FaMoneyBillTrendUp className='me-2' />Total Membership</p>
                                        </section>

                                        <section className='h-[calc(100%-50px)] overflow-y-scroll'>
                                            {
                                                membership.length === 0 ?
                                                    <section className='text-center w-[100%] mt-4 text-[16px] font-[600]'>No Data Found</section>
                                                    :
                                                    membership.map((items, index) => {
                                                        return (
                                                            <section key={index} className='dashboard_notice w-[100%] mt-5'>
                                                                <section className='mt-[10px] border-[1px] border-[#1385ff] bg-[#c4e0ffa3] p-4 rounded-[10px]'>
                                                                    <div className='flex'>
                                                                        <FaDollarSign className='text-[25px] text-[#1385ff]' /> <p className='text-[18px] font-[600] ms-1'>Membership received of Rs. {items.Amount.toLocaleString()}</p>
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
                                                                    </div>
                                                                </section>
                                                            </section>
                                                        )
                                                    })
                                            }

                                        </section>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>


                </section>
            </section>
        </>
    )
}
