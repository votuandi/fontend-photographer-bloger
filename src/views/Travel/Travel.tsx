/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './Travel.style'
import { Box, Grid, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'

type Query = {
  slug: string
}

export default function Travel() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const query = router.query as unknown as Query

  const [title, setTitle] = useState<string>('')

  let FetchData = async () => {}

  useEffect(() => {
    if (isMounted()) return
    setTitle(query.slug.replace('-', ' '))
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f4f0ed',
        color: 'black',
        paddingY: '100px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1014px',
          marginX: 'auto',
        }}
      >
        <Typography
          sx={{
            fontSize: 60,
            fontFamily: 'Mulish',
            fontWeight: 700,
            color: '#020000',
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '40px 0 60px',
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={'20px'}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundImage: 'url("/img/banner/banner_ex_01.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              aspectRatio: 2.2,
              marginBottom: '20px',
            }}
          ></Grid>
          <Grid
            item
            xs={6}
            sx={{
              backgroundImage: 'url("/img/banner/banner_ex_02.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              aspectRatio: 1.6,
            }}
          ></Grid>
          <Grid
            item
            xs={6}
            sx={{
              backgroundImage: 'url("/img/banner/banner_ex_03.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '100%',
              aspectRatio: 1.6,
            }}
          ></Grid>
        </Grid>
      </Box>
    </Box>
  )
}
