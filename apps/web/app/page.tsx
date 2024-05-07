import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Hero from '@/components/landing-page/Hero'

export default function Home() {
  return (
    <div className='bg-background'>
      <section>
        <MaxWidthWrapper className='pb-24 pt-14 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-32 xl:gap-x-8 xl:pt-36'>
          <Hero />
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
