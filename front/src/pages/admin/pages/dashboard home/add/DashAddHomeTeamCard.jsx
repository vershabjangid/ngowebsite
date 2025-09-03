import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'


export function DashAddHomeTeamCard() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_Team_Profile_Name: "",
            Home_Team_Profile_Designation: "",
            Home_Team_Profile_Description: "",
            Home_Team_Profile_Picture: ""
        },


        validationSchema: Yup.object().shape({
            Home_Team_Profile_Name: Yup.string().required("Full name is required"),
            Home_Team_Profile_Designation: Yup.string().required("Designation is required"),
            Home_Team_Profile_Description: Yup.string().required("Description is required"),
            Home_Team_Profile_Picture: Yup.mixed().test('fileFormat',
                'Only png, jpg, jpeg',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')).required("Profile picture is required")
        }),


        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Home_Team_Profile_Name: "",
                Home_Team_Profile_Designation: "",
                Home_Team_Profile_Description: "",
                Home_Team_Profile_Picture: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-home-team-card', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
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
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey] mt-[25px]'> Home Our Team Card Section</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="teammembername">
                                            Name
                                        </label>

                                        <input id='teammembername' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Profile_Name', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Team_Profile_Name}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="teammemberdesignation">
                                            Designation
                                        </label>

                                        <input id='teammemberdesignation' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Profile_Designation', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Team_Profile_Designation}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="teammemberdescription">
                                            Description
                                        </label>

                                        <input id='teammemberdescription' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Profile_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Team_Profile_Description}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="teammemberprofile">
                                            Profile Picture
                                        </label>

                                        <input id='teammemberprofile' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Team_Profile_Picture', e.target.files[0])} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Team_Profile_Picture}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-team-card"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View Data
                                    </Link>
                                </div>
                            </form>
                        </section>
                    </section>
            }
            <Toaster />
        </>
    )
}
