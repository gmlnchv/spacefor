import { Image } from '~/components/image.tsx';
import { Link } from '@remix-run/react';
import { PostProps } from '~/queries/post.ts';
import { format, parseISO } from 'date-fns';

interface PostListProps {
  posts: PostProps[];
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 border border-black lg:grid-cols-4 bg-black gap-px">
      {posts.map((post) => (
        <figure key={post._id} className="flex flex-col">
          <Image
            src={post.image.asset.url}
            width={385}
            height={385}
            blurHash={post.image.asset.metadata.blurHash}
            alt={post.title}
            className="mx-auto"
          />

          <figcaption className="flex bg-cararra-100 flex-col p-5 space-y-2.5 flex-1">
            <p>{format(parseISO(post.publishedAt), 'd-M-yy')}</p>
            <h2 className="text-xl/tight text-balance flex-1">{post.title}</h2>
            <p className="text-sm flex-1 lg:min-h-32">{post.excerpt}</p>

            <Link to={`/posts/${post.slug}`} className="underline text-sm">
              Read more
            </Link>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
