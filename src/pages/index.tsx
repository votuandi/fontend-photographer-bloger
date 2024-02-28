import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutMain from '@/layouts/Main'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'

type ISeoProps = {
  title: string
  description: string
  openGraph?: any
}

export const getServerSideProps = (async ({ locale }) => {
  let seoData: ISeoProps = {
    title: 'Kỳ Anh Nguyễn Home Page',
    description: 'Kỳ Anh Nguyễn . Travel Blogger . Content Creator . Contact: kyanhnguyen.traveller@gmail.com',
    openGraph: {
      url: 'https://www.kyanhnguyen.vn',
      title: 'Kỳ Anh Nguyễn . Travel Blogger . Content Creator',
      description: 'Kỳ Anh Nguyễn . Travel Blogger . Content Creator . Contact: kyanhnguyen.traveller@gmail.com',
      images: [
        {
          url: 'https://kyanhnguyen.vn/img/banner/banner_ex_01.jpg',
          alt: 'Kỳ Anh Nguyễn',
        },
        { url: 'https://kyanhnguyen.vn/img/banner/banner_ex_01.jpg' },
      ],
      siteName: 'Kỳ Anh Nguyễn',
    },
  }
  return {
    props: { seoData, ...(await serverSideTranslations(locale || '')) },
  }
}) satisfies GetServerSideProps<{
  seoData: ISeoProps
}>

const ViewHome = dynamic(() => import('@/views/Home'), {
  suspense: true,
  ssr: false,
})

const Home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <NextSeo
        title={props.seoData.title}
        description={props.seoData.description}
        openGraph={{
          ...props.seoData.openGraph,
        }}
      />
      <ViewHome />
    </Suspense>
  )
}

Home.getLayout = (page) => {
  return <LayoutMain>{page}</LayoutMain>
}

export default Home
