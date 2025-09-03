import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { Loader } from '../../../../../common/Loader'


export function DashAddGoalsParagraph() {
    let [loader, setloader] = useState(false)
    let formik = useFormik({
        initialValues: {
            Home_Card_Content_Id: "",
            Home_Card_Content_Heading: "",
            Home_Card_Content_Paragraph: "",
        },

        validationSchema: Yup.object().shape({
            Home_Card_Content_Id: Yup.string().required("Card selection is required"),
            Home_Card_Content_Heading: Yup.string().required("Paragraph heading is required"),
            Home_Card_Content_Paragraph: Yup.string().required("Paragraph is required")
        }),


        onSubmit: (value, { resetForm }) => {
            insertdata(formik.values)
            setloader(true)
            resetForm({
                Home_Card_Content_Id: "",
                Home_Card_Content_Heading: "",
                Home_Card_Content_Paragraph: ""
            })
        }
    })

    let notificationsuccess = (success) => toast.success(success)
    let notificationerror = (error) => toast.error(error)

    let insertdata = (value) => {
        try {
            apiurl.post('/admin/add-goals-card-paragraph', toFormData(value), {
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


    let [homegoalscarddata, sethomegoalscarddata] = useState([])
    let [homecardheadingdata, sethomecardheadingdata] = useState([])
    let [filterhomecardheadingdata, setfilterhomecardheadingdata] = useState([])

    let fetchall = async () => {
        try {
            let [homecarddata, homegoalscardheadingdata] = await Promise.all([
                apiurl.get('/admin/view-goals-card'),
                apiurl.get('/admin/view-goals-paragraph-heading')
            ])

            return {
                homecardheading: homecarddata.data.viewdata,
                homegoalscardheading: homegoalscardheadingdata.data.viewdata
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    let viewdata = () => {
        try {
            fetchall()
                .then((res) => {
                    sethomegoalscarddata(res.homecardheading)
                    sethomecardheadingdata(res.homegoalscardheading)
                    setfilterhomecardheadingdata(res.homegoalscardheading)
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


    let filterheading = (values) => {
        if (filterhomecardheadingdata.length !== 0 || homecardheadingdata.length !== 0) {
            sethomecardheadingdata(filterhomecardheadingdata.filter((e) => e.Home_Card_Id.includes(values)))
        }
        else {
            sethomecardheadingdata([
                {
                    Home_Card_Paragraph_Heading: "No Data Found"
                }
            ])
        }
    }
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'> Home Add Card Goals Paragraph</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="choosecard">
                                            Choose Card
                                        </label>

                                        <select id='choosecard' className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Id', e.target.value) && filterheading(e.target.value)} >
                                            <option>Choose Option</option>
                                            {
                                                homegoalscarddata.length === 0 ?
                                                    null :
                                                    homegoalscarddata.map((items, index) => {
                                                        return (
                                                            <option key={index} value={items._id}>{items.Home_Goals_Heading}</option>
                                                        )
                                                    })
                                            }
                                        </select>
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Card_Content_Id}
                                        </div>
                                    </div>


                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="contentheading">
                                            Content  Heading
                                        </label>

                                        <select id='contentheading' className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Heading', e.target.value)} >
                                            <option>Choose Option</option>
                                            {
                                                homecardheadingdata.length === 0 ?
                                                    <option value="">No Data Found</option> :
                                                    <>
                                                        <option value="">Choose Option</option>
                                                        {
                                                            homecardheadingdata.map((items, index) => {
                                                                return (
                                                                    <option key={index} value={items._id}>{items.Home_Card_Paragraph_Heading}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </select>
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Card_Content_Heading}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="contentparagraph">
                                            Card Paragraph
                                        </label>

                                        <input id='contentparagraph' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Card_Content_Paragraph', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Card_Content_Paragraph}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-paragraph-heading"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
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
