import { SpaceProps } from '~/queries/spaces.ts';
import { Image } from '~/components/image.tsx';
import { Link } from '@remix-run/react';

interface SpaceListProps {
  spaces: SpaceProps[];
}

const SpaceList = ({ spaces }: SpaceListProps) => {
  return (
    <div className="flex max-md:flex-col max-md:divide-y border border-black md:divide-x divide-black">
      {spaces.map((space) => (
        <div
          key={space._id}
          className="md:w-1/2 p-5 space-y-10 flex flex-col relative"
        >
          <header className="flex flex-col flex-1">
            <div className="flex justify-between">
              <div className="space-y-3.5">
                <h2 className="text-[2rem]">{space.title}</h2>
                <p className="text-sm">{`${space.address}, ${space.city}`}</p>
                <p className="text-xl text-pretty">{space.indexDescription}</p>
              </div>

              <Link
                to={space.slug}
                className="underline text-sm underline-offset-2 after:absolute after:inset-0"
              >
                View
              </Link>
            </div>
          </header>

          {space.image && (
            <Image
              src={space.image.asset.url}
              layout="constrained"
              height={360}
              aspectRatio={1.67}
              blurHash={space.image.asset.metadata.blurHash}
              className="border border-white w-full"
              alt={space.title}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export { SpaceList };
