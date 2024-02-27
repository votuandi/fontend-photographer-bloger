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
  image: string
}

export const getServerSideProps = (async ({ locale }) => {
  let seoData: ISeoProps = {
    title: 'Kỳ Anh Nguyễn Home Page',
    description: 'Kỳ Anh Nguyễn . 𝗧𝗿𝗮𝘃𝗲𝗹 𝗕𝗹𝗼𝗴𝗴𝗲𝗿 . 𝗖𝗼𝗻𝘁𝗲𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 . Contact: kyanhnguyen.traveller@gmail.com',
    image: 'https://www.kyanhnguyen.vn:8080/public/img/banner_ex_01.jpg',
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
      <NextSeo title={props.seoData.title} description={props.seoData.description} />
      <ViewHome />
    </Suspense>
  )
}

Home.getLayout = (page) => {
  return <LayoutMain>{page}</LayoutMain>
}

export default Home
