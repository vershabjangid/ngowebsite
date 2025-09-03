import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '../../../../../common/AdminSidebar'
import { AdminHeader } from '../../../../../common/AdminHeader'
import toast, { Toaster } from 'react-hot-toast'
import { apiurl, getCookie } from '../../../../../apiurl/Apiurl'
import { toFormData } from 'axios'
import { useFormik } from 'formik'
import { LuClipboardList } from 'react-icons/lu'
import { Loader } from '../../../../../common/Loader'


export function DashViewTermsParagraphSection() {
    let [imgurl, setimgurl] = useState([])
    let [aboutdata, setaboutdata] = useState([])
    let [loader, setloader] = useState(false)

    let viewdata = () => {
        try {
            apiurl.get('/admin/view-terms-paragraph-section')
                .then((res) => {
                    setaboutdata(res.data.viewdata)
                    setimgurl(res.data.imgurl)
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

    // /update-terms-banner

    let [updatemodal, setupdatemodal] = useState(false)
    let [updatemodaldata, setupdatemodaldata] = useState(null)

    let formik = useFormik({
        initialValues: {
            _id: "",
            Terms_Heading: "",
            Terms_Description: "",
            Terms_Image: "",

        },
        onSubmit: (value, { resetForm }) => {
            formik.values._id = updatemodaldata._id
            updatedata(formik.values)
            setloader(true)
            resetForm({
                _id: "",
                Terms_Heading: "",
                Terms_Description: "",
                Terms_Image: "",
            })
        }
    })


    let notificationerror = (error) => toast.error(error)
    let notificationsuccess = (success) => toast.success(success)

    let updatedata = (value) => {
        try {
            apiurl.put('/admin/update-terms-paragraph-section', toFormData(value), {
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setupdatemodal(false)
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


    let [deletemodal, setdeletemodal] = useState(false)
    let [deletemodaldata, setdeletemodaldata] = useState([])


    let deletedata = (value) => {
        setloader(true)
        try {
            apiurl.delete('/admin/delete-terms-paragraph-section', {
                data: value,
                headers: {
                    Authorization: getCookie('admintoken')
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        notificationsuccess(res.data.Message)
                        viewdata()
                    }
                    else {
                        notificationerror(res.data.Message)
                    }
                    setdeletemodal(false)
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
                    <>
                        {
                            updatemodal ?
                                <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                                    <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                                        <div className=' border-b-[1px] border-[black] pb-1'>
                                            <h3 className='text-[25px] font-[600]'>Update Terms Paragraph</h3>
                                        </div>
                                        <div>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="termsbannerheading">
                                                            Terms Paragraph Heading
                                                        </label>

                                                        <input autoComplete='true' id='termsbannerheading' maxLength={100} defaultValue={updatemodaldata.Terms_Heading} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Heading', e.target.value)} />
                                                    </div>

                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="termsbannerdescription">
                                                            Terms Paragraph Description
                                                        </label>
                                                        <input autoComplete='true' id='termsbannerdescription' maxLength={300} defaultValue={updatemodaldata.Terms_Description} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Description', e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-between my-[10px]'>
                                                    <div className='w-[100%]'>
                                                        <label className='font-[600]' htmlFor="termsimage">
                                                            Terms Image
                                                        </label>

                                                        <input id='termsimage' type="file" className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Terms_Image', e.target.files[0])} />
                                                    </div>
                                                </div>

                                                <div className='w-[100%] flex justify-end mt-[20px]'>
                                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                                        Submit
                                                    </button>

                                                    <div className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setupdatemodal(false)}>
                                                        Cancel
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }


                        {
                            deletemodal ?
                                <section className='w-[100%] h-[100vh] fixed bg-[#00000064] z-[9999] flex justify-center items-center'>
                                    <section className='w-[450px] p-2 bg-[white] rounded-[20px] border-[1px]'>
                                        <div className=' border-b-[1px] border-[black] pb-1'>
                                            <h3 className='text-[25px] font-[600]'>Delete Slide</h3>
                                        </div>
                                        <div className='py-4'>
                                            <p>Are you sure to delete a slide?</p>
                                        </div>
                                        <div>
                                            <div className='w-[100%] flex justify-end mt-[20px]'>
                                                <button type='submit' className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => deletedata(deletemodaldata)}>
                                                    Delete
                                                </button>

                                                <button className='bg-[grey] px-[20px] ms-2 py-[10px] rounded-[30px] text-[#ffffff]' onClick={() => setdeletemodal(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                                :
                                null
                        }

                        <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                            <AdminSidebar />
                            <section className='w-[100%] h-[100%]'>
                                <AdminHeader />

                                <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                                    <section className='w-[100%] px-3'>
                                        <div className='text-[25px] flex items-center'>
                                            <LuClipboardList />
                                            <h1 className='font-[600] ms-2'>
                                                Terms & Conditions
                                            </h1>
                                        </div>
                                        <div className='font-[500] text-[15px]'>
                                            <p>Dashboard / <span className='text-[#000000]'>Terms & Conditions</span> / <span className='text-[#1385ff]'> Terms Paragraph Section</span></p>
                                        </div>
                                    </section>

                                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                                        <p className='font-[600] text-[grey] mb-[20px]'> Terms  Paragraph Section</p>

                                        {
                                            aboutdata.length === 0 ?
                                                <div className='text-center font-[600] text-[grey]'>
                                                    No Data Found
                                                </div>

                                                :
                                                aboutdata.map((items, index) => {
                                                    return (
                                                        <section className='mb-[50px]' key={index}>
                                                            {
                                                                items.Terms_Image !== undefined && items.Terms_Image !== null ?
                                                                    <section className=''>
                                                                        <section key={index} className='home_Terms_us w-[100%] py-[20px] px-[20px] flex'>
                                                                            <section className='w-[30%] flex justify-center items-center'>
                                                                                <section className='w-[300px]'>
                                                                                    <img src={imgurl + items.Terms_Image} alt="" className='w-[100%]' />
                                                                                </section>
                                                                            </section>
                                                                            <section className='w-[70%] uppercase'>
                                                                                <h2 className='home_heading text-[30px] font-[700]'>
                                                                                    {items.Terms_Heading}
                                                                                </h2>
                                                                                <p className='text-justify my-[10px] mb-[20px] leading-[25px]'>
                                                                                    {items.Terms_Description}
                                                                                </p>
                                                                            </section>
                                                                        </section>


                                                                        <div>
                                                                            <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)}>
                                                                                Update
                                                                            </button>

                                                                            <button className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white] ms-2' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)}>
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </section> :
                                                                    <section className='w-[100%]'>
                                                                        <section key={index} className='home_Terms_us w-[100%] py-[20px] px-[20px] flex'>
                                                                            <section className='w-[100%] uppercase'>
                                                                                <h2 className='home_heading text-[30px] font-[700]'>
                                                                                    {items.Terms_Heading}
                                                                                </h2>
                                                                                <p className='text-justify my-[10px] mb-[20px] leading-[25px]'>
                                                                                    {items.Terms_Description}
                                                                                </p>
                                                                            </section>
                                                                        </section>


                                                                        <div>
                                                                            <button className='bg-[#ff8913] px-[20px] py-[10px] rounded-[30px] text-[white]' onClick={() => setupdatemodal(true) || setupdatemodaldata(items)}>
                                                                                Update
                                                                            </button>

                                                                            <button className='bg-[#ff1313] px-[20px] py-[10px] rounded-[30px] text-[white] ms-2' onClick={() => setdeletemodal(true) || setdeletemodaldata(items)}>
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </section>
                                                            }

                                                        </section>
                                                    )
                                                })
                                        }
                                    </section>
                                </section>
                            </section>
                        </section>
                    </>
            }
            <Toaster />
        </>
    )
}
