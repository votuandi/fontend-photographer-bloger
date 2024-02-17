/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminArticleContent.style'
import { Box, Button, CircularProgress, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import articleApi, { ARTICLE_ITEM_TYPE } from '@/utils/api/article'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import { formatDate } from '@/utils/helpers/common'
import { ARTICLE_CONTENT_ITEM_TYPE } from '@/utils/api/articleContent'
import { articleContentApi } from '@/utils/api'
import parse from 'html-react-parser'

export default function AdminArticleContent() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [articleId, setArticleId] = useState<string>('')
  const [article, setArticle] = useState<ARTICLE_ITEM_TYPE>()
  const [contentList, setContentList] = useState<ARTICLE_CONTENT_ITEM_TYPE[]>([])

  let GetArticle = async (_aid?: string) => {
    let aid: string = _aid ? _aid : articleId
    try {
      let res = await articleApi.getById(aid)
      if (res.data.status) {
        setArticle(res.data.params)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let GetContentsByArticleId = async (_aid?: string) => {
    let aid: string = _aid ? _aid : articleId
    try {
      let res = await articleContentApi.getListByArticleId(aid)
      if (res.data.status) {
        setContentList(res.data.params)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let FetchData = async (aid?: string) => {
    await GetArticle(aid)
    await GetContentsByArticleId(aid)
  }

  useEffect(() => {
    if (isMounted()) return
    let { slug } = router.query
    let aid: string = ''
    if (typeof slug === 'string') {
      aid = slug
    }
    setArticleId(aid)
    FetchData(aid)
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
            width: '100%',
            height: '100vh',
            padding: '24px',
            overflow: 'auto',
            backgroundColor: '#f4f0ed',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Button
            variant="text"
            onClick={router.back}
            startIcon={<ArrowBackOutlinedIcon sx={{ width: '16px', height: '16px' }} />}
            sx={{
              fontSize: '16',
              fontWeight: 700,
              width: 'fit-content',
              fontFamily: 'Mulish',
            }}
          >
            Back
          </Button>
          <Box
            sx={{
              width: '100%',
              maxWidth: '1140px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mt: '20px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Mulish',
                color: '#1a1a1a',
                fontWeight: 800,
                fontSize: '36px',
                mx: 'auto',
              }}
            >
              {article?.title}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  width: 'fit-content',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <PhotoLibraryOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#999',
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    textAlign: 'justify',
                  }}
                >
                  {article?.category?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 'fit-content',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <EventAvailableOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#999',
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    textAlign: 'justify',
                  }}
                >
                  {article?.publicTime ? formatDate(new Date(article.publicTime)) : ''}
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: 'Mulish',
                color: '#1a1a1a',
                fontWeight: 400,
                fontSize: '14px',
                width: '100%',
                textAlign: 'justify',
              }}
            >
              {article?.shortDescription}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mt: '20px',
            }}
          >
            {Array.isArray(contentList) &&
              contentList.map((aContent, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    border: '1px solid #999',
                    borderRadius: '8px',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    backgroundColor: '#fff',

                    '&:hover': {
                      backgroundColor: '#B7905C10',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      justifyContent: 'start',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      display={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <AspectRatioOutlinedIcon sx={{ color: '#BD538E', height: '14px' }} />
                      <Typography
                        sx={{
                          color: '#BD538E',
                          fontSize: '14px',
                          fontWeight: 700,
                          fontFamily: 'Mulish',
                        }}
                      >
                        {aContent.width}
                      </Typography>
                    </Box>
                    <Box
                      display={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FilePresentIcon sx={{ color: '#00A989', height: '14px' }} />
                      <Typography
                        sx={{
                          color: '#00A989',
                          fontSize: '14px',
                          fontWeight: 700,
                          fontFamily: 'Mulish',
                        }}
                      >
                        {aContent.type}
                      </Typography>
                    </Box>
                  </Box>
                  {aContent.type === 'text' ? (
                    <Typography
                      sx={{
                        color: '#1a1a1a',
                        fontSize: '14px',
                        fontWeight: 400,
                        mt: '8px',
                      }}
                    >
                      {parse(aContent.content)}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
              ))}
          </Box>
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00000080',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 91,
              }}
            >
              <CircularProgress sx={{ width: '80px', height: '80px', color: '#DBB070' }} />
            </Box>
          )}
        </Box>
      </main>
    </>
  )
}
