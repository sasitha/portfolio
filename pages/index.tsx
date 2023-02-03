import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '../components/header'
import { Hero } from '../components/hero'
const Home: NextPage = () => {


  return (
    <  >
      <Head>
        <title>Sasitha Madushanka</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='isolate bg-white'>
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div>
        <Header />
      </div>
      <main className="w-full items-center justify-center px-20 text-center mb-20">
        <section>
          <Hero />
        </section>
        <section>
          <div className='grid grid-cols-2 gap-8'>
            <div className='text-left pr-2'>
              <h1 className='text-xl font-bold uppercase text-plum-900'>About me</h1>
              <p className='text-base font-medium pt-2 text-justify '>
                I see myself as a person who is driven and passionate about software engineering. I believe in self-disciplined individuals and a collaborative working environment to achieve the highest quality software products.
              </p>
              <p className='text-base font-medium pt-2 text-justify'>
                I graduated from the Faculty of Engineering, the University of Peradeniya, Sri Lanka, with a Software Engineering major. I have been working in the software industry from 2014 onwards.
              </p>
              <p className='text-base font-medium pt-2 text-justify'>
                Feel free to download my resume from the below link. You can also read through the project I have listed below to get an insight into the work I have done.
              </p>
              <div className='pt-4 '>
                <button className='flex items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                  View Projects
                </button>
              </div>
            </div>
            <div className='text-left'>
              <h1 className='text-xl font-bold uppercase text-plum-900'>Connect With Me</h1>
              <p className='text-base font-medium pt-2 text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui ligula, malesuada vel convallis in, tincidunt ut mi. Vestibulum sit amet urna placerat, tempor soloa demanium testi lor Aliq lorem vitae semper tempor.
              </p>
            </div>
          </div>
        </section>
        <section className='pt-8'>
          <div className='w-full items-center justify-center pb-8'>
            <h1 className='text-xl font-bold uppercase text-plum-900'>Featured Projects</h1>
          </div>
          <div className='grid grid-cols-3 gap-8'>
            <div className='items-center justify-center'>
              <h2 className='text-lg font-bold'>Utility Billing and Reporting Platform (BillBot)</h2>
              <p className='text-justify pt-2'>
                This product is intended to deliver a simple, low-cost Utility billing and reporting platform, which can support multiple Retailers. It aims to reduce manual work required by Retailers to manage their customer and reporting needs, integrating with key external systems, and automating several processes.
              </p>
              <p className='text-left pt-2 text-sm font-bold italic'>
                React, AWS Lambda, Node.js, DynamoDB, AWS, PostgreSQL, Cypress,
              </p>
            </div>
            <div className='items-center justify-center'>
              <h2 className='text-lg font-bold'>Auto Workshop Management - SaaS Application</h2>
              <p className='text-justify pt-2' >This solution was developed to be a low-cost multi-tenant SAAS application for small and medium scale businesses.</p>
              <p className='text-left pt-2 text-sm font-bold italic'>Angular, AWS Lambda, Node.js, DynamoDB, AWS, Cypress</p>
            </div>
            <div className='items-center justify-center'>
              <h2 className='text-lg font-bold'>Trailer Hire Management System</h2>
              <p className='text-justify pt-2'>This Digital Transformation project transformed a New Zeland based trailer rental company to a new generation business operation from its manual bookkeeping process. Project delivered the following outcomes to enable a unique digital transformation experience for all the stakeholders.</p>
              <p className='text-left pt-2 text-sm font-bold italic'>React, React Native, AWS Lambda, Node.js, DynamoDB, AWS, PostgreSQL, Cypress,</p>
            </div>
          </div>
          <div className='w-full flex items-center justify-center pt-8'>
            <button className='flex items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
              View More
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
