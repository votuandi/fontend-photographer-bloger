import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button } from '@mui/material'
import useStyles from './AppHeader.styles'
import router from 'next/router'
import { MENU } from '@/utils/constants/menu.constant'
import { gotoPage, localStorageAvailable } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

type IProps = {}

const AppHeader = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()

  const [isUnderBanner, setIsUnderBanner] = useState<boolean>(false)
  const [showSubMenu, setShowSubMenu] = useState<boolean[]>([])

  const handleScroll = () => {
    setIsUnderBanner(window.scrollY > window.innerHeight)
  }

  const handleHoverMenuItem = (index: number) => {
    let newShowSubMenu = Array(showSubMenu.length).fill(false)
    newShowSubMenu[index] = true
    setShowSubMenu(newShowSubMenu)
  }

  const handleLeaveMenuItem = (index: number) => {
    setShowSubMenu(Array(showSubMenu.length).fill(false))
  }

  useEffect(() => {
    setShowSubMenu(Array(MENU.length).fill(false))

    // Add event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    console.log(isUnderBanner)
  }, [isUnderBanner])

  const { classes } = useStyles({
    params: {
      isUnderBanner: isUnderBanner,
    },
  })

  return (
    <Box className={classes.root}>
      <Box className={classes.menu}>
        {MENU.map((item, index) => {
          return (
            <Box key={index} className={classes.menuTextContainer} onMouseEnter={() => handleHoverMenuItem(index)} onMouseLeave={() => handleLeaveMenuItem(index)}>
              <span className={classes.menuText}>{item.title}</span>
              {item.subMenu && showSubMenu[index] && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-20px',
                    top: 0,
                    minWidth: 'calc(100% + 40px)',
                    paddingTop: '50px',
                    backgroundColor: isUnderBanner ? '#fff' : 'transparent',
                    zIndex: -1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: '#fff',
                      boxShadow: isUnderBanner ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
                    }}
                  >
                    {item.subMenu.map((subItem, subIndex) => {
                      return (
                        <Box
                          key={subIndex}
                          sx={{
                            color: '#020000',
                            fontFamily: 'Mulish',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            lineHeight: '23px',
                            letterSpacing: '.3em',
                            cursor: 'pointer',

                            '&:hover': {
                              fontWeight: 700,
                            },
                          }}
                        >
                          {subItem.title}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default React.forwardRef(AppHeader)
