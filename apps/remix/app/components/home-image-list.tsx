import { cn } from 'ui';
import { Image } from '~/components/image.tsx';
import { cva } from 'class-variance-authority';
import { HomePageProps } from '~/queries/home';

interface Props {
  images?: HomePageProps['page']['images'];
}

const flexDirectionClasses = ['flex-col', 'flex-col-reverse space-y-reverse'];
const alignItemsClasses = ['items-start', 'items-end'];

function randomAlignItemsClass() {
  return alignItemsClasses[
    Math.floor(Math.random() * alignItemsClasses.length)
  ];
}

function randomFlexDirectionClass() {
  return flexDirectionClasses[
    Math.floor(Math.random() * flexDirectionClasses.length)
  ];
}

const figureVariants = cva('flex break-inside-avoid mt-8 first:mt-0', {
  variants: {
    variant: {
      portrait:
        'xl:flex-row-reverse -space-y-px xl:-space-x-px xl:space-x-reverse',
      landscape: '-space-y-px',
    },
  },
});

const figcaptionVariants = cva(
  'bg-white p-5 text-black border leading-tight space-y-2.5',
  {
    variants: {
      variant: {
        portrait: 'xl:h-1/2 w-full max-xl:max-w-[360px]',
        landscape: 'w-3/4 xl:w-1/2',
      },
    },
  }
);

export const HomeImageList = ({ images = [] }: Props) => {
  return (
    <div className="columns-1 md:columns-2 gap-x-8 lg:gap-x-36 max-lg:space-y-10">
      {images?.map((image) => {
        const isPortrait =
          image.asset.metadata.dimensions?.height! >
          image.asset.metadata.dimensions?.width!;

        const width = isPortrait ? 360 : 620;

        return (
          <figure
            key={image._key}
            className={cn(
              figureVariants({
                variant: isPortrait ? 'portrait' : 'landscape',
              }),
              randomFlexDirectionClass(),
              randomAlignItemsClass()
            )}
          >
            <Image
              src={image.asset.url}
              width={width}
              aspectRatio={image.asset.metadata.dimensions?.aspectRatio!}
              blurHash={image.asset.metadata.blurHash}
              className="border"
              alt={``}
            />

            {image.captionTitle && (
              <figcaption
                className={cn(
                  figcaptionVariants({
                    variant: isPortrait ? 'portrait' : 'landscape',
                  })
                )}
              >
                <p className="text-lg lg:text-2xl font-serif leading-tight">
                  {image.captionTitle}
                </p>
                <p>{image.captionDescription}</p>
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
};
