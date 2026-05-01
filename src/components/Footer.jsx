import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Sprout } from "lucide-react";

function Footer() {
  return (
    // <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
    //         <div className="relative z-10 mx-auto max-w-7xl px-4">
    //             <div className="-m-6 flex flex-wrap">
    //                 <div className="w-full p-6 md:w-1/2 lg:w-5/12">
    //                     <div className="flex h-full flex-col justify-between">
    //                         <div className="mb-4 inline-flex items-center">
    //                             <Logo width="100px" />
    //                         </div>
    //                         <div>
    //                             <p className="text-sm text-gray-600">
    //                                 &copy; Copyright 2023. All Rights Reserved by DevUI.
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //                     <div className="h-full">
    //                         <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //                             Company
    //                         </h3>
    //                         <ul>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Features
    //                                 </Link>
    //                             </li>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Pricing
    //                                 </Link>
    //                             </li>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Affiliate Program
    //                                 </Link>
    //                             </li>
    //                             <li>
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Press Kit
    //                                 </Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //                 <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //                     <div className="h-full">
    //                         <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //                             Support
    //                         </h3>
    //                         <ul>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Account
    //                                 </Link>
    //                             </li>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Help
    //                                 </Link>
    //                             </li>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Contact Us
    //                                 </Link>
    //                             </li>
    //                             <li>
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Customer Support
    //                                 </Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //                 <div className="w-full p-6 md:w-1/2 lg:w-3/12">
    //                     <div className="h-full">
    //                         <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //                             Legals
    //                         </h3>
    //                         <ul>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Terms &amp; Conditions
    //                                 </Link>
    //                             </li>
    //                             <li className="mb-4">
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Privacy Policy
    //                                 </Link>
    //                             </li>
    //                             <li>
    //                                 <Link
    //                                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                                     to="/"
    //                                 >
    //                                     Licensing
    //                                 </Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>


    <section>
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout size={32} color="var(--color-accent)" />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>FarmDirect</span>
          </div>
          <div className="flex gap-6">
            <a href="#" style={{ color: 'var(--color-border)' }}>About</a>
            <a href="#" style={{ color: 'var(--color-border)' }}>Contact</a>
            <a href="#" style={{ color: 'var(--color-border)' }}>Privacy</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-primary-light)', paddingTop: '2rem', textAlign: 'center', color: 'var(--color-border)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} FarmDirect. All rights reserved.
        </div>
      </div>
    </footer>
    </section>
    
  )
}

export default Footer