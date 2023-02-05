
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import PostType from '../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import { useEffect } from 'react'
import markdownStyles from '../../styles/markdown-styles.module.css';
import Link from 'next/link'


type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
}

type Params = {
    params: {
        slug: string
    }
}


export default function Project({ post, morePosts, preview }: Props) {
    return (
        <div className='relative pt-36'>
            <div className='grid grid-cols-3'>
                <div></div>
                <div className='col-span-2'>
                    <div className='text-left'>
                        <h1 className='text-xl font-bold uppercase text-plum-900'>{post.title}</h1>
                        <div className='text-base font-medium pt-2 text-justify'>
                            <div
                                className={markdownStyles['markdown']}
                                dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                        <p className='text-left pt-2 text-md font-bold italic'>
                            {post.tags && post.tags.join(', ')}
                        </p>
                    </div>
                    <Link href={"/projects"}
                        className='flex md:w-2/6 items-center justify-center rounded-md border border-transparent bg-bramble-700 px-4 mt-6 py-1 text-sm font-bold text-white shadow-sm hover:bg-bramble-900 '>
                        View More Projects
                    </Link>
                </div>
            </div>

        </div>
    )
}

export async function getStaticProps({ params }: Params) {
    console.log('params from get static props ', params);
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
        'tags',
    ], '_projects')
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'], '_projects')
    console.log('all posts from [slug].tsx', posts);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}