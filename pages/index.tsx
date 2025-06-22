import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { getPostByCategory } from '../lib/api'
import PostType from '../interfaces/post'
import Link from 'next/link'

type Props = {
  posts: PostType[]
}


const Home = ({ posts: featuredPosts }: Props) => {


  return (
    <  >

      <section>
        <Hero />
      </section>
      <section id='about_me' className='pt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='text-left pr-2'>
            <h1 className='text-xl font-bold uppercase text-plum-900'>About me</h1>
            <h3 className='text-md font-bol'>
              I'm a problem solver at heart who thrives on seeing code transform into solutions that real users love.
            </h3>
            <p className='text-base font-medium pt-2 text-justify '>
              With over 10 years of experience as a Technical Lead, I specialize in building scalable cloud solutions that deliver exceptional value. My approach is simple: understand deeply, build thoughtfully, and deliver reliably.
            </p>
            <p className='text-base font-medium pt-2 text-justify'>
              I believe the best software comes from teams that combine technical excellence with genuine collaboration. That's why I'm passionate about mentoring developers – guiding them to discover their own strengths while building systems that matter. Through practices like TDD/BDD, I've helped teams achieve 90% code coverage while delivering features that truly capture user needs.
            </p>
            <p className='text-base font-medium pt-2 text-justify'>
              My proudest achievement? Leading the Trailer Hire project where we delivered a solution for a fraction of the initial estimated cost while dramatically reducing AWS maintenance expenses. This exemplifies my philosophy: elegant solutions don't have to be complicated.
            </p>
            <div className='pt-4 '>
              <Link href={"/projects"} className='flex md:w-2/6 items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                View Projects
              </Link>
            </div>
          </div>
          {/* <div className='text-left'>
            <h1 className='text-xl font-bold uppercase text-plum-900'>Connect With Me</h1>
            <p className='text-base font-medium pt-2 text-justify'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui ligula, malesuada vel convallis in, tincidunt ut mi. Vestibulum sit amet urna placerat, tempor soloa demanium testi lor Aliq lorem vitae semper tempor.
            </p>
          </div> */}
        </div>
      </section>
      <section className='pt-8' id='projects'>
        <div className='w-full items-center justify-center pb-8'>
          <h1 className='text-xl font-bold uppercase text-plum-900'>Featured Projects</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
            featuredPosts.map((p: PostType) => {
              return (
                <div className='items-center justify-center flex flex-col' key={p.slug}>
                  <h2 className='text-lg font-bold'>{p.title}</h2>
                  <div className="relative w-96 h-96 mb-5">
                    <Image src={`${p.cover}`} alt={`${p.title}`} fill
                      className="shadow-2xl"
                      style={{
                        objectFit: 'contain',
                      }} />
                  </div>
                  <p className='text-justify pt-2 flex-1'>
                    {p.excerpt}
                  </p>
                  <p className='text-left pt-2 text-sm font-bold italic'>
                    {p.tags.join(', ')}
                  </p>
                  <Link as={`/projects/${p.slug}`} href={"/projects/[slug]"}
                    className='flex md:w-2/6 items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 mt-6 py-1 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                    Read More
                  </Link>
                </div>
              )
            })
          }
        </div>

      </section>
    </>
  )
}


export async function getStaticProps({ params }: any) {
  const featuredPosts = getPostByCategory(['title',
    'date',
    'slug',
    'author',
    'excerpt',
    'ogImage',
    'tags',
    'cover',], '_projects', 'featured');

  console.log('featured projects', featuredPosts);
  return {
    props: {
      posts: featuredPosts
    }
  }
}


export default Home
