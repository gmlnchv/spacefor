import { Image } from '~/components/image.tsx';
import { Link } from '@remix-run/react';
import { PostProps } from '~/queries/post.ts';
import { format, parseISO } from 'date-fns';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'ui';

const captionVariants = cva('flex flex-col p-5 space-y-2.5 flex-1', {
  variants: {
    colorScheme: {
      cararra: 'bg-cararra-100',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    colorScheme: 'cararra',
  },
});

interface PostListProps extends VariantProps<typeof captionVariants> {
  posts: PostProps[];
}

export const PostList = ({ posts, colorScheme }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 border border-black lg:grid-cols-4 bg-black gap-px">
      {posts.map((post) => (
        <figure key={post._id} className="flex flex-col relative">
          <Image
            src={post.image.asset.url}
            width={500}
            height={500}
            blurHash={post.image.asset.metadata.blurHash}
            alt={post.title}
            className="mx-auto"
          />

          <figcaption className={cn(captionVariants({ colorScheme }))}>
            <p>{format(parseISO(post.publishedAt), 'd-M-yy')}</p>
            <h2 className="text-xl/tight text-balance flex-1">{post.title}</h2>
            <p className="text-sm flex-1 lg:min-h-32">{post.excerpt}</p>

            <Link
              to={`/editorial/posts/${post.slug}`}
              className="underline text-sm after:absolute after:inset-0"
            >
              Read more
            </Link>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};
