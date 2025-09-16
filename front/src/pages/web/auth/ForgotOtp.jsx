import React, { useEffect, useRef, useState } from 'react'
import { Logo } from '../../../common/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl } from '../../../apiurl/Apiurl'
import { Loader } from '../../../common/Loader'


export function ForgotOtp() {
    let [seconds, setseconds] = useState(60)
    let location = useLocation()
    let email = location.state
    let [otp, setotp] = useState(new Array(4).fill(''))
    let inputrefs = useRef([])
    let [loader, setloader] = useState(false)

    useEffect(() => {
        if (seconds === 0) return;

        var timer = setInterval(() => {
            setseconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    });

    useEffect(() => {
        firstfocus()
    }, [])


    let firstfocus = () => {
        if (inputrefs.current[0]) {
            inputrefs.current[0].focus()
        }
    }





    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)


    let handlechange = (e, index) => {
        let value = e.target.value

        if (isNaN(value)) {
            return 0;
        }
        else {
            const newotp = [...otp]
            newotp[index] = value;
            setotp(newotp)


            if (index < otp.length - 1) {
                inputrefs.current[index + 1].focus()
            }
        }
    }


    let handlekeydown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newOtp = [...otp];
            if (otp[index] === '') {
                if (index > 0) {
                    inputrefs.current[index - 1].focus();
                }
            } else {
                newOtp[index] = '';
            }
            setotp(newOtp);
        }
    }


    let navigate = useNavigate();
    let insertdata = (value) => {
        setloader(true)
        try {
            let finaldata = {
                OTP_Value: value[0] + value[1] + value[2] + value[3],
                Email: email
            }
            apiurl.post('/user/verify-register', finaldata)
                .then((res) => {
                    if (res.data.Status === 1) {
                        document.cookie = `forgottoken=${res.data.Token}`
                        notificationsuccess(res.data.Message)
                        setotp(["", "", "", ""])
                        navigate("/change-password", { state: email })
                    }
                    else {
                        notificationerror(res.data.Message)
                        setotp(["", "", "", ""])
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




    let resendotp = () => {
        setloader(true)
        try {
            let finaldata = {
                Email: email
            }
            apiurl.put('/user/resend-otp', finaldata)
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        setseconds(60)
                    }
                    else {
                        notificationerror(res.data.Message)
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
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='login_main w-[100%] h-[100vh] flex p-2'>
                        <section className='login_banner w-[50%] bg-white rounded-[10px]'>
                        </section>
                        <section className='login_right w-[50%] h-[100%] bg-white flex justify-center items-center flex-col overflow-y-scroll pb-4'>
                            <div className='w-[80%]'>
                                <div className='w-[100%]'>
                                    <div className='w-[160px] mb-4  m-auto'>
                                        <Logo />
                                    </div>
                                    <h1 className='text-[30px] font-[700] text-center text-[var(--primary-color--)]'>OTP VERIFICATION</h1>
                                    <p className='register_subheading text-center mt-2 text-[17px] font-[600]'>We've sent a 4-digit code to your email <br /> ( <span className='text-[var(--primary-color--)]'>{email}</span> ). Please enter it below to verify</p>

                                </div>

                                <section className='register_form mt-5 flex justify-center'>
                                    <div className=' w-[100%] flex items-center justify-center flex-col'>
                                        <div className='w-[80%] flex justify-between'>
                                            {
                                                otp.map((items, index) => {
                                                    return (
                                                        <div key={index} className=' mt-[15px] flex'>
                                                            <input
                                                                type={"text"}
                                                                maxLength={1}
                                                                autoComplete="true"
                                                                ref={(el) => inputrefs.current[index] = el}
                                                                onChange={(e) => handlechange(e, index)}
                                                                onKeyDown={(e) => handlekeydown(e, index)}
                                                                id={`otpinput${index}`}
                                                                value={otp[index]}
                                                                className='otp_inputs w-[80px] outline-[var(--primary-color--)] h-[80px] border-[2px] mt-1 border-[orange] p-3 rounded-[12px] text-[14px] text-center'
                                                            />
                                                        </div>

                                                    )
                                                })
                                            }
                                        </div>

                                        <div className='w-[80%] mt-[20px]'>
                                            <button type='submit' onClick={() => insertdata(otp)} className='w-[100%] bg-[var(--primary-color--)] text-[white] text-[18px] font-[500] py-3 rounded-[10px]'>VERIFY</button>
                                        </div>

                                        <div className='register_bottom_content w-[80%] mt-[20px] text-center flex justify-center items-center text-[15px]'>
                                            <p className='font-[600] text-[grey]'>00 :</p>&nbsp;<span className=' font-[600] text-[var(--primary-color--)]'>{seconds === 0 ? <p className=' cursor-pointer' onClick={() => resendotp()}>Resend</p> : seconds}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
