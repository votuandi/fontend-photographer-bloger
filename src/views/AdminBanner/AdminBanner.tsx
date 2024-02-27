/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminBanner.style'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AdminBanner() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
            width: '100%',
            height: '100vh',
            padding: '24px',
            overflow: 'auto',
            backgroundColor: '#f4f0ed',
            fontFamily: 'Mulish',
          }}
        >
          <Typography
            variant="headerSemi35"
            sx={{
              fontWeight: 900,
              fontSize: '36px',
              color: '#62000D',
            }}
          >
            Chỉnh sửa Banner
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  color: '#62000D',
                }}
              >
                <Tab label="Bản PC" {...a11yProps(0)} />
                <Tab label="Bản Mobile" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              Comming soon
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Comming soon
            </CustomTabPanel>
          </Box>
        </Box>
      </main>
    </>
  )
}
