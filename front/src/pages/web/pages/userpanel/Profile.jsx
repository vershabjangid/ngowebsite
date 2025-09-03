import React, { useContext, useState } from 'react'
import { Header } from '../../../../common/Header'
import { Sidebar } from '../../../../common/Sidebar'
import { apiurl, getCookie } from '../../../../apiurl/Apiurl'
import { CgProfile } from 'react-icons/cg'
import { UserContext } from '../Context/UserDataContext'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { toFormData } from 'axios'
import { FaEdit } from 'react-icons/fa'
import { FaPen, FaXmark } from 'react-icons/fa6'
import Profilepicture from '../../../../images/Gemini_Generated_Image_3qpdbz3qpdbz3qpd 2.png'
import fatherchild from '../../../../images/fi_users.svg'
import truck from '../../../../images/u_truck-loading.svg'
import gift from '../../../../images/fi_gift.svg'
import location from '../../../../images/u_location-point.svg'
import envelop from '../../../../images/u_envelope.svg'
import phone from '../../../../images/u_phone.svg'
import { Loader } from '../../../../common/Loader'
import profileimage from '../../../../images/profile.png'
export function Profile() {
    let { user } = useContext(UserContext)
    let [update, setupdate] = useState(true)
    const [image, setImage] = useState(null);
    let [loader, setloader] = useState(false)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // create a temporary preview URL
        }
    };


    let formik = useFormik({
        initialValues: {
            Sub_Id: user[0] === undefined ? "" : user[0].Sub_Id,
            Email: user[1] === undefined ? "" : user[1].Email || "",
            Full_Name: user[0] === undefined ? "" : user[0].Full_Name || "",
            Father_Name: user[0] === undefined ? "" : user[0].Father_Name || "",
            Occupation: user[0] === undefined ? "" : user[0].Occupation || "",
            Date_Of_Birth: user[0] === undefined ? "" : user[0].Date_Of_Birth || "",
            Address: user[0] === undefined ? "" : user[0].Address || "",
            City: user[0] === undefined ? "" : user[0].City || "",
            Select_Designation: user[0] === undefined ? "" : user[0].Select_Designation || "",
            Profile_Picture: user[0] === undefined ? "" : user[0].Profile_Picture || ""
        },
        onSubmit: (value, { resetForm }) => {
            updatedata(formik.values)
            setloader(true)
            resetForm({
                Email: user[1] === undefined ? "" : user[1].Email || "",
                Full_Name: user[0] === undefined ? "" : user[0].Full_Name || "",
                Father_Name: user[0] === undefined ? "" : user[0].Father_Name || "",
                Occupation: user[0] === undefined ? "" : user[0].Occupation || "",
                Date_Of_Birth: user[0] === undefined ? "" : user[0].Date_Of_Birth || "",
                Address: user[0] === undefined ? "" : user[0].Address || "",
                City: user[0] === undefined ? "" : user[0].City || "",
                Select_Designation: user[0] === undefined ? "" : user[0].Select_Designation || "",
                Profile_Picture: user[0] === undefined ? "" : user[0].Profile_Picture || ""
            })
        }
    })

    let navigate = useNavigate()

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let updatedata = (value) => {
        try {
            apiurl.put('/user/update-profile-data', toFormData(value), {
                headers: {
                    Authorization: getCookie('logintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        navigate(0)
                        notificationsuccess(res.data.Message)
                        setupdate(true)
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
                    <section className='w-[100%] h-[100vh] bg-[#f3f1f1]'>
                        <Header />
                        <section className='flex h-[calc(100%-90px)] border-t-[1px]'>
                            <Sidebar />
                            <section className='useradmin_content_section w-[100%]  p-5 text-[30px] overflow-y-scroll'>
                                <section className=' w-[100%] px-3'>
                                    <div className='text-[25px] flex items-center'>
                                        <CgProfile />
                                        <h1 className='font-[600] ms-2'>
                                            Profile
                                        </h1>
                                    </div>
                                    <div className='font-[500] text-[15px]'>
                                        <p className='text-[#1385ff]'>Here you can see your profile</p>
                                    </div>
                                </section>



                                {
                                    update ? <section className='w-[100%] px-2 mt-[20px] flex justify-between'>
                                        <section className='w-[100%]'>
                                            <section className=' w-[100%] m-auto '>
                                                <section className='w-[100%] h-[270px] border-[2px] border-[black]  mb-4 bg-[white] rounded-[20px] relative'>
                                                    <section className='absolute z-[9999] right-[15px] top-[15px] text-[20px] ' onClick={() => setupdate(false)}>
                                                        <FaEdit />
                                                    </section>
                                                    <section className='w-[100%] h-[50%]  rounded-t-[20px] profile_banner relative'>
                                                        <section className='w-[100px] h-[100px] rounded-[50%] absolute bottom-[-34%] ms-5 bg-[black] border-[3px] border-[white] overflow-hidden'>
                                                            <img src={user[0] === undefined || user[0].Profile_Picture === undefined ? Profilepicture : user[2] + user[0].Profile_Picture} alt="" className='h-[100%] w-[100%] rounded-[50%]' />
                                                        </section>
                                                    </section>
                                                    <section className='w-[100%] h-[50%]  '>
                                                        <p className='mt-[60px] ms-3  font-[700] text-[15px] uppercase'>
                                                            {user[0] === undefined || user[0].User_ID === undefined ? "No Data Found" : user[0].User_ID}
                                                        </p>
                                                        <p className='mt-[2px] ms-3 font-[700] text-[14px] uppercase'>
                                                            {user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found" : user[0].Full_Name}
                                                        </p>
                                                        <p className='mt-[2px] ms-3 font-[600] text-[grey] text-[14px] uppercase'>
                                                            {user[0] === undefined || user[0].Occupation === undefined ? "No Data Found" : user[0].Occupation}
                                                        </p>
                                                    </section>
                                                </section>



                                                <section className='w-[100%] border-[2px] border-[black] relative rounded-[20px] bg-[white] mb-4 p-3 py-5'>
                                                    <section className=' absolute top-[15px] text-[20px] right-[15px] z-[9999] cursor-pointer' onClick={() => setupdate(false)}>
                                                        <FaEdit />
                                                    </section>
                                                    <section className='w-[100%]'>
                                                        <p className='font-[700] uppercase text-[23px]'>
                                                            personal information
                                                        </p>
                                                    </section>


                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>
                                                        <section className='pe-3 pb-1'>
                                                            <img src={truck} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    DESIGNATION
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B] '>
                                                                    {user[0] === undefined || user[0].Select_Designation === undefined ? "No Data Found" : user[0].Select_Designation}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>


                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>

                                                        <section className='pe-3 pb-1'>
                                                            <img src={fatherchild} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    FATHER’S NAME
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B]'>
                                                                    {user[0] === undefined || user[0].Father_Name === undefined ? "No Data Found" : user[0].Father_Name}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>




                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>
                                                        <section className='pe-3 pb-1'>
                                                            <img src={gift} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    DATE OF BIRTH
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B] '>
                                                                    {user[0] === undefined || user[0].Date_Of_Birth === undefined ? "No Data Found" : user[0].Date_Of_Birth}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>



                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>
                                                        <section className='pe-3 pb-1'>
                                                            <img src={location} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    ADDRESS AND CITY
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B] '>
                                                                    {user[0] === undefined || user[0].Address === undefined || user[0].City === undefined ? "No Data Found" : `${user[0].Address} , ${user[0].City}`}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>
                                                </section>


                                                <section className='w-[100%] border-[2px] border-[black]  rounded-[20px] bg-[white] mb-4 p-3 py-5 relative'>
                                                    <section className=' absolute top-[15px] text-[20px] right-[15px] z-[9999] cursor-pointer' onClick={() => setupdate(false)}>
                                                        <FaEdit />
                                                    </section>
                                                    <section className='w-[100%]'>
                                                        <p className='font-[700] uppercase text-[23px]'>
                                                            contact information
                                                        </p>
                                                    </section>


                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>
                                                        <section className='pe-3 pb-1'>
                                                            <img src={envelop} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    EMAIL ADDRESS
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B]'>
                                                                    {user[1] === undefined || user[1].Email === undefined ? "No Data Found" : user[1].Email}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>





                                                    <section className='w-[100%] flex items-start mt-3 ms-2'>
                                                        <section className='pe-3 pb-1'>
                                                            <img src={phone} alt="" />
                                                        </section>
                                                        <section className='flex items-start flex-col'>
                                                            <section>
                                                                <p className='font-[700] uppercase text-[15px]'>
                                                                    PHONE NUMBER
                                                                </p>
                                                            </section>

                                                            <section>
                                                                <p className='font-[700] uppercase text-[13px] text-[#7B7B7B] '>
                                                                    {user[1] === undefined || user[1].Phone === undefined ? "No Data Found" : user[1].Phone}
                                                                </p>
                                                            </section>
                                                        </section>
                                                    </section>
                                                </section>
                                            </section>



                                        </section>


                                    </section>




                                        :

                                        <section className='w-[100%] px-2 mt-[20px] flex justify-between text-[15px]'>
                                            <section className='w-[100%]'>
                                                <form className=' w-[100%] m-auto' onSubmit={formik.handleSubmit}>
                                                    <section className='w-[100%] h-[335px] border-[2px] border-[black]  rounded-[20px] bg-[WHITE] relative mb-4  flex justify-between overflow-hidden'>
                                                        <section className=' absolute top-[15px] text-[20px] right-[15px] z-[9999] cursor-pointer' onClick={() => setupdate(true)}>
                                                            <FaXmark />
                                                        </section>
                                                        <section className='profile_banner w-[100%] h-[100px] absolute bg-black'>
                                                            <section className='w-[100px] h-[100px]  border-[4px] border-[white] rounded-[50%] absolute left-[25px] bottom-[-45%] bg-[white] z-50'>
                                                                <section className='w-[100%] h-[100%] rounded-[50%] absolute bg-[white] z-50 overflow-hidden'>
                                                                    <img src={image !== null && user[0] !== undefined && user[0].Profile_Picture !== undefined ? user[2] + user[0].Profile_Picture : profileimage} alt="" className='w-[100%] h-[100%]' />
                                                                </section>
                                                                <section className='w-[30px] h-[30px] bg-[white] border-[1px] border-[black] absolute top-[70%] rounded-[50%] right-[5px] z-[9999] flex items-center justify-center cursor-pointer'>
                                                                    <section className='w-[100%] h-[100%] bg-[white] rounded-[50%] flex items-center justify-center cursor-pointer'>
                                                                        <FaPen />
                                                                    </section>
                                                                    <section className=' absolute opacity-0 cursor-pointer'>
                                                                        <input id="profilepicture" type="file" className='w-[100%] h-[100%] rounded-[50%]' onChange={(e) => formik.setFieldValue('Profile_Picture', e.target.files[0]) && handleImageChange(e)} />
                                                                    </section>
                                                                </section>
                                                            </section>
                                                        </section>
                                                        <section className='w-[100%] h-[235px] absolute bottom-0'>
                                                            <p className='mt-[49px] ms-3 font-[700] uppercase'>
                                                                {user[0] === undefined ? "No Data Found" : user[0].User_ID}
                                                            </p>
                                                            <div className='mt-[10px] mx-3 font-[700] uppercase'>
                                                                <label htmlFor='name' className='w-[100%]'>Name</label>
                                                                <input id="name" autoComplete='true' type="text" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found" : user[0].Full_Name} onChange={(e) => formik.setFieldValue('Full_Name', e.target.value)} />
                                                            </div>


                                                            <div className='mt-[10px] mx-3 font-[700] uppercase'>
                                                                <label htmlFor='occupation' className='w-[100%]'>OCCUPATION</label>
                                                                <input id="occupation" autoComplete='true' type="text" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].Occupation === undefined ? "No Data Found" : user[0].Occupation} onChange={(e) => formik.setFieldValue('Occupation', e.target.value)} />
                                                            </div>

                                                        </section>
                                                    </section>


                                                    <section className='w-[100%] border-[2px] border-[black] relative rounded-[20px] bg-[white] mb-4 p-3 py-5'>
                                                        <section className='w-[100%]'>
                                                            <p className='font-[700] uppercase text-[23px]'>
                                                                personal information
                                                            </p>
                                                        </section>

                                                        <div className='mt-[10px] font-[700] uppercase'>
                                                            <label htmlFor="designation" className='w-[100%]'>DESIGNATION</label>
                                                            <select id='designation' className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined ? "No Data Found" : user[0].Select_Designation} onChange={(e) => formik.setFieldValue('Select_Designation', e.target.value)} >
                                                                <option>Select Designation</option>
                                                                <option value="Director">Director</option>
                                                                <option value="Secretory">Secretory</option>
                                                                <option value="President">President</option>
                                                                <option value="Vice-President">Vice-President</option>
                                                                <option value="Treasurer">Treasurer</option>
                                                                <option value="Member">Member</option>
                                                                <option value="Volunteer">Volunteer</option>
                                                                <option value="Social Worker">Social Worker</option>
                                                            </select>
                                                        </div>



                                                        <div className='mt-[15px] font-[700] uppercase'>
                                                            <label htmlFor="fathername" className='w-[100%]'>FATHER’S NAME</label>
                                                            <input id="fathername" autoComplete='true' type="text" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].Select_Designation === undefined ? "No Data Found" : user[0].Father_Name} onChange={(e) => formik.setFieldValue('Father_Name', e.target.value)} />
                                                        </div>


                                                        <div className='mt-[15px] font-[700] uppercase'>
                                                            <label htmlFor="dateofbirth" className='w-[100%]'>DATE OF BIRTH</label>
                                                            <input id="dateofbirth" type="date" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].Date_Of_Birth === undefined ? "9999-99-09" : user[0].Date_Of_Birth} onChange={(e) => formik.setFieldValue('Date_Of_Birth', e.target.value)} />
                                                        </div>



                                                        <div className='mt-[15px] font-[700] uppercase'>
                                                            <label htmlFor="Address" className='w-[100%]'>Address</label>
                                                            <input id="Address" autoComplete='true' type="text" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].Address === undefined ? "No Data Found" : user[0].Address} onChange={(e) => formik.setFieldValue('Address', e.target.value)} />
                                                        </div>


                                                        <div className='mt-[15px] font-[700] uppercase'>
                                                            <label htmlFor='city' className='w-[100%]'>CITY</label>
                                                            <input id='city' autoComplete='true' type="text" className=' uppercase w-[100%] p-2 border-[1px] border-[black] rounded-[10px]' defaultValue={user[0] === undefined || user[0].City === undefined ? "No Data Found" : user[0].City} onChange={(e) => formik.setFieldValue('City', e.target.value)} />
                                                        </div>

                                                        <div className='mt-[15px] text-[13px] font-[700] uppercase'>
                                                            <button type="submit" className=' uppercase w-[150px] p-2 border-[1px] border-[black] bg-[black] text-[white] rounded-[10px]'>UPDATE PROFILE</button>
                                                        </div>
                                                    </section>

                                                </form>



                                            </section>


                                        </section>
                                }

                            </section>
                        </section>
                    </section>
            }
        </>
    )
}
