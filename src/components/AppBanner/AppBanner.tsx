/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box } from '@mui/material'
import useStyles from './AppBanner.styles'
import router from 'next/router'
import { gotoPage } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { EXAMPLE_BANNER_IMAGES } from '@/assets/static/banner.static'

type IProps = {}

const SLIDER_SETTING = {
  dots: false,
  arrows: false,
  infinite: true,
  // speed: 5000,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // cssEase: 'linear',
}

const AppFooter = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Slider {...SLIDER_SETTING}>
        {EXAMPLE_BANNER_IMAGES.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url("/img/banner/${item}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )
        })}
      </Slider>
    </Box>
  )
}

export default React.forwardRef(AppFooter)
