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
              <Link href={"/projects"} className='flex md:w-2/6 items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                View Projects
              </Link>
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
