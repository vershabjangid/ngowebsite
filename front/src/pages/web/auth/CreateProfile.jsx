import React, { useState } from 'react'
import { Logo } from '../../../common/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { MdOutlineUploadFile } from 'react-icons/md'
import { toFormData } from 'axios'
import { apiurl, getCookie } from '../../../apiurl/Apiurl'
import { Loader } from '../../../common/Loader'


export function CreateProfile() {
    let labelname = ["FULL NAME", "FATHER NAME", "OCCUPATION", "DATE OF BIRTH", "ADDRESS", "AADHAR.NO", "UPLOAD AADHAR", "CITY", "SELECT DESIGNATION", "PROFILE PICTURE"]
    let [placeholder, setplaceholder] = useState(["FULL NAME", "FATHER NAME", "OCCUPATION", "DATE OF BIRTH", "ADDRESS", "AADHAR.NO", "............UPLOAD AADHAR", "CITY", "SELECT DESIGNATION", "............UPLOAD PROFILE PICTURE"])
    let inputname = ["Full_Name", "Father_Name", "Occupation", "Date_Of_Birth", "Address", "Aadhar_NO", "Upload_Aadhar", "City", "Select_Designation", "Profile_Picture"]
    let inputtype = ["text", "text", "text", "date", "text", "number", "file", "text", "select", "file"]
    let location = useLocation();
    let data = location.state
    let [loader, setloader] = useState(false)
    let [eye, seteye] = useState(false)
    let formik = useFormik({
        initialValues: {
            Email: data,
            Full_Name: "",
            Father_Name: "",
            Occupation: "",
            Date_Of_Birth: "",
            Address: "",
            Aadhar_NO: "",
            Upload_Aadhar: "",
            City: "",
            Select_Designation: "",
            Profile_Picture: "",
            Shapath: ""
        },
        validationSchema: Yup.object().shape({
            Full_Name: Yup.string().required("Full Name is required"),
            Father_Name: Yup.string().required("Father Name is required"),
            Occupation: Yup.string().required("Occupation is required"),
            Date_Of_Birth: Yup.date("Invalid Date").required("Date of birth is required"),
            Address: Yup.string().required("Address is required"),
            Aadhar_NO: Yup.number().min(100000000000, "Invalid Aadhar Number").max(999999999999, "Invalid Number").required("Aadhar no is required"),
            Upload_Aadhar: Yup.mixed().test(
                'fileFormat',
                'Only png, jpg, jpeg is required',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')
            ).required("Aadhar card is required"),
            City: Yup.string().required("City is required"),
            Select_Designation: Yup.string().required("Designation is required"),
            Profile_Picture: Yup.mixed().test(
                'fileFormat',
                'Only png, jpg, jpeg is required',
                value => value.type.includes('png') || value.type.includes('jpg') || value.type.includes('jpeg')
            ).required("Profile Picture is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            setloader(true)
            insertdata(formik.values)
            resetForm({
                Full_Name: "",
                Father_Name: "",
                Occupation: "",
                Date_Of_Birth: "",
                Address: "",
                Aadhar_NO: "",
                Upload_Aadhar: "",
                City: "",
                Select_Designation: "",
                Profile_Picture: "",
                Shapath: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)
    let navigate = useNavigate();

    let insertdata = (value) => {
        try {
            apiurl.post('/user/create-profile', toFormData(value), {
                headers: {
                    Authorization: getCookie('registertoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        navigate(`/sign-in`)
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

    let handlechange = (e, index) => {
        let newarray = [...placeholder]
        newarray[index] = e.target.value
        setplaceholder(newarray)
    }

    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='create_profile_main w-[100%] h-[100vh] flex p-2'>
                        <section className='login_profile_banner w-[50%] h-[100%] bg-white rounded-[10px]'>
                        </section>

                        <section className='login_right w-[50%] h-[100%] bg-white flex justify-center items-center flex-col overflow-y-scroll pb-4'>
                            <div className='w-[80%] h-[100%]'>
                                <div className='w-[100%]'>
                                    <section className='w-[200px] mb-4  m-auto'>
                                        <Logo />
                                    </section>
                                    <section className='register_right_heading_section'>
                                        <h1 className='text-[30px] font-[700] text-center text-[var(--primary-color--)]'>Create Profile</h1>
                                        <p className='register_subheading text-center mt-2 text-[17px] font-[600]'>Please enter your required details to create profile</p>
                                    </section>

                                    <section className='register_form mt-5 flex justify-center'>
                                        <div className=' w-[100%] flex items-center justify-center flex-col'>
                                            <form onSubmit={formik.handleSubmit} className=' w-[100%] flex items-center flex-col'>
                                                {
                                                    inputname.map((items, index) => {

                                                        return (
                                                            <div key={index} className='register_form_section w-[100%] mt-[15px]'>
                                                                <label htmlFor={`input${index}`} className='text-[15px] font-[600] text-[var(--primary-color--)]'>{labelname[index]}</label>
                                                                {
                                                                    inputtype[index] === "password" ?
                                                                        <section className='relative'>
                                                                            <input id={`input${index}`} autoCorrect='true' type={eye ? "text" : inputtype[index]} autoComplete="true" className='w-[100%] border-[1px] mt-1 border-[black] outline-[var(--primary-color--)] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                            <div className='absolute top-[50%] text-[20px] translate-y-[-50%] right-[20px]'>
                                                                                {
                                                                                    eye ? <FaEyeSlash onClick={() => seteye(false)} className=' cursor-pointer text-[var(--primary-color--)]' />
                                                                                        :
                                                                                        <FaEye onClick={() => seteye(true)} className=' cursor-pointer' />
                                                                                }
                                                                            </div>
                                                                        </section>
                                                                        :
                                                                        inputtype[index] === "file" ?
                                                                            <section className='h-[150px] relative '>
                                                                                <section className=' absolute w-[100%] h-[100%] border-dashed border-[1.8px] border-[var(--primary-color--)] rounded-[10px] z-99 flex justify-center items-center'>
                                                                                    <div className='flex justify-center items-center flex-col'>
                                                                                        <MdOutlineUploadFile className='text-[30px]' />
                                                                                        <p className='font-[600] mt-[5px] '>{placeholder[index].slice(12)}....</p>
                                                                                    </div>
                                                                                </section>
                                                                                <section className='w-[100%] h-[100%] absolute z-[999] opacity-0'>
                                                                                    <input id={`input${index}`} type={inputtype[index]} className='w-[100%] h-[100%] p-3  text-[14px] outline-[var(--primary-color--)]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.files[0]) && handlechange(e, index)} />
                                                                                </section>
                                                                            </section> :
                                                                            inputtype[index] === "select" ?
                                                                                <select id={`input${index}`} className='w-[100%] border-[1px] mt-1 border-[black] outline-[var(--primary-color--)] p-3 rounded-[10px] text-[14px]' onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)}>
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
                                                                                :
                                                                                <input id={`input${index}`} type={inputtype[index]} className='w-[100%] border-[1px] mt-1 border-[black] outline-[var(--primary-color--)] p-3 rounded-[10px] text-[14px]' placeholder={placeholder[index]} onChange={(e) => formik.setFieldValue(inputname[index], e.target.value)} />
                                                                }
                                                                <div className='text-[red] mt-[5px]'>
                                                                    {
                                                                        inputname[index] === "Full_Name" ?
                                                                            formik.errors.Full_Name :
                                                                            inputname[index] === "Father_Name" ?
                                                                                formik.errors.Father_Name :
                                                                                inputname[index] === "Occupation" ?
                                                                                    formik.errors.Occupation :
                                                                                    inputname[index] === "Date_Of_Birth" ?
                                                                                        formik.errors.Date_Of_Birth :
                                                                                        inputname[index] === "Address" ?
                                                                                            formik.errors.Address :
                                                                                            inputname[index] === "Aadhar_NO" ?
                                                                                                formik.errors.Aadhar_NO :
                                                                                                inputname[index] === "Upload_Aadhar" ?
                                                                                                    formik.errors.Upload_Aadhar :
                                                                                                    inputname[index] === "City" ?
                                                                                                        formik.errors.City :
                                                                                                        inputname[index] === "Select_Designation" ?
                                                                                                            formik.errors.Select_Designation :
                                                                                                            inputname[index] === "Profile_Picture" ?
                                                                                                                formik.errors.Profile_Picture :
                                                                                                                null
                                                                    }

                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className='flex items-start mt-2'>
                                                    <input type="checkbox" className='me-2' onChange={(e) => formik.setFieldValue('Shapath', e.target.checked)} required />
                                                    <p className='font-[600]'>
                                                        मैं, शपथ लेता/लेती हूं कि मैं बिना किसी भेदभाव के, मानव अधिकारों के संरक्षण और संवर्धन के लिए हमेशा कार्य करूंगा/करूंगी। मैं यह सुनिश्चित करूंगा/करूंगी कि मेरे शब्दों, कर्मों या कृत्यों से किसी के मानव अधिकारों का उल्लंघन न हो। मैं मानवाधिकार संरक्षण संगठन (HRD) के उद्देश्यों को बढ़ाने, संगठन के विकास में सहयोग करने और सदस्यता की जिम्मेदारी निभाने का वचन देता/देती हूं। मैं संगठन के किसी भी गैर-कानूनी या विरोधी गतिविधि में भाग नहीं लूंगा/लूंगी।</p>
                                                </div>
                                                <div className='mt-[15px] w-[100%]'>
                                                    <button type='submit' className=' w-[100%] p-1 py-2 mt-1 mb-[10px] rounded-[10px] text-white bg-[var(--primary-color--)] font-[600]'>
                                                        Create Profile
                                                    </button>
                                                </div>

                                            </form>

                                        </div>
                                    </section>

                                </div>

                            </div>
                        </section>
                        <Toaster />
                    </section>
            }
        </>
    )
}
