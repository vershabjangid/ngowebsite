import React from 'react'
import { WebAdminSidebar } from '../../../common/WebAdminSidebar'
import { WebAdminHeader } from '../../../common/WebAdminHeader'
import { LiaCertificateSolid } from 'react-icons/lia'
import { DashAddCertificate } from './web dashboard certificates/add/DashAddCertificate'

export function WebDashCertificates() {
    return (
        <>
            <section className='w-[100%] h-[100vh]  bg-[#d7d7d76b] flex'>
                <WebAdminSidebar />
                <section className='w-[100%] h-[100%]'>
                    <WebAdminHeader />

                    <section className='w-[100%] h-[calc(100vh-66px)] overflow-y-scroll p-2 px-[20px]'>
                        <section className='w-[100%] px-3'>
                            <div className='text-[25px] flex items-center'>
                                <LiaCertificateSolid />
                                <h1 className='font-[600] ms-2'>
                                    Certificates
                                </h1>
                            </div>
                            <div className='font-[500] text-[15px]'>
                                <p>Dashboard / <span className='text-[#1385ff]'>Certificates</span></p>
                            </div>
                        </section>

                        <DashAddCertificate />
                        {/*  <DashSendPersonalNotice /> */}
                    </section>
                </section>
            </section>
        </>
    )
}
