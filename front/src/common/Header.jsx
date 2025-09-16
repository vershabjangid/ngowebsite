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
                    <section className='fixed z-[999999] w-[100%] bg-[#ffffffe2]  backdrop-blur-[5px]'>
                        <header className='flex items-center justify-between py-3 px-3 border-b-[1px]'>
                            <section className='flex items-center'>
                                <section className='Logo_section w-[170px] '>
                                    <Logo />
                                </section>
                            </section>

                            <section>
                                <ul className='header_options flex text-[black] justify-evenly font-[500] text-[15px]'>
                                    <li className=''><Link to={"/"}>Home</Link></li>
                                    <li className='ms-10'><Link to={"/about"}>About Us</Link></li>
                                    <li className='ms-10'><Link to={"/gallery"}>Gallery</Link></li>
                                    <li className='ms-10'><Link to={"/news"}>News & Events</Link></li>
                                    <li className='ms-10'><Link to={"/contact-us"}>Contact Us</Link></li>
                                </ul>
                            </section>

                            <section>
                                <div className='flex items-center justify-between w-[100%]'>

                                    {
                                        getCookie('logintoken') && cookie ?

                                            <section className=' relative'>
                                                <section className='w-[50px] h-[50px] rounded-[50%] overflow-hidden border-[1px] border-[grey]' onClick={() => setsidebar(!sidebar)}>
                                                    {
                                                        user[0] === null || user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                            <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                <FaUser />
                                                            </div>
                                                            :
                                                            <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%] rounded-[50%] ' />
                                                    }

                                                </section>

                                                {
                                                    sidebar ?
                                                        <section className='desktop_megamenu w-[280px] h-[400px] overflow-y-scroll absolute bg-[white] p-2 right-0 top-[130%] rounded-[10px]'>
                                                            {
                                                                getCookie('logintoken') && cookie === 1 ?

                                                                    <div className='w-[100%] flex items-center py-3 cursor-pointer border-b-[1px] border-[var(--primary-color--)]'>
                                                                        <div className='w-[100%]'>
                                                                            <div className='ms-2 text-[14px] flex items-center'>
                                                                                <div className='w-[50px] h-[50px] border-[1px] rounded-[50%] overflow-hidden'>
                                                                                    {
                                                                                        user[0] === null ||user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                                                            <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                                                <FaUser />
                                                                                            </div>
                                                                                            :
                                                                                            <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                                                    }
                                                                                </div>

                                                                                <div className='ms-2 text-[var(--primary-color--)]'>
                                                                                    <p>
                                                                                        {
                                                                                            user[0] === null || user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found"
                                                                                                :
                                                                                                user[0].Full_Name
                                                                                        }
                                                                                    </p>
                                                                                    <p>{user[0] === undefined || user[0].User_ID === undefined ? "No Data Found" : user[0].User_ID}</p>
                                                                                </div>
                                                                            </div>


                                                                            <div className='w-[100%] px-2 mt-4'>
                                                                                <Link to={"/profile"} className='bg-[white] w-[100%] text-[var(--primary-color--)] flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] border-[2px] border-[var(--primary-color--)]'>
                                                                                    Profile
                                                                                    <CgProfile />
                                                                                </Link>

                                                                                <button className='bg-[white] w-[100%] text-[var(--primary-color--)] flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] mt-3 border-[2px] border-[var(--primary-color--)]' onClick={() => logout()}>
                                                                                    Logout
                                                                                    <TbDoorExit />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    :
                                                                    <>

                                                                        <section className='flex items-center flex-col border-b-[1px] border-[var(--primary-color--)]'>
                                                                            <Link to={"/sign-up"} className=' w-[90%] font-[600] rounded-[30px] mt-2 bg-[white]  py-3 px-4 flex justify-center items-center  text-[var(--primary-color--)] border-[2px] border-[var(--primary-color--)]'>
                                                                                <LuUserPlus className='me-2' /> Become a Member
                                                                            </Link>

                                                                            <Link to={"/sign-in"} className=' w-[90%]  font-[600] my-2 rounded-[30px] bg-[white] py-3 px-4 flex justify-center items-center  text-[var(--primary-color--)] border-[2px] border-[var(--primary-color--)]'>
                                                                                <LuUserCheck className='me-2' /> Login
                                                                            </Link>
                                                                        </section>
                                                                    </>


                                                            }




                                                            <section className='text-[var(--primary-color--)] pb-[60px]'>
                                                                {
                                                                    getCookie('logintoken') && cookie === 1 ?
                                                                        <>
                                                                            <Link to={"/membership"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    Membership
                                                                                </div>
                                                                            </Link>

                                                                            <Link to={"/user-dashboard"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    Dashboard
                                                                                </div>
                                                                            </Link>


                                                                            <Link to={"/id-card"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    ID Card
                                                                                </div>
                                                                            </Link>

                                                                            <Link to={"/appointment-letter"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    Appointment Letter
                                                                                </div>
                                                                            </Link>


                                                                            <Link to={"/certificates"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    Certificates
                                                                                </div>
                                                                            </Link>

                                                                            <Link to={"/notice"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                                <div className='ms-2 text-[14px]'>
                                                                                    Notices
                                                                                </div>
                                                                            </Link>

                                                                            <Link to={"/donate-us"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

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
                                                                        null
                                                                }

                                                                <section className='text-[var(--primary-color--)]'>
                                                                    <div>
                                                                        <p className=' font-[600] ms-2 mt-2 text-[20px]'>
                                                                            Pages
                                                                        </p>
                                                                    </div>

                                                                    <Link to={"/"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            Home
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/about"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            About Us
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/contact-us"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            Contact Us
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/gallery"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            Gallery
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/news"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            News & Events
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/terms-conditions"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            Terms & Conditions
                                                                        </div>
                                                                    </Link>


                                                                    <Link to={"/privacy-policy"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                                        <div className='ms-2 text-[14px]'>
                                                                            Privacy Policy
                                                                        </div>
                                                                    </Link>
                                                                </section>

                                                            </section>

                                                        </section> :
                                                        null
                                                }
                                            </section>
                                            :
                                            <>
                                                {/* join us btn  */}
                                                <Link to={"/sign-in"} className='head_login_btn font-[600] bg-[white] transition-[1s] rounded-[15px] text-[var(--primary-color--)] border-[2px] border-[var(--primary-color--)]  me-2  py-2 px-3 flex items-center hover:bg-[var(--primary-color--)] hover:text-[white]'>
                                                    <LuUserPlus className='me-2' /> Join Us
                                                </Link>

                                                {/* sidebar hide show btn  */}
                                                {
                                                    sidebar ?
                                                        <section className='text-[25px]' onClick={() => setsidebar(false)}><FaXmark /></section>
                                                        :
                                                        <div className='menubar w-[30px] h-[30px] hidden rounded-[50%] relative' >
                                                            <HiOutlineBars3BottomRight className='text-[25px]' onClick={() => setsidebar(true)} />
                                                        </div>
                                                }
                                            </>
                                    }

                                </div>
                            </section>
                        </header>


                        {/* sidebar section  */}
                        <section className={sidebar ? 'sidebar hidden w-[100%] h-[calc(100vh-67px)] overflow-y-scroll transition-[1]' : 'sidebar w-[100%] hidden h-[0] overflow-y-scroll transition-[1]'}>
                            {
                                getCookie('logintoken') && cookie === 1 ?

                                    <div className='w-[100%] flex items-center py-3 cursor-pointer border-b-[1px] border-[var(--primary-color--)]'>
                                        <div className='w-[100%]'>
                                            <div className='ms-2 text-[14px] flex items-center'>
                                                <div className='w-[50px] h-[50px] border-[1px] rounded-[50%] overflow-hidden'>
                                                    {
                                                        user[0] === null || user[0] === undefined || user[0].Profile_Picture === undefined ?
                                                            <div className='w-[100%] h-[100%] flex justify-center items-end text-[30px] text-[grey]'>
                                                                <FaUser />
                                                            </div>
                                                            :
                                                            <img src={user[2] + user[0].Profile_Picture} alt="" className='w-[100%] h-[100%]' />
                                                    }
                                                </div>

                                                <div className='ms-2 text-[var(--primary-color--)]'>
                                                    <p>
                                                        {
                                                            user[0] === null || user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found"
                                                                :
                                                                user[0].Full_Name
                                                        }
                                                    </p>
                                                    <p>{user[0] === null || user[0] === undefined || user[0].User_ID === undefined ? "No Data Found" : user[0].User_ID}</p>
                                                </div>
                                            </div>
                                            <div className='w-[100%] px-2 mt-4'>
                                                <Link to={"/profile"} className='bg-[white] w-[100%] text-[var(--primary-color--)] flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] border-[2px] border-[var(--primary-color--)]'>
                                                    Profile
                                                    <CgProfile />
                                                </Link>

                                                <button className='bg-[white] w-[100%] text-[var(--primary-color--)] flex items-center justify-between px-4 py-2 rounded-[100px] font-[500] mt-3 border-[2px] border-[var(--primary-color--)]' onClick={() => logout()}>
                                                    Logout
                                                    <TbDoorExit />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    :
                                    <>

                                        <section className='flex items-center flex-col border-b-[1px] border-[var(--primary-color--)]'>
                                            <Link to={"/sign-up"} className=' w-[90%] font-[600] rounded-[30px] mt-2 bg-[white]  py-3 px-4 flex justify-center items-center  text-[var(--primary-color--)] border-[2px] border-[var(--primary-color--)]'>
                                                <LuUserPlus className='me-2' /> Become a Member
                                            </Link>

                                            <Link to={"/sign-in"} className=' w-[90%]  font-[600] my-2 rounded-[30px] bg-[white] py-3 px-4 flex justify-center items-center  text-[var(--primary-color--)] border-[2px] border-[var(--primary-color--)]'>
                                                <LuUserCheck className='me-2' /> Login
                                            </Link>
                                        </section>
                                    </>


                            }

                            <section className='text-[var(--primary-color--)] pb-[60px]'>
                                {
                                    getCookie('logintoken') && cookie === 1 ?
                                        <>
                                            <Link to={"/membership"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    Membership
                                                </div>
                                            </Link>

                                            <Link to={"/user-dashboard"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    Dashboard
                                                </div>
                                            </Link>


                                            <Link to={"/id-card"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    ID Card
                                                </div>
                                            </Link>

                                            <Link to={"/appointment-letter"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    Appointment Letter
                                                </div>
                                            </Link>


                                            <Link to={"/certificates"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    Certificates
                                                </div>
                                            </Link>

                                            <Link to={"/notice"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                                <div className='ms-2 text-[14px]'>
                                                    Notices
                                                </div>
                                            </Link>

                                            <Link to={"/donate-us"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

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
                                        null
                                }

                                <section className='text-[var(--primary-color--)]'>
                                    <div>
                                        <p className=' font-[600] ms-2 mt-2 text-[20px]'>
                                            Pages
                                        </p>
                                    </div>

                                    <Link to={"/"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            Home
                                        </div>
                                    </Link>


                                    <Link to={"/about"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            About Us
                                        </div>
                                    </Link>


                                    <Link to={"/contact-us"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            Contact Us
                                        </div>
                                    </Link>


                                    <Link to={"/gallery"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            Gallery
                                        </div>
                                    </Link>


                                    <Link to={"/news"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            News & Events
                                        </div>
                                    </Link>


                                    <Link to={"/terms-conditions"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>

                                        <div className='ms-2 text-[14px]'>
                                            Terms & Conditions
                                        </div>
                                    </Link>


                                    <Link to={"/privacy-policy"} className='flex items-center py-3 border-b-[1px] border-[var(--primary-color--)]'>
                                        <div className='ms-2 text-[14px]'>
                                            Privacy Policy
                                        </div>
                                    </Link>
                                </section>

                            </section>

                        </section>
                        <Toaster />
                    </section >
            }
        </>
    )
}
