import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Admin.styles'
import { Box } from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props

  const { classes } = useStyles({
    params: {},
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <AppAdminMenu />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Main
