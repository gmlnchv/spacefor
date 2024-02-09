import type { Post } from '~/queries/posts.ts'
import { Image } from '~/components/image.tsx'
import { Link } from '@remix-run/react'

interface PostListProps {
  posts: Post[]
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Image
            src={post.mainImage.asset.url}
            layout="constrained"
            width={400}
            height={300}
            blurHash={post.mainImage.asset.metadata.blurHash}
            alt=""
          />

          <p>{post.title}</p>

          <Link to={`/posts/${post.slug}`}>Read more</Link>
        </li>
      ))}
    </ul>
  )
}
