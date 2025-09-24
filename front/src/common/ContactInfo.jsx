import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationPin, FaMobile } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'

export function ContactInfo() {
    return (
        <>
            <section className=''>
                <ul className=' leading-[40px]'>
                    {/* <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto:tfgtrust@gmail.com">tfgtrust@gmail.com</a>
                    </li> */}

                    <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto: info@shriraghavleela.org">  info@shriraghavleela.org</a>
                    </li>

                    <li className='flex items-center'>
                        <FaPhoneAlt className='me-2  text-[20px]' /> <a href="tel:+919358965309">+91 93589 65309</a>
                    </li>

                    <li className='flex items-center'>
                        <FaPhoneAlt className='me-2  text-[20px]' /> <a href="tel:+917849830667">+91 78498 30667</a>
                    </li>

                       <li className='flex items-center'>
                        <FaPhoneAlt className='me-2  text-[20px]' /> <a href="tel:+918560026002">+91 85600 26002</a>
                    </li>

                    {/* <li className='flex items-center'>
                        <FaMobile className='me-2  text-[20px]' />  (+91) 11-35565726
                    </li> */}

                    <li className='flex items-start leading-[30px] mt-2'>
                        <FaLocationPin className='me-2 text-[20px] mt-2' /> Plot. No. Cyb-6, Cyber Park, Near Saras Dairy, Shastri Nagar, Jodhpur (Raj.)
                    </li>

                    <li className='flex items-start leading-[30px] mt-2'>
                        <FaLocationPin className='me-2 text-[20px] mt-2  ' /> SECURE E-TECHNO WORLD PVT.LTD. Office No. 232 ,  IIND FLOOR RAZDAN MANSION JALORI GATE JODHPUR – 342 001 RAJASTHAN
                    </li>
                </ul>
            </section>
        </>
    )
}
