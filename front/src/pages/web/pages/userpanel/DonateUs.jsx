import React, { useContext, useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs'
import { Header } from '../../../../common/Header'
import { Sidebar } from '../../../../common/Sidebar'
import { useFormik } from 'formik'
import { UserContext } from '../Context/UserDataContext'
import { Logo } from '../../../../common/Logo'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'
import * as Yup from 'yup'


export function DonateUs() {
    let { user } = useContext(UserContext)
    let [amount, setamount] = useState(0)
    let formik = useFormik({
        initialValues: {
            Amount: "",
            Bank_Name: "",
            Branch_Name: "",
            Pan_No: ""
        },
        validationSchema: Yup.object().shape({
            Amount: Yup.number().min("100", 'Minimum amount is ₹100').max("100000", 'Maximum amount is ₹1,00,000').required("Amount is required"),
            Bank_Name: Yup.string().required("Bank name is required"),
            Branch_Name: Yup.string().required("Branch name is required"),
            Pan_No: Yup.string().required("Pan card no is required")
        }),
        onSubmit: () => {
            makepayment(formik.values)
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)


    const loadrazorpay = (src) => {
        return new Promise((resolve) => {
            let script = document.createElement('script');
            script.src = src;
            script.onload=() => {
                resolve(true)
            }
            script.onerror=() => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

     const makepayment = async (value) => {
        apiurl.post('/user/donation-order-id', value, {
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
                }
            })
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
                    amount: amount,
                    currency: "INR",
                    name: user[0] === undefined ? "No Data Found" : user[0].Full_Name,
                    description: `donation to RCMICCI`,
                    order_id: response.id,
                    handler: async function (response) {
                        const res = await apiurl.post('/user/verify-donations', response, {
                            headers: {
                                Authorization: getCookie('logintoken')
                            }
                        })
                        if (res.data.Status === 0) {
                            notificationerror(res.data.Message)
                            // setloader(false)
                        }
                        else {
                            notificationsuccess(res.data.Message)
                            navigate(0)
                            // setloader(false)
                        }
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
            <section className='w-[100%] h-[100vh] border-[1px] border-[red] bg-[#f3f1f1]'>
                <Header />
                <section className='flex h-[calc(100%-90px)] border-t-[1px]  overflow-y-scroll'>
                    <Sidebar />
                    <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                        <section className=' w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <BsCurrencyDollar />
                                <h1 className='font-[600] ms-2'>
                                    Donate Us
                                </h1>
                            </div>

                            <div className='font-[500] text-[15px]'>
                                <p className='text-[#1385ff]'>Here you can donate to support us.</p>
                            </div>
                        </section>

                        {
                            user[0] === undefined ?
                                <section className='text-center text-[16px] mt-3'>
                                    <p className=''>No Form Found</p>
                                    <br />
                                    <Link to={"/sign-in"} className='py-3 px-3 bg-[#1385ff] rounded-[10px] text-white'>
                                        Back to login
                                    </Link>
                                </section> :
                                <section className='flex justify-center mt-[50px]'>
                                    <section className='border-[1px] border-[black] w-[400px] rounded-[10px] bg-[white] p-2'>

                                        <section className='w-[100%]'>
                                            <section className='w-[100px] m-auto'>
                                                <Logo />
                                            </section>
                                            <p className='text-[25px] font-[600] text-center mb-3'>Donate Now</p>
                                        </section>

                                        <form onSubmit={formik.handleSubmit}>
                                            <div>
                                                <label className='text-[16px] font-[500]'>Name</label>
                                                <input type={"text"} defaultValue={user[0] === undefined || user[0] === undefined ? "No Data Found" : user[0].Full_Name} disabled autoComplete="true" className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue('User_Name', e.target.value)} />
                                            </div>

                                            <div>
                                                <label className='text-[16px] font-[500]'>Phone</label>
                                                <input type={"number"} defaultValue={user[0] === undefined ? "No Data Found" : user[1].Phone} disabled autoComplete="true" className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue('Phone', e.target.value)} />
                                            </div>


                                            <div>
                                                <label className='text-[16px] font-[500]'>Enter Amount</label>
                                                <input type={"number"} autoComplete="true" className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue('Amount', e.target.value) || setamount(e.target.value)} />
                                                <div className='text-[15px] text-[red] mt-1'>
                                                    {formik.errors.Amount}
                                                </div>
                                            </div>


                                            <div className='mt-[20px]'>
                                                <p className='text-[16px]'>If You Want To Claim The Tax Deduction, Then Fill Below Fields Or Left Blank</p>
                                            </div>


                                            <div>
                                                <label className='text-[16px] font-[500]'>Bank Name</label>
                                                <input type={"text"} autoComplete="true" className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue('Bank_Name', e.target.value)} />
                                                <div className='text-[15px] text-[red] mt-1'>
                                                    {formik.errors.Bank_Name}
                                                </div>
                                            </div>

                                            <div>
                                                <label className='text-[16px] font-[500]'>Bank Branch</label>
                                                <input type={"text"} autoComplete="true" className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue('Branch_Name', e.target.value)} />
                                                <div className='text-[15px] text-[red] mt-1'>
                                                    {formik.errors.Branch_Name}
                                                </div>
                                            </div>


                                            <div>
                                                <label className='text-[16px] font-[500]'>PAN No.</label>
                                                <input type={"text"} autoComplete="true" maxLength={10} className='w-[100%] border-[1px] border-[black] p-3 rounded-[10px] text-[14px] uppercase' onChange={(e) => formik.setFieldValue('Pan_No', e.target.value)} />
                                                <div className='text-[15px] text-[red] mt-1'>
                                                    {formik.errors.Pan_No}
                                                </div>
                                            </div>


                                            <div>
                                                <button type={"submit"} className='w-[100%] bg-[black] text-white font-[600] p-3 rounded-[10px] text-[16px] mt-4'>
                                                    Donate Now
                                                </button>
                                            </div>
                                        </form>

                                    </section>

                                </section>
                        }
                    </section>
                </section>
            </section>
        </>
    )
}
