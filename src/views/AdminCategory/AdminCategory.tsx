/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './AdminCategory.style'
import { Box, Button, Grid, Typography } from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { categoryApi } from '@/utils/api'
import { CATEGORY_ITEM_TYPE } from '@/utils/api/category'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function AdminCategory() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const [categoryList, setCategoryList] = useState<CATEGORY_ITEM_TYPE[]>([])

  let GetCategoryList = async () => {
    try {
      let res = await categoryApi.getList()
      if (res.data.status) {
        setCategoryList(res.data.params)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let FetchData = async () => {
    await GetCategoryList()
  }

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
              gap: '36px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="headerSemi35"
              sx={{
                fontFamily: 'Mulish',
                fontWeight: 900,
                fontSize: '36px',
                color: '#936F48',
              }}
            >
              Quản Lý Danh mục
            </Typography>
            <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
              <Grid
                container
                sx={{
                  width: '100%',
                  fontFamily: 'Mulish',
                }}
              >
                <Grid
                  item
                  xs={1}
                  sx={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '16px',
                    border: '1px solid #DBB070',
                    padding: '12px 6px',
                    borderTopLeftRadius: '12px',
                    backgroundColor: '#DBB070',
                  }}
                >
                  STT
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '16px',
                    borderTop: '1px solid #DBB070',
                    borderBottom: '1px solid #DBB070',
                    padding: '12px 6px',
                    backgroundColor: '#DBB070',
                  }}
                >
                  Tên danh mục
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '16px',
                    border: '1px solid #DBB070',
                    padding: '12px 6px',
                    borderTopRightRadius: '12px',
                    backgroundColor: '#DBB070',
                  }}
                >
                  Hành động
                </Grid>
              </Grid>
              {categoryList.map((item, index) => (
                <Grid
                  key={index}
                  container
                  sx={{
                    width: '100%',
                    fontFamily: 'Mulish',

                    '& .MuiGrid-item': {
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    sx={{
                      color: '#1a1a1a',
                      fontSize: '16px',
                      fontWeight: 400,
                      textAlign: 'center',
                      border: '1px solid #DBB070',
                      borderTop: 'none',
                      padding: '12px 6px',
                    }}
                  >
                    {index}
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{
                      color: '#1a1a1a',
                      fontSize: '16px',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderBottom: '1px solid #DBB070',
                      borderTop: 'none',
                      padding: '12px 24px',
                      justifyContent: 'start !important',
                    }}
                  >
                    {item.name}
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      color: '#1a1a1a',
                      fontSize: '16px',
                      fontWeight: 400,
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      columnGap: '8px',
                      border: '1px solid #DBB070',
                      borderTop: 'none',
                      padding: '12px 6px',
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<BorderColorIcon sx={{ width: '16px', height: '16px' }} />}
                      sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#DBB070', '&:hover': { backgroundColor: '#B5925D' } }}
                    >
                      Sửa
                    </Button>
                    <Button color="warning" variant="contained" startIcon={<DeleteOutlineIcon sx={{ width: '16px', height: '16px' }} />} sx={{ fontSize: '16', fontWeight: 600 }}>
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </Box>
      </main>
    </>
  )
}
