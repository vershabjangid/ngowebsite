import React, { useContext, useEffect, useState } from 'react'
import { Logo } from './Logo'
import { Link } from 'react-router-dom'
import { LuUserCheck, LuUserPlus } from 'react-icons/lu'
import { HiOutlineBars3BottomRight } from 'react-icons/hi2'
import { FaUser, FaXmark } from 'react-icons/fa6'
import { apiurl, getCookie } from '../apiurl/Apiurl'
import { TbDoorExit } from 'react-icons/tb'
import { CgProfile } from 'react-icons/cg'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from '../pages/web/pages/Context/UserDataContext'
import { Loader } from './Loader'

export function Header() {
    let { user } = useContext(UserContext)
    let [sidebar, setsidebar] = useState(false)
    let [cookie, setcookie] = useState(0)
    let [loader, setloader] = useState(false)
    let checksession = () => {
        try {
            apiurl.post('/user/check-web-session')
                .then((res) => {
                    if (res.data.Status === 1) {
                        console.log(res.data.Message)
                        setcookie(1)
                    }
                    else {
                        document.cookie = 'logintoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
        checksession()
        setloader(true)
    }, [])

    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)
    let logout = (value) => {
        setloader(true)
        try {
            apiurl.post('/user/logout', value, {
                headers: {
                    Authorization: getCookie('logintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        window.location.reload()
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
                    <Loader /> :
                    <section className=' relative'>
                        <header className='bg-[white] h-[90px] flex items-center justify-between p-2 px-3'>
                            <section className='flex items-center'>
                                <section className='Logo_section w-[200px] '>
                                    <Logo />
                                </section>

                                {/* <section className='ms-2'>
                                    <p className='header_heading text-[30px] font-[600]'>RESERVE CATEGORY & MINORITY</p>
                                    <p className='header_sub_heading'>INDIAN CHAMBER OF COMMERCE & INDUSTRY</p>
                                </section> */}
                            </section>

                            <section className='flex items-center'>
                                <div className='head_btn flex justify-center items-center relative'>
                                    {
                                        getCookie('logintoken') && cookie ?
                                            <section className='relative'>
                                                <section className='w-[50px] h-[50px] rounded-[50%] overflow-hidden border-[1px] border-[grey]' onClick={() => setsidebar(!sidebar)} >
                                                    {
                                                        user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                            <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                <FaUser />
                                                            </div>
                                                            :
                                                            <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%] rounded-[50%] ' />
                                                    }
                                                </section>
                                                {
                                                    sidebar ?
                                                        <section className='desktop_megamenu w-[270px] h-[375px] overflow-y-scroll text-white p-2 rounded-[15px] right-0 absolute bg-[black] top-[125%] z-[99999]'>

                                                            {
                                                                getCookie('logintoken') && cookie === 1 ?

                                                                    <div className='w-[100%] flex items-center py-3 cursor-pointer text-white border-b-[1px]'>
                                                                        <div className='w-[100%]'>
                                                                            <div className='ms-2 text-[14px] flex items-center'>
                                                                                <div className='w-[50px] h-[50px] rounded-[50%] overflow-hidden'>
                                                                                    {
                                                                                        user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                                                            <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                                                <FaUser />
                                                                                            </div>
                                                                                            :
                                                                                            <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                                                    }
                                                                                </div>
                                                                                <div className='ms-2'>
                                                                                    <p>
                                                                                        {
                                                                                            user[0] === undefined ? "No Data Found"
                                                                                                :
                                                                                                user[0].Full_Name
                                                                                        }
                                                                                    </p>
                                                                                    <p>
                                                                                        {
                                                                                            user[0] === undefined || user[0].User_ID === undefined ? "No Data Found"
                                                                                                :
                                                                                                user[0].User_ID
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className='w-[100%] px-2 mt-4'>
                                                                                <Link to={"/profile"} className='bg-[white] w-[100%] text-black flex items-center justify-between px-4 py-2 rounded-[100px] font-[500]'>
                                                                                    Profile
                                                                                    <CgProfile />
                                                                                </Link>

                                                                                <button className='bg-[white] w-[100%] text-black flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] mt-3' onClick={() => logout()}>
                                                                                    Logout
                                                                                    <TbDoorExit />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    :
                                                                    <section className='flex items-center flex-col border-b-[1px]'>
                                                                        <Link to={"/sign-up"} className='megamenu_btn w-[250px] font-[600] rounded-[30px] mt-2 bg-[white] text-black py-3 px-4 flex justify-center items-center'>
                                                                            <LuUserPlus className='me-2' /> Become a Member
                                                                        </Link>

                                                                        <Link to={"/sign-in"} className='megamenu_btn w-[250px] font-[600] my-2 rounded-[30px] bg-[white] text-black py-3 px-4 flex justify-center items-center'>
                                                                            <LuUserCheck className='me-2' /> Login
                                                                        </Link>

                                                                    </section>
                                                            }

                                                            {
                                                                getCookie('logintoken') && cookie === 1 ?
                                                                    <>
                                                                        <Link to={"/membership"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Membership
                                                                            </div>
                                                                        </Link>

                                                                        <Link to={"/user-dashboard"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Dashboard
                                                                            </div>
                                                                        </Link>


                                                                        <Link to={"/id-card"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                ID Card
                                                                            </div>
                                                                        </Link>

                                                                        <Link to={"/appointment-letter"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Appointment Letter
                                                                            </div>
                                                                        </Link>


                                                                        <Link to={"/certificates"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Certificates
                                                                            </div>
                                                                        </Link>

                                                                        <Link to={"/notice"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Notices
                                                                            </div>
                                                                        </Link>

                                                                        <Link to={"/donate-us"} className='flex items-center py-3 border-b-[1px]'>

                                                                            <div className='ms-2 text-[14px]'>
                                                                                Donate Us
                                                                            </div>
                                                                        </Link>

                                                                        <Link to={"/transactions"} className='flex items-center py-3'>
                                                                            <div className='ms-2 text-[14px]'>
                                                                                Transactions
                                                                            </div>
                                                                        </Link>



                                                                    </>
                                                                    :
                                                                    null}
                                                            <div>
                                                                <p className='text-white font-[600] ms-2 mt-2 text-[20px]'>
                                                                    Pages
                                                                </p>
                                                            </div>
                                                            <Link to={"/"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    Home
                                                                </div>
                                                            </Link>


                                                            <Link to={"/about"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    About Us
                                                                </div>
                                                            </Link>


                                                            <Link to={"/contact-us"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    Contact Us
                                                                </div>
                                                            </Link>


                                                            <Link to={"/gallery"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    Gallery
                                                                </div>
                                                            </Link>


                                                            <Link to={"/news"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    News & Events
                                                                </div>
                                                            </Link>


                                                            <Link to={"/terms-conditions"} className='flex items-center py-3 border-b-[1px]'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    Terms & Conditions
                                                                </div>
                                                            </Link>


                                                            <Link to={"/privacy-policy"} className='flex items-center py-3'>

                                                                <div className='ms-2 text-[14px]'>
                                                                    Privacy Policy
                                                                </div>
                                                            </Link>


                                                        </section> :
                                                        null
                                                }
                                            </section>
                                            :
                                            <div className='flex'>
                                                <div className='register_header_btn'>
                                                    <Link to={"/sign-up"} className=' font-[600] rounded-[30px] bg-[black] me-2 text-white py-3 px-4 flex items-center'>
                                                        <LuUserPlus className='me-2' /> Become a Member
                                                    </Link>
                                                </div>

                                                <Link to={"/sign-in"} className='head_login_btn font-[600] rounded-[30px] bg-[black] me-2 text-white py-3 px-4 flex items-center'>
                                                    <LuUserCheck className='me-2' /> Login
                                                </Link>

                                                <div className='menubar w-[30px] h-[30px] hidden rounded-[50%] relative' >
                                                    <HiOutlineBars3BottomRight className='text-[25px]' onClick={() => setsidebar(true)} />
                                                </div>
                                            </div>
                                    }
                                </div>
                            </section>
                        </header>

                        {
                            sidebar ?
                                <section className='megamenu hidden fixed right-0 top-[0%]  w-[300px] h-[100vh] overflow-y-scroll bg-[black] z-[99999]'>
                                    <section className='text-white flex items-center  p-2 px-3 justify-between border-b-[1px]'>
                                        <section className='flex items-center'>
                                            <section className='Logo_section w-[200px] '>
                                                <Logo />
                                            </section>

                                            {/* <section className='ms-2 text-white'>
                                                <p className='megamenu_heading text-[30px] font-[600]'>RESERVE CATEGORY & MINORITY</p>
                                                <p className='megamenu_sub_heading'>INDIAN CHAMBER OF COMMERCE & INDUSTRY</p>
                                            </section> */}
                                        </section>

                                        <section className='text-[25px]' onClick={() => setsidebar(false)}><FaXmark /></section>
                                    </section>

                                    {
                                        getCookie('logintoken') && cookie === 1 ?

                                            <div className='w-[100%] flex items-center py-3 cursor-pointer text-white border-b-[1px]'>
                                                <div className='w-[100%]'>
                                                    <div className='ms-2 text-[14px] flex items-center'>
                                                        <div className='w-[50px] h-[50px] border-[1px] rounded-[50%] overflow-hidden'>
                                                            {
                                                                user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                                    <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                        <FaUser />
                                                                    </div>
                                                                    :
                                                                    <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                            }
                                                        </div>
                                                        <div className='ms-2'>
                                                            <p>
                                                                {
                                                                    user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found"
                                                                        :
                                                                        user[0].Full_Name
                                                                }
                                                            </p>
                                                            <p>{user[0] === undefined || user[0].User_ID === undefined ? "No Data Found" : user[0].User_ID}</p>
                                                        </div>
                                                    </div>
                                                    <div className='w-[100%] px-2 mt-4'>
                                                        <Link to={"/profile"} className='bg-[white] w-[100%] text-black flex items-center justify-between px-4 py-2 rounded-[100px] font-[500]'>
                                                            Profile
                                                            <CgProfile />
                                                        </Link>

                                                        <button className='bg-[white] w-[100%] text-black flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] mt-3' onClick={() => logout()}>
                                                            Logout
                                                            <TbDoorExit />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            :
                                            <section className='flex items-center flex-col border-b-[1px]'>
                                                <Link to={"/sign-up"} className='megamenu_btn w-[250px] font-[600] rounded-[30px] mt-2 bg-[white] text-black py-3 px-4 flex justify-center items-center'>
                                                    <LuUserPlus className='me-2' /> Become a Member
                                                </Link>

                                                <Link to={"/sign-in"} className='megamenu_btn w-[250px] font-[600] my-2 rounded-[30px] bg-[white] text-black py-3 px-4 flex justify-center items-center'>
                                                    <LuUserCheck className='me-2' /> Login
                                                </Link>

                                            </section>
                                    }


                                    <section className='text-[white] pb-[60px]'>
                                        {
                                            getCookie('logintoken') && cookie === 1 ?
                                                <>
                                                    <Link to={"/membership"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Membership
                                                        </div>
                                                    </Link>

                                                    <Link to={"/user-dashboard"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Dashboard
                                                        </div>
                                                    </Link>


                                                    <Link to={"/id-card"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            ID Card
                                                        </div>
                                                    </Link>

                                                    <Link to={"/appointment-letter"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Appointment Letter
                                                        </div>
                                                    </Link>


                                                    <Link to={"/certificates"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Certificates
                                                        </div>
                                                    </Link>

                                                    <Link to={"/notice"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Notices
                                                        </div>
                                                    </Link>

                                                    <Link to={"/donate-us"} className='flex items-center py-3 border-b-[1px]'>

                                                        <div className='ms-2 text-[14px]'>
                                                            Donate Us
                                                        </div>
                                                    </Link>

                                                    <Link to={"/transactions"} className='flex items-center py-3'>
                                                        <div className='ms-2 text-[14px]'>
                                                            Transactions
                                                        </div>
                                                    </Link>
                                                </>
                                                :
                                                null}

                                        <div>
                                            <p className='text-white font-[600] ms-2 mt-2 text-[20px]'>
                                                Pages
                                            </p>
                                        </div>

                                        <Link to={"/"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                Home
                                            </div>
                                        </Link>


                                        <Link to={"/about"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                About Us
                                            </div>
                                        </Link>


                                        <Link to={"/contact-us"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                Contact Us
                                            </div>
                                        </Link>


                                        <Link to={"/gallery"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                Gallery
                                            </div>
                                        </Link>


                                        <Link to={"/news"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                News & Events
                                            </div>
                                        </Link>


                                        <Link to={"/terms-conditions"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                Terms & Conditions
                                            </div>
                                        </Link>


                                        <Link to={"/privacy-policy"} className='flex items-center py-3 border-b-[1px]'>

                                            <div className='ms-2 text-[14px]'>
                                                Privacy Policy
                                            </div>
                                        </Link>



                                    </section>
                                </section> :
                                null
                        }
                        <Toaster />
                    </section>
            }
        </>
    )
}
