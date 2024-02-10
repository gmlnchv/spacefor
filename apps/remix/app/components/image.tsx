import {
  Image as UnpicImage,
  type ImageProps as UnpicImageProps,
} from '@unpic/react'
import { blurhashToCssGradientString } from '@unpic/placeholder'

type ImageProps = UnpicImageProps & {
  blurHash?: string | null
}

export const Image = ({ className, blurHash, ...props }: ImageProps) => {
  const background = blurHash ? blurhashToCssGradientString(blurHash) : 'auto'

  return (
    <figure className={className}>
      <UnpicImage {...props} background={background} />
    </figure>
  )
}
