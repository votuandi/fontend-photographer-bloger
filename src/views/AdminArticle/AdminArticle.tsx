/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminArticle.style'
import { Box, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'

export default function AdminArticle() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  let FetchData = async () => {}

  useEffect(() => {
    if (isMounted()) return
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f0ed',
            color: 'black',
          }}
        >
          <AppAdminMenu />
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              padding: '24px',
              overflow: 'auto',
              backgroundColor: '#f4f0ed',
            }}
          >
            <Typography
              variant="headerSemi35"
              sx={{
                fontFamily: 'Mulish',
                fontWeight: 700,
                fontSize: '36px',
                color: '#1a1a1a',
              }}
            >
              Quản Lý Bài viết
            </Typography>
          </Box>
        </Box>
      </main>
    </>
  )
}
