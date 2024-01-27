import { Suspense, startTransition } from 'react'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutAdmin from '@/layouts/Admin'

import type { NextPageWithLayout } from '@/pages/_app'
import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
// import pageStructuresApi from "@/utils/api/pageStructures/pageStructures.api";
import { NextSeo } from 'next-seo'

type ISeoProps = {
  title: string
  description: string
}

export const getServerSideProps = (async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale || '')) },
  }
}) satisfies GetServerSideProps<{}>

const ViewAdminArticle = dynamic(() => import('@/views/AdminArticle'), {
  suspense: true,
  ssr: false,
})

const AdminArticle: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <Suspense fallback="...">
      <ViewAdminArticle />
    </Suspense>
  )
}

AdminArticle.getLayout = (page) => {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default AdminArticle
