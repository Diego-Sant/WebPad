import Footer from '@/components/heading/footer'
import { Heading } from '@/components/heading/heading'
import { Heroes } from '@/components/heading/heroes'

const LandingPage = () => {
  return (
    <div className='min-h-full flex flex-col'>
        <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
            <Heading />
            <Heroes />
        </div>
        <Footer />
    </div>
  )
}

export default LandingPage