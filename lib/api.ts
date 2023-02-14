import fs from 'fs'
import path, { join } from 'path'
import matter from 'gray-matter'
import glob from 'glob';
// const postsDirectory = join(process.cwd(), '_posts')

export function getMarkdownFiles(directory: string) {
    const postsDirectory = join(process.cwd(), directory)
    return glob.sync(`${postsDirectory}/**/*.md`);
}

export function getPostFromFile(file: string, fields: string[] = []) {

    const fileContents = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContents);
    type Items = {
        [key: string]: string
    }
    const items: Items = {};
    fields.forEach((field) => {
        if (field === 'content') {
            items[field] = content
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    return items
}

export function getPostBySlug(slug: string, fields: string[] = [], directory: string) {
    const postsDirectory = join(process.cwd(), directory)
    const fullPath = join(postsDirectory, `${slug}/index.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    type Items = {
        [key: string]: string
    }

    const items: Items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'content') {
            items[field] = content
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    return items
}

export function getAllPosts(fields: string[] = [], directory: string) {
    const allMarkdownFiles = getMarkdownFiles(directory);
    const allPosts = allMarkdownFiles
        .map((file) => getPostFromFile(file, fields));
    return allPosts;
}

export function getPostByCategory(fields: string[] = [], directory: string, category: string) {
    if (!fields.includes('category')) {
        fields.push('category')
    }
    const allMarkdownFiles = getMarkdownFiles(directory);
    const filteredPosts = allMarkdownFiles
        .map((file) => getPostFromFile(file, fields))
        .filter((p) => p.category.includes(category))

    return filteredPosts;
}