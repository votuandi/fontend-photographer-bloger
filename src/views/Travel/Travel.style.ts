import { makeStyles } from 'tss-react/mui'

type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'Travel',
  uniqId: 'Travel',
})((theme, { params }, classes) => {
  return {
    root: {
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f4f0ed',
      color: 'black',
      padding: '80px 0 80px 0',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      width: '90%',
      maxWidth: '1014px',
      margin: 'auto',
    },
    pageTitle: {
      fontSize: 60,
      fontFamily: 'Mulish',
      fontWeight: 700,
      color: '#020000',
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: '40px 0 60px',
    },
    firstBlogContainer: {
      backgroundImage: 'url("/img/banner/banner_ex_01.jpg")',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      aspectRatio: 2.2,
      marginBottom: '24px',
      position: 'relative',
      cursor: 'pointer',
    },
    firstBlogContent: {
      position: 'absolute',
      left: 40,
      bottom: 40,
      width: '55%',
      display: 'flex',
      flexDirection: 'column',

      '& h2': {
        color: 'white',
        fontWeight: 700,
        fontSize: 30,
        fontFamily: 'Open Sans',
      },

      '& span': {
        color: 'white',
        fontWeight: 300,
        fontSize: 13,
        lineHeight: '30px',
        fontFamily: 'Open Sans',
      },
    },
    secondBlogContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      cursor: 'pointer',
    },
    secondBlogImage: {
      backgroundImage: 'url("/img/banner/banner_ex_02.jpg")',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: 'calc(100% - 12px)',
      aspectRatio: 1.6,
      marginRight: 'auto',
    },
    secondBlogContent: {
      width: 'calc(100% - 12px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',

      '& h2': {
        color: 'black',
        fontWeight: 400,
        fontSize: 24,
        fontFamily: 'Open Sans',
      },

      '& span': {
        color: '#aaa',
        fontWeight: 700,
        fontSize: 13,
        fontFamily: 'Open Sans',
      },

      '& p': {
        color: '#555',
        fontWeight: 400,
        fontSize: 13,
        fontFamily: 'Open Sans',
      },
    },
  }
})

export default useStyles
