import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Admin.styles'
import { Box } from '@mui/material'

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
      }}
    >
      {children}
    </Box>
  )
}

export default Main
