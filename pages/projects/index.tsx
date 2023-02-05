import React from "react";
import { getAllPosts, getPostByCategory } from "../../lib/api";
import PostType from "../../interfaces/post";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
type Props = {
    posts: PostType[]
}
export const ProjectsHome = ({ posts }: Props) => {
    const router = useRouter();
    return (
        <section>

            <div className="relative pt-36 ">
                <div className="grid grid-cols-1">
                    <div className="text-left">
                        <h1 className="text-xl font-bold uppercase text-plum-900">Projects</h1>
                        <p className='text-base font-medium pt-2 text-justify'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui ligula, malesuada vel convallis in, tincidunt ut mi. Vestibulum sit amet urna placerat, tempor soloa demanium testi lor Aliq lorem vitae semper tempor.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                    {
                        posts.map((p: PostType) => {
                            return (
                                <div className='items-center justify-center flex flex-col' key={p.slug}>
                                    <h2 className='text-lg font-bold'>{p.title}</h2>
                                    <p className='text-justify pt-2 flex-1'>
                                        {p.excerpt}
                                    </p>
                                    <p className='text-left pt-2 text-sm font-bold italic'>
                                        {p.tags.join(', ')}
                                    </p>
                                    <Link as={`/projects/${p.slug}`} href={"/projects/[slug]"}
                                        className='flex md:w-2/6 items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 mt-6 py-1 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                                        Read more
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps({ params }: any) {
    const featuredPosts = getAllPosts(['title',
        'date',
        'slug',
        'author',
        'excerpt',
        'ogImage',
        'tags',
        'cover',], '_projects');

    console.log('featured projects', featuredPosts);
    return {
        props: {
            posts: featuredPosts
        }
    }
}

export default ProjectsHome;