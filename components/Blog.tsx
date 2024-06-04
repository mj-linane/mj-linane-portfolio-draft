import Container from '@/components/Container'
import HeroPost from '@/components/HeroPost'
import Intro from '@/components/Intro'
import MoreStories from '@/components/MoreStories'
import type PostType from '@/types/post'
import RainbowHighlight from '@/components/RainbowHighlight'
import { RoughNotationGroup } from 'react-rough-notation'

type Props = {
  allPosts: PostType[]
}

export default function Blog({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <Container>
      <Intro />
      <RoughNotationGroup show={true}>
        {heroPost && (
          <HeroPost
            title={<RainbowHighlight color={'#a855f7'}>{heroPost.title}</RainbowHighlight>}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
      </RoughNotationGroup>
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  )
}
