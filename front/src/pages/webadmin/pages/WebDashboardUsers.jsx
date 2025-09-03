import React, { useEffect, useState } from 'react'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { FiUser } from 'react-icons/fi'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/Loader'

export function WebDashboardUsers() {
    let [data, setdata] = useState([])
    let [profiledata, setprofiledata] = useState([])
    let [imgurl, setimgurl] = useState([])
    let [loader, setloader] = useState(false)
    let viewdata = () => {
        try {
            apiurl.get('/admin/view-users', {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    setdata(res.data.viewprofile)
                    setprofiledata(res.data.viewdata)
                    setimgurl(res.data.imageurl)
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


    let navigate = useNavigate()

    let viewprofile = (value) => {
        navigate('/view-user-profile', { state: value })
    }
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                        <WebAdminSidebar />
                        <section className='w-[100%] h-[100%]'>
                            <WebAdminHeader />

                            <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                                <section className='w-[100%] px-3'>
                                    <div className='text-[25px] flex items-center'>
                                        <FiUser />
                                        <h1 className='font-[600] ms-2'>
                                            Users
                                        </h1>
                                    </div>
                                    <div className='font-[500] text-[15px]'>
                                        <p>Dashboard / <span className='text-[#1385ff]'>Users</span></p>
                                    </div>
                                </section>


                                <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                    {/* <p className='font-[600] text-[grey]'>View All Users</p> */}

                                    <section className='w-[100%] mt-[20px]'>
                                        <table className='w-[100%] text-center'>
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

                                                            profiledata.map((values, ind) => {
                                                                return (
                                                                    <tr key={ind}>
                                                                        {
                                                                            values.Sub_Id === items._id ?
                                                                                <>
                                                                                    <td>{values.Full_Name}</td>
                                                                                    <td>{items.Email}</td>
                                                                                    <td>{items.Phone}</td>
                                                                                    <td className='pt-[25px]'>
                                                                                        <button className='px-2 py-2 bg-[#1385ff] rounded-[10px] text-white font-[600]' onClick={() => viewprofile([items, values, imgurl])}>
                                                                                            View Profile
                                                                                        </button>
                                                                                    </td>
                                                                                </> :
                                                                                null
                                                                        }
                                                                    </tr>
                                                                )
                                                            })

                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section >
            }
        </>
    )
}
