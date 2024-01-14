import { makeStyles } from 'tss-react/mui'

type IStyleParams = {
  isUnderBanner: boolean
}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'AppHeader',
  uniqId: 'app_header',
})((theme, { params }, classes) => {
  return {
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: params.isUnderBanner ? '#fff' : 'transparent',
      boxShadow: params.isUnderBanner ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    },

    menu: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start',
      color: 'black',
      gap: '20px',
      margin: '0 auto',
    },

    menuTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'stretch',
      position: 'relative',
      gap: 0,

      '&:hover': {
        '& span': {
          '&::after': {
            content: '""',
            display: 'block',
            height: '0',
            width: '100%',
            borderBottom: '1px solid #fff',
            animationName: '$slideInLeft',
            animationDuration: '1s',
            animationFillMode: 'both',
            '@keyframes slideInLeft': {
              '0%': {
                transform: 'translateX(-100%)',
                visibility: 'visible',
              },
              '100%': {
                transform: 'translateX(0)',
              },
            },
          },
        },
      },
    },

    menuText: {
      fontFamily: 'Mulish',
      fontSize: 11,
      color: params.isUnderBanner ? '#020000' : '#fff',
      fontWeight: 500,
      textTransform: 'uppercase',
      lineHeight: '23px',
      letterSpacing: '.3em',
      cursor: 'pointer',
      position: 'relative',
    },
  }
})

export default useStyles
