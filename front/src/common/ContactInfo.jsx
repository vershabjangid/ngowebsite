import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationPin, FaMobile } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'

export function ContactInfo() {
    return (
        <>
            <section className=' lowercase'>
                <ul className=' leading-[40px]'>
                    {/* <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto:tfgtrust@gmail.com">tfgtrust@gmail.com</a>
                    </li> */}

                    <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto:info@balkrishnam.org"> info@balkrishnam.org</a>
                    </li>

                    <li className='flex items-center'>
                        <FaPhoneAlt className='me-2  text-[20px]' /> <a href="tel:+918560026002">+91 85600 26002</a>
                    </li>

                    {/* <li className='flex items-center'>
                        <FaMobile className='me-2  text-[20px]' />  (+91) 11-35565726
                    </li> */}

                    <li className='flex items-start leading-6'>
                        <FaLocationPin className='me-2 text-[20px] mt-2' />Jalori Gate, Jodhpur, Rajasthan, India
                    </li>
                </ul>
            </section>
        </>
    )
}
