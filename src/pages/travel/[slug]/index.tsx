import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { newsApi } from '@/utils/api'
import { commonHelpers } from '@/utils/helpers'
import { commonConfig } from '@/utils/configs'

import LayoutMain from '@/layouts/Main'
import LayoutCoreProvider from '@/layouts/CoreProvider'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { capitalizeFirstLetter } from '@/utils/helpers/common'

type TravelSlugProps = {
  category: string
}

const ViewTravelSlug = dynamic(() => import('@/views/Travel'), {
  suspense: true,
  ssr: false,
})

const TravelSlug: NextPageWithLayout<TravelSlugProps> = () => {
  return (
    <Suspense fallback="...">
      <ViewTravelSlug />
    </Suspense>
  )
}

TravelSlug.getLayout = (page, pageParams) => {
  return (
    <LayoutCoreProvider
      headParams={{
        title: pageParams?.category,
      }}
    >
      <LayoutMain>{page}</LayoutMain>
    </LayoutCoreProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const slug = params!.slug as string

  return {
    props: {
      ...(await serverSideTranslations(locale || '')),
      category: capitalizeFirstLetter(slug.replaceAll('-', ' ')),
    },
  }
}

export default TravelSlug
