import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLocationPin, FaMobile } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'

export function ContactInfo() {
    return (
        <>
            <section className=' lowercase'>
                <ul className=' leading-[40px]'>
                    <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto:tfgtrust@gmail.com">tfgtrust@gmail.com</a>
                    </li>

                    <li className='flex items-center'>
                        <IoIosMail className='me-2  text-[20px]' /> <a href="mailto:info@tfgti.org"> info@tfgti.org</a>
                    </li>

                    <li className='flex items-center'>
                        <FaPhoneAlt className='me-2  text-[20px]' /> <a href="tel:+919810285469">(+91) 9810285469</a>
                    </li>

                    <li className='flex items-center'>
                        <FaMobile className='me-2  text-[20px]' />  (+91) 11-35565726
                    </li>

                    <li className='flex items-start leading-6'>
                        <FaLocationPin className='me-2 text-[20px] mt-2' /> 523, BLOCK-C, SECTOR 19, Rohini, New Delhi - 110089, India
                    </li>
                </ul>
            </section>
        </>
    )
}
