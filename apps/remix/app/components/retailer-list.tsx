import { RetailerProps } from '~/queries/home.ts'
import { Container } from '~/components/container.tsx'
import { Image } from '@unpic/react'

interface RetailerListProps {
  retailers: RetailerProps[]
}

const RetailerList = ({ retailers }: RetailerListProps) => {
  console.log(retailers)
  return (
    <section className="py-10 md:py-24">
      <Container>
        <div className="text-center py-6 lg:py-12 border-y border-white">
          <h2 className="text-2xl mb-6 lg:mb-12">Your favourite brands, IRL</h2>
          <div className="flex flex-wrap border border-white divide-x divide-y divide-white">
            {retailers?.map((retailer) => (
              <div
                key={retailer._id}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex-auto h-[150px]"
              >
                {retailer.logo && (
                  <div className="group size-full relative flex items-center justify-center">
                    <img
                      src={retailer.logo.asset.url}
                      width={215}
                      height={150}
                      alt={retailer.title}
                      className="p-6"
                    />

                    <Image
                      src={retailer.image.asset.url}
                      layout="constrained"
                      width={215}
                      height={150}
                      alt={retailer.title}
                      className="h-full mx-auto opacity-0 group-hover:opacity-100 absolute inset-0 object-cover transition-opacity duration-300"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export { RetailerList }
