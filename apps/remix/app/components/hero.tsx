import { HeroProps } from '~/queries/page.ts'
import { Image } from '~/components/image.tsx'

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <section className="py-10 md:py-24 max-h-[875px]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 justify-items-center ">
          <div className="md:space-y-14 text-balance">
            <h1 className="text-4xl lg:text-8xl text-balance">{title}</h1>
            <p className="text-balance">{description}</p>
          </div>

          {image && (
            <Image
              src={image.asset.url}
              layout="constrained"
              width={600}
              height={490}
              blurHash={image.asset.metadata.blurHash}
              className="border border-white md:mt-6"
              alt={image.alt ?? ''}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
