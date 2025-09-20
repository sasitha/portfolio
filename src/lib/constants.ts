import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/meta-default.jpg';
import avatar from '@/assets/images/sasitha.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://sasitha.net',
  author: {
    avatar,
    name: 'Sasitha Madushanka',
    headline: 'Senior Full-Stack Developer & AWS Expert',
    username: 'coderdiaz',
    location: 'Wellington, New Zealand',

  },
  seo: {
    title: 'Sasitha Madushanka',
    description: 'Senior Full-Stack Developer & AWS Expert',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@sasitha_madush',
    },
    robots: 'noindex, nofollow',
  }
};