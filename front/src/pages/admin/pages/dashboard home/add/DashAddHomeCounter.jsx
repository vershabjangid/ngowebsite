import Link from 'daisyui/components/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export function DashAddHomeCounter() {
    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <section className='w-[100%] py-[15px] rounded-[20px] my-[20px] bg-[white] px-3'>
                        <p className='font-[600] text-[grey]'> Home Banner Slides</p>
                        <p className='my-[20px] text-[15px]'>Add home banner slides that will appear at the top of the homepage banner section. These slides are ideal for highlighting featured content, promotions, or important announcements.</p>

                        <section className='w-[100%] '>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="counterheading">
                                            Counter Heading
                                        </label>

                                        <input maxLength={100} id='counterheading' autoComplete='true' type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Heading', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Heading}
                                        </div>
                                    </div>

                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homebannerdescription">
                                            Home Banner Description
                                        </label>
                                        <input id='homebannerdescription' autoComplete='true' maxLength={300} type="text" className='w-[100%] p-[10px] border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Description', e.target.value)} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Description}
                                        </div>
                                    </div>
                                </div>


                                <div className='w-[100%] flex justify-between my-[10px]'>
                                    <div className='w-[48%]'>
                                        <label className='font-[600]' htmlFor="homeimage">
                                            Home Banner Image
                                        </label>

                                        <input id='homeimage' type="file" autoComplete='true' className='w-[100%] p-2 border-[1px] border-[grey] text-[grey] mt-1 rounded-[25px]' onChange={(e) => formik.setFieldValue('Home_Banner_Image', e.target.files[0])} />
                                        <div className='text-[#ff6780]'>
                                            {formik.errors.Home_Banner_Image}
                                        </div>
                                    </div>
                                </div>

                                <div className='w-[100%] flex justify-between mt-[20px]'>
                                    <button type='submit' className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        Submit
                                    </button>

                                    <Link to={"/view-home-counters"} className='bg-[#1385ff] px-[20px] py-[10px] rounded-[30px] text-[white]'>
                                        View All
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
