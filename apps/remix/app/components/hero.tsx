import { HeroProps } from '~/queries/page.ts'
import { Image } from '~/components/image.tsx'

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-16 justify-items-center py-10 md:py-20 lg:py-40 max-h-[875px]">
      <div className="md:space-y-14 text-balance">
        <h1 className="text-4xl lg:text-8xl">{title}</h1>
        <p className="text-balance">{description}</p>
      </div>

      <Image
        src={image.asset.url}
        layout="constrained"
        width={600}
        height={490}
        blurHash={image.asset.metadata.blurHash}
        className="border border-foreground md:mt-6"
        alt={image.alt ?? ''}
      />
    </div>
  )
}

export default Hero
