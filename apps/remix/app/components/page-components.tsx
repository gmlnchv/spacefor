import Hero from '~/components/hero.tsx'
import { HeroProps } from '~/queries/page.ts'

const mapComponents = {
  hero: Hero,
}

type AnyComponent = HeroProps

interface PageComponentsProps {
  components: AnyComponent[]
}

const PageComponents = ({ components }: PageComponentsProps) => {
  return (
    <>
      {components.map((component) => {
        const Component = mapComponents[component._type]
        return <Component key={component._key} {...component} />
      })}
    </>
  )
}

export { PageComponents }
