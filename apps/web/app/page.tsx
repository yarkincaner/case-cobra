import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Hero from '@/components/landing-page/Hero'
import { Reviews } from '@/components/landing-page/Reviews'
import Testimonials from '@/components/landing-page/Testimonials'

export default function Home() {
  return (
    <div>
      <section>
        <MaxWidthWrapper className='pb-24 pt-14 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-32 xl:gap-x-8 xl:pt-36'>
          <Hero />
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <Testimonials />
        </MaxWidthWrapper>
        <div className='pt-16'>
          <Reviews />
        </div>
      </section>
    </div>
  )
}
