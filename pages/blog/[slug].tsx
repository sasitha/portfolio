
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import PostType from '../../interfaces/post'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import { useEffect } from 'react'

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


export default function Post({ post, morePosts, preview }: Props) {

    useEffect(() => {
        console.log('post', post)
    })

    return (
        <h1>{post.title}</h1>
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
    ], '_posts')
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
    const posts = getAllPosts(['slug'], '_posts')
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