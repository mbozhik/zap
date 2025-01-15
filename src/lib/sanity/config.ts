import {createClient} from 'next-sanity'
import {ImageProps} from 'next-sanity/image'
import ImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2022-03-07',
  useCdn: false,
})

export function urlForImage(source: ImageProps) {
  return ImageUrlBuilder(client).image(source).url()
}
