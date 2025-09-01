import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaCreditCard, FaIndianRupeeSign, FaMinus, FaPlus } from "react-icons/fa6";
import { LuShieldCheck } from "react-icons/lu";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { apiurl, getCookie } from '../../../apiurl/Apiurl';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export function Donation() {

    let [donation, setdonation] = useState(100)
    let [loading, setloading] = useState(false)
    let formik = useFormik({
        initialValues: {
            Name: "",
            Email: "",
            Phone: "",
            Address: "",
            Pan_No: "",
            Bank_Name: "",
            Bank_Branch: "",
            Amount: donation || "",

        },

        onSubmit: () => {
            formik.values.Amount = donation
            insertdata(formik.values)
        }
    })

    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)


    const loadrazorpay = (src) => {
        return new Promise((resolve) => {
            let script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    let insertdata = (value) => {
        try {
            apiurl.post('/user/donation-now', value)
                .then((res) => {
                    if (res.data.Status !== 0) {
                        handlescreen({ res, value })
                    }
                    else {
                        notificationerror(res.data.Message)
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



    let navigate = useNavigate()
    const handlescreen = async (response) => {
        try {
            const res = await loadrazorpay("https://checkout.razorpay.com/v1/checkout.js")
            if (!res) {
                notificationerror("Slow Internet Connection")
                // setloader(false)
                return;
            }
            else {
                const options = {
                    key: "rzp_test_R8uShBQ0igwiZw",
                    amount: response.res.data.amount,
                    currency: "INR",
                    name: response.value === undefined ? "No Data Found" : response.value.Name,
                    description: `donation to RCMICCI`,
                    order_id: response.res.data.id,
                    handler: async function (response) {
                        console.log(response)
                        const res = await apiurl.post('/user/verify-donate-now', response, {
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
                    },
                    prefill: {
                        name: response.value === undefined || response.value.Name === undefined ? "No Data Found" : response.value.Name,
                        email: response.value === undefined || response.value.Email === undefined ? "No Data Found" : response.value.Email,
                        contact: response.value === undefined || response.value.Phone === undefined ? "No Data Found" : response.value.Phone
                    },
                    theme: {
                        color: "#000000"
                    }
                }
                const paymentobject = new window.Razorpay(options);
                paymentobject.open()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* <a href='#donation_section' className='donate_now_btn fixed bottom-[100px] z-[99999] left-[2%] font-[600] bg-[#1385ff] text-white py-2 px-[10px] rounded-[20px]'>Donate Now</a> */}
            <section id='donation_section' className='donation_section w-[100%] py-[20px] px-[10px] border-b-[1px] border-[black] '>

                <section className='w-[100%] text-center'>
                    <h2 className='home_heading capitalize text-[35px] font-[700] text-[#1385ff]'>
                        Support Our Mission
                        <div className='heading_hoverline border-b-[3px] border-[#1385ff] m-auto mt-1 '></div>
                    </h2>
                    <p className='text-center capitalize  my-[20px] mb-[20px] leading-[25px] text-[16px]'>
                        Your donation directly transforms lives and creates lasting change in communities worldwide
                    </p>
                </section>

                <section className='mt-2 w-[100%] '>
                    <section className="w-[100%] flex items-center justify-center py-5">
                        <form onSubmit={formik.handleSubmit} className='donation_form_section w-[80%] border-[5px] border-[#ffffff] m-auto overflow-hidden rounded-[20px] flex' >
                            <section className='p-3 bg-[#ffffff82] backdrop-blur-[2] w-[50%]'>
                                <p className='font-[600] text-[20px] text-[#1385ff] text-center'>Make a Donation</p>
                                <p className=' text-[15px] text-[grey] text-center'>Choose an amount that feels right for you</p>

                                <section className='w-[100%] mt-3'>
                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Name</label>
                                        <input type="text" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Name', e.target.value)} />

                                    </div>

                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Email address</label>
                                        <input type="email" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Email', e.target.value)} />
                                    </div>

                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Mobile.no</label>
                                        <input type="number" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Phone', e.target.value)} />
                                    </div>

                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Residential address</label>
                                        <input type="text" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Address', e.target.value)} />
                                    </div>


                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Pancard.no</label>
                                        <input type="text" maxLength={10} className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Pan_No', e.target.value)} />
                                    </div>

                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Bank Name</label>
                                        <input type="text" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Bank_Name', e.target.value)} />
                                    </div>

                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Branch Name</label>
                                        <input type="text" className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Bank_Branch', e.target.value)} />
                                    </div>
                                </section>
                            </section>

                            <section className='p-3 bg-[#ffffff82] backdrop-blur-[2] w-[50%]'>
                                <section className='donation_value_section w-[100%] flex justify-between flex-wrap mt-3'>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(100)}> <FaIndianRupeeSign className='me-1' /> 100</div>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(500)}> <FaIndianRupeeSign className='me-1' /> 500</div>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(1000)}> <FaIndianRupeeSign className='me-1' /> 1000</div>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(1500)}> <FaIndianRupeeSign className='me-1' /> 1500</div>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(3000)}> <FaIndianRupeeSign className='me-1' /> 3000</div>
                                    <div className='cursor-pointer text-[#1385ff] w-[30%] border-[2px] border-[#1385ff] bg-[white] rounded-[10px] font-[600] mt-2 py-3 flex items-center justify-center' onClick={() => setdonation(10000)}> <FaIndianRupeeSign className='me-1' /> 10000</div>
                                </section>


                                <section className='w-[100%] mt-3'>
                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Amount</label>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <FaMinus onClick={() => setdonation(donation <= 100 ? 100 : donation - 50)} />
                                            </div>
                                            <input type="range" className='bg-[white] w-[90%] border-[2px] border-[#1385ff] rounded-[10px]' value={donation} onChange={(e) => formik.setFieldValue('Amount', e.target.value) && setdonation(Number(e.target.value))} min={100} step={50} max={100000} />
                                            <div>
                                                <FaPlus onClick={() => setdonation(donation >= 100000 ? 100000 : donation + 50)} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className='w-[100%] mt-3'>
                                    <div className='text-[#1385ff] w-[100%] mt-3'>
                                        <label className='font-[600]'>Amount</label>
                                        <input type="number" value={donation} disabled className='bg-[white] w-[100%] border-[2px] border-[#1385ff] rounded-[10px] p-2' onChange={(e) => formik.setFieldValue('Amount', e.target.value)} />
                                    </div>
                                </section>

                                {
                                    donation > 0 ?
                                        <section className='w-[100%] mt-3 bg-[#1385ff] p-2 py-3 rounded-[10px] text-white'>
                                            <p className='font-[500]'>Your Impact:</p>
                                            <p className='flex items-center w-[100%] text-[16px] font-[500] mt-2'>Your donation of &nbsp; ₹ {donation.toLocaleString()} will make a significant difference in someone's life.</p>
                                        </section> :
                                        null
                                }


                                <button type='submit' className='w-[100%] mt-3 bg-[#1385ff] p-2 py-3 rounded-[10px] font-[600] text-white flex items-center justify-center'>
                                    <FaCreditCard className='me-2' /> Donate Now
                                </button>


                                <section className='donation_label_section mt-[20px] w-[100%] flex justify-between'>
                                    <section className='bg-[white] border-[1px] w-[48%] border-[black] p-2 py-3 rounded-[10px] flex '>
                                        <section className='w-[40px] h-[40px] bg-[#1385ff] rounded-[10px] flex justify-center items-center text-white text-[30px]'>
                                            <LuShieldCheck />
                                        </section>

                                        <section className='ms-2'>
                                            <p className='font-[600] text-[15px]'>SSL Secured</p>
                                            <p className='text-[12px]'>256-bit encryption</p>
                                        </section>
                                    </section>


                                    <section className='bg-[white] border-[1px] w-[48%] border-[black] p-2 py-3 rounded-[10px] flex '>
                                        <section className='w-[40px] h-[40px] bg-[#1385ff] rounded-[10px] flex justify-center items-center text-white text-[30px]'>
                                            <RiVerifiedBadgeLine />
                                        </section>

                                        <section className='ms-2'>
                                            <p className='font-[600] text-[15px]'>Verified NGO</p>
                                            <p className='text-[12px]'>Tax-deductible</p>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        </form>
                    </section>

                </section>
                <Toaster />
            </section>
        </>
    )
}
