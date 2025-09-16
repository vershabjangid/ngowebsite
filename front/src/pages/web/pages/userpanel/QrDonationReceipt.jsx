import React from 'react'
import { useParams } from 'react-router-dom'
import { Logo } from '../../../../common/Logo'
import DateFormat from '../../../../common/DateFormat'
import { FaGlobe, FaPhone } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
const converter = require("number-to-words");

export function QrDonationReceipt() {
    let { IdName, IdAddress, ReceiptNo, Amount, PaymentId, Status, CreatedOn, BankName, BranchName, PanNo } = useParams();
    return (
        <>
            <section className='w-[100%]  py-5 px-2'>
                <section className='w-[900px]   m-auto rounded-[10px] flex items-center justify-center relative'>
                    <section className='w-[50%] m-auto absolute opacity-[0.3] z-[-9]'>
                        <Logo />
                    </section>

                    <section className='w-[100%] rounded-t-[10px] px-3 py-2'>
                        <section className='border-[1px] rounded-[10px]  border-[black]'>
                            <section className='border-b-[1px]  border-[black] p-2 flex items-center justify-between'>
                                <section className='w-[300px]'>
                                    <Logo />
                                </section>
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
                                            <td className='py-1 border-[2px] border-[black]'>{ReceiptNo}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{Amount.toLocaleString()}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{PaymentId}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{Status}</td>
                                            <td className='py-1 border-[2px] border-[black]'>{<DateFormat value={CreatedOn} />}</td>
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
                                            <td className='p-2 border-[1px] border-[black]'>{IdName}</td>
                                            <td className='p-2 border-[1px] border-[black]'>{converter.toWords(Amount)}</td>
                                            <td className='p-2 border-[1px] border-[black]'>{IdAddress}</td>
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
                                            <td className='p-2 border-[2px] border-[black]'>{BankName}</td>
                                            <td className='p-2 border-[2px] border-[black]'>{BranchName}</td>
                                            <td className='p-2 border-[2px] border-[black]'>{PanNo}</td>
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
                                        <Logo />
                                    </section>
                                    <section className='text-[12px] font-[500] text-center'>
                                        <p>Rev. Dr. Abraham Sahu</p>
                                        <p>(Director / Founder)</p>
                                        <p>Authorised Signatory</p>
                                    </section>
                                </section>
                            </section>


                            <section className='w-[100%] flex justify-between py-1 px-3 mt-[20px] '>
                                <p className='bg-[#c0bebe] text-black p-2 rounded-[10px] text-[14px]'>Donations made to "The Full Gospel Trust Of India" are eligible for the benefit of deduction under Section 80G of the Income Tax Act, 1961. Amount donated: ₹{Amount.toLocaleString()}. Authorized by "The Full Gospel Trust Of India"</p>
                            </section>


                            <section className='w-[100%] flex justify-between py-2 px-2 mt-[20px] rounded-b-[10px] bg-[var(--primary-color--)] text-[14px] '>
                                <div className='m-auto flex justify-evenly w-[100%]'>
                                    <p className='flex items-center text-white'>
                                        <FaPhone className='me-2' />  (+91) 9810285469
                                    </p>

                                    <p className='flex items-center text-white'>
                                        <IoIosMail className='me-2 text-[20px]' />   tfgtrust@gmail.com
                                    </p>

                                    <p className='flex items-center text-white'>
                                        <FaGlobe className='me-2' />  www.tfgti.org
                                    </p>
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )
}
