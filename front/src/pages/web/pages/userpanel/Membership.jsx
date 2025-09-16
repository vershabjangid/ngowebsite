import React, { useContext, useEffect, useState } from 'react'
import { LuUserCheck } from 'react-icons/lu'
import { Sidebar } from '../../../../common/Sidebar'
import { Header } from '../../../../common/Header'
import toast from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'
import { useNavigate } from 'react-router-dom'
import DateFormat from '../../../../common/DateFormat'
import { UserContext } from '../Context/UserDataContext'
import { Loader } from '../../../../common/Loader'



export function Membership() {
    let { user } = useContext(UserContext)

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let [loader, setloader] = useState(false)

    const loadrazorpay = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }


    const makepayment = async (amount) => {
        setloader(true)
        apiurl.post('/user/membership-order-id', amount, {
            headers: {
                Authorization: getCookie('logintoken')
            }
        })
            .then((res) => {
                if (res.data.Status !== 0) {
                    handlescreen(res.data)
                }
                else {
                    notificationerror(res.data.Message)
                    setloader(false)
                }
            })
    }



    let navigate = useNavigate()
    const handlescreen = async (response) => {
        setloader(true)
        try {
            const res = await loadrazorpay("https://checkout.razorpay.com/v1/checkout.js")
            if (!res) {
                notificationerror("Slow Internet Connection")
                setloader(false)
                return;
            }
            else {
                const options = {
                    key: "rzp_test_R8uShBQ0igwiZw",
                    amount: response.amount,
                    currency: "INR",
                    name: user[0] === undefined ? "No Data Found" : user[0].Full_Name,
                    description: `payment to RCMICCI`,
                    order_id: response.id,
                    handler: async function (response) {
                        const res = await apiurl.post('/user/verify-membership', response, {
                            headers: {
                                Authorization: getCookie('logintoken')
                            }
                        })
                        if (res.data.Status === 0) {
                            notificationerror(res.data.Message)
                        }
                        else {
                            notificationsuccess(res.data.Message)
                            navigate(0)
                        }
                        setloader(false)
                    },
                    prefill: {
                        name: user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found" : user[0].Full_Name,
                        email: user[1] === undefined ? "No Data Found" : user[1].Email,
                        contact: user[1] === undefined ? "No Data Found" : user[1].Phone
                    },
                    theme: {
                        color: "#000000"
                    }
                }

                const paymentobject = new window.Razorpay(options)
                paymentobject.open()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let [data, setdata] = useState([])
    let viewdata = () => {
        try {
            apiurl.get('/user/verify-membership', {
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

    return (
        <>{
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
                                    <LuUserCheck />
                                    <h1 className='font-[600] ms-2'>
                                        Membership Status
                                    </h1>
                                </div>

                                <div className='font-[500] text-[15px]'>
                                    <p className='text-[var(--primary-color--)]'>Here you can see your membership status</p>
                                </div>
                            </section>


                            <section className='flex justify-center items-center flex-col h-[calc(100%-60px)]'>
                                <section className='membership_status_card border-[1px] border-[black] w-[350px] rounded-[10px]'>
                                    <section className='text-[16px] p-2 text-center bg-[var(--primary-color--)] rounded-t-[10px] text-white'>Membership Status</section>
                                    <table className='flex justify-between w-[100%]'>
                                        <thead className='w-[50%]'>
                                            <tr className='w-[100%] text-[13px] flex flex-col items-start text-start'>
                                                <th className='w-[100%] py-2 text-start ps-2 '>Registration No :</th>
                                                <th className='w-[100%] py-2 text-start ps-2 border-t-[1px] border-[black]'>Accounts Status :</th>
                                                <th className='w-[100%] py-2 text-start ps-2 border-t-[1px] border-[black]'>Validity :</th >
                                                <th className='w-[100%] py-2 text-start ps-2 border-t-[1px] border-[black]'>Membership Fee :</th>
                                            </tr>
                                        </thead>


                                        <tbody className='w-[50%]'>
                                            <tr className='w-[100%] text-[13px] flex flex-col'>
                                                <td className='py-2'>{user[0] === null || user[0] === undefined || user[0].User_ID === undefined ? "No Data Found" : user[0].User_ID}</td>
                                                <td className='py-2 border-t-[1px] border-[black]'>{data.Status === 'Paid' ? 'Active' : 'De-Active'}</td>
                                                <td className='py-2 border-t-[1px] border-[black]'>{data.ExpiresOn === undefined ? "No Data Found" : <DateFormat value={data.ExpiresOn} />}</td>
                                                <td className='py-2 border-t-[1px] border-[black]'>{data.Amount === undefined ? "No Data Found" : `Rs. ${data.Amount}`}</td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </section>
                                {
                                    data.ExpiresOn === undefined ? <button className='mt-4 text-[16px] text-white bg-[var(--primary-color--)] p-2 px-3 rounded-[10px]' onClick={() => makepayment()}>Pay Now</button> :
                                        null
                                }
                            </section>
                        </section>
                    </section>
                </section>
        }
        </>
    )
}
