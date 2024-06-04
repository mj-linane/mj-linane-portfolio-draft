import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from '@/components/Container'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import PostTitle from '@/components/PostTitle'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import type PostType from '@/types/post'

type Props = {
  post: PostType
}

export default function Post({ post }: Props) {
  const router = useRouter()
  const title = `${post?.title} | my blog`

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        <NavBar /> {/* */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

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
  const posts = await getAllPosts(['slug'])

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
