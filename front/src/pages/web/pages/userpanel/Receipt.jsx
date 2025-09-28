import React, { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Logo } from '../../../../common/Logo'
import DateFormat from '../../../../common/DateFormat'
import { UserContext } from '../Context/UserDataContext'
import { FaDownload, FaGlobe, FaPhone } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import { useReactToPrint } from 'react-to-print'
import QRCode from 'react-qr-code'
import { Signature } from '../../../../common/Signature'
const converter = require("number-to-words");
export function Receipt() {
    let { user } = useContext(UserContext)
    let location = useLocation()
    let data = location.state


    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <>
            <section className='w-[100%]  py-5 px-2'>
                <section className='w-[900px]   m-auto rounded-[10px] flex items-center justify-center relative'>
                    <section className='w-[50%] m-auto absolute opacity-[0.3] z-[-9]'>
                        <Logo />
                    </section>

                    <section className='w-[100%] rounded-t-[10px] px-3 py-2' ref={contentRef}>
                        <section className='border-[1px] rounded-[10px]  border-[black]'>
                            <section className='border-b-[1px]  border-[black] p-2 flex items-center justify-between'>
                                <section className='w-[120px]'>
                                    <Logo />
                                </section>


                                {
                                    user[0] === null || user[0] === undefined ?
                                        null :
                                        <section className='w-[95px] h-[95px]  ms-2 rounded-[5px] overflow-hidden flex items-center justify-center'>
                                            <QRCode
                                                value={`http://shriraghavleela.org/qr-donation-receipt/${user[0].Full_Name}/${user[0].Address}/${data.Receipt_No}/${data.Amount}/${data.Payment_Id}/${data.Status}/${data.CreatedOn}/${data.Bank_Name}/${data.Branch_Name}/${data.Pan_No}`}
                                                width={100}
                                                height={100}
                                                bgColor='white'
                                                fgColor='var(--primary-color--)'
                                            />
                                        </section>
                                }
                            </section>

                            <section className='w-[100%] flex justify-center py-2  border-b-[1px] border-[black] '>
                                <p className='bg-[var(--primary-color--)] px-2 py-2 rounded-[10px] font-[600] text-white'>USER DONATION RECEIPT</p>
                            </section>

                            <section className='w-[100%] flex justify-center py-2 px-3'>
                                <table className='w-[100%]  text-[14px] border-[2px] border-[black]'>
                                    <thead>
                                        <tr className='bg-[var(--primary-color--)] text-white border-[2px] border-[black]'>
                                            <th className='py-1 border-[2px] border-[black]'>Receipt No</th>
                                            <th className='py-1 border-[2px] border-[black]'>Amount</th>
                                            <th className='py-1 border-[2px] border-[black]'>Transaction ID</th>
                                            <th className='py-1 border-[2px] border-[black]'>Payment Status</th>
                                            <th className='py-1 border-[2px] border-[black]'>Date</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className='bg-[#ffffff] text-black text-center'>
                                            <td className='py-1 border-[2px] border-[black]'>{data === undefined || data.Receipt_No === null ? "No Data Found" : data.Receipt_No}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{data.Amount === undefined ? "No Data Found" : data.Amount.toLocaleString()}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{data.Payment_Id === undefined ? "No Data Found" : data.Payment_Id}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{data.Status === undefined ? "No Data Found" : data.Status}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{data.CreatedOn === undefined ? "No Data Found" : <DateFormat value={data.CreatedOn} />}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>


                            <section className='w-[100%] flex justify-center py-1 px-3'>
                                <table className='w-[100%] text-[14px] border-[1px] border-[black] flex'>
                                    <thead className='w-[250px]'>
                                        <tr className='w-[250px] bg-[var(--primary-color--)] text-white  flex flex-col  text-start'>
                                            <th className='p-2 border-[1px] border-[black] text-start'>Received From</th>
                                            <th className='p-2 border-[1px] border-[black]  text-start'>Rupees (in words)</th>
                                            <th className='p-2 border-[1px] border-[black]  text-start'>Address</th>

                                        </tr>
                                    </thead>

                                    <tbody className='w-[100%]'>
                                        <tr className='w-[100%] text-black text-start  flex flex-col'>
                                            <td className='p-2 border-[1px] border-[black]'>{user[0] === undefined || user[0].Full_Name === undefined ? "No Data Found" : user[0].Full_Name}</td>
                                            <td className='p-2 border-[1px] border-[black]'>{data.Amount === undefined ? "No Data Found" : converter.toWords(data.Amount)}</td>
                                            <td className='p-2 border-[1px] border-[black]'>{user[0] === undefined || user[0].Address === undefined ? "No Data Found" : user[0].Address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>



                            <section className='w-[100%] flex justify-center py-1 px-3'>
                                <table className='w-[100%] text-[14px] border-[2px] border-[black]'>
                                    <thead className='w-[250px]'>
                                        <tr className='w-[250px] bg-[var(--primary-color--)] text-white  text-start'>
                                            <th className='p-2 border-[2px] border-[black] text-start'>Bank Name</th>
                                            <th className='p-2 border-[2px] border-[black]  text-start'>Bank Branch</th>
                                            <th className='p-2 border-[2px] border-[black]  text-start'>Pancard No</th>

                                        </tr>
                                    </thead>

                                    <tbody className='w-[100%]'>
                                        <tr className='w-[100%] text-black text-start '>
                                            <td className='p-2 border-[2px] border-[black]'>{data === undefined || data.Bank_Name === undefined ? "No Data Found" : data.Bank_Name}</td>
                                            <td className='p-2 border-[2px] border-[black]'>{data === undefined || data.Branch_Name === undefined ? "No Data Found" : data.Branch_Name}</td>
                                            <td className='p-2 border-[2px] border-[black]'>{data === undefined || data.Pan_No === undefined ? "No Data Found" : data.Pan_No}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>


                            <section className='w-[100%] flex justify-between py-1 px-3 mt-[20px]'>
                                <section className='text-[20px] font-[700]'>
                                    <p>Thank You For Your Generous Contribution</p>
                                </section>


                                <section className=''>
                                    <section className='w-[100px] m-auto mb-2'>
                                        <Signature />
                                    </section>
                                    <section className='text-[12px] font-[500] text-center'>
                                        <p>Dr. Prakash Singaria</p>
                                        <p>(Director / Founder)</p>
                                        <p>Authorised Signatory</p>
                                    </section>
                                </section>
                            </section>


                            <section className='w-[100%] flex justify-between py-1 px-3 mt-[20px] '>
                                <p className='bg-[#c0bebe] text-black p-2 rounded-[10px] text-[14px]'>Donations made to " www.shriraghavleela.org" are eligible for the benefit of deduction under Section 80G of the Income Tax Act, 1961. Amount donated: ₹{data.Amount === undefined ? "No Data Found" : data.Amount.toLocaleString()}. Authorized by " www.shriraghavleela.org"</p>
                            </section>


                            <section className='w-[100%] flex justify-between py-2 px-2 mt-[20px] rounded-b-[10px] bg-[var(--primary-color--)] text-[14px] '>
                                <div className='m-auto flex justify-evenly w-[100%]'>
                                    <p className='flex items-center text-white'>
                                        <FaPhone className='me-2' /> +91 85600 26002
                                    </p>

                                    <p className='flex items-center text-white'>
                                        <IoIosMail className='me-2 text-[20px]' />   info@shriraghavleela.org
                                    </p>

                                    <p className='flex items-center text-white'>
                                        <FaGlobe className='me-2' />  www.shriraghavleela.org
                                    </p>
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>

            <section className=''>
                {
                    user[0] === undefined || user[0].Address === undefined ? null :
                        <button className='text-[16px] py-3 px-3 rounded-[10px] border-[1px] bg-[var(--primary-color--)] text-white flex items-center m-auto mb-3' onClick={reactToPrintFn}><FaDownload className='me-2' /> DOWNLOAD AND PRINT</button>
                }

            </section>
        </>
    )
}
