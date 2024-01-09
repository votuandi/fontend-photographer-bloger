import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box } from '@mui/material'
import useStyles from './AppHeader.styles'
import router from 'next/router'
import { MENU } from '@/utils/constants/menu.constant'
import { gotoPage, localStorageAvailable } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'

type IProps = {}

const AppHeader = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()

  return (
    <Box
      sx={{
        width: '100vw',
        padding: '12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      Header
    </Box>
  )
}

export default React.forwardRef(AppHeader)
