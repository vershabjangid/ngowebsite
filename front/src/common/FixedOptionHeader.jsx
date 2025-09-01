import React from 'react'
import { Link } from 'react-router-dom'

export function FixedOptionHeader() {
    return (
        <div className='banner_menubar absolute w-[100%] top-[30px] z-[9999]'>
            <ul className=' flex text-white justify-evenly font-[600]'>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About Us</Link></li>
                <li><Link to={"/gallery"}>Gallery</Link></li>
                <li><Link to={"/news"}>News & Events</Link></li>
                <li><Link to={"/contact-us"}>Contact Us</Link></li>
                <li><Link to={"/terms-conditions"}>Terms & Conditions</Link></li>
                <li><Link to={"/privacy-policy"}>Privacy Policy</Link></li>
            </ul>
        </div>
    )
}
