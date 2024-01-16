/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'

import useStyles from './Travel.style'
import { Box, Grid, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import theme from '@/assets/theme'

type Query = {
  slug: string
}

export default function Travel() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const query = router.query as unknown as Query
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))

  const [title, setTitle] = useState<string>('')

  let FetchData = async () => {}

  useEffect(() => {
    if (isMounted()) return
    setTitle(query.slug.replace('-', ' '))
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <Box className={classes.root}>
      {isSmallScreen ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            width: '90%',
            margin: 'auto',
          }}
        >
          <Typography
            sx={{
              fontSize: 60,
              fontFamily: 'Mulish',
              fontWeight: 700,
              color: '#020000',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '40px 0 30px',
            }}
          >
            {title}
          </Typography>
          {Array(15)
            .fill(0)
            .map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    paddingY: '20px',
                    borderBottom: '1px solid #c9c9c9',

                    '& h2': {
                      color: '#000',
                      fontWeight: 700,
                      fontSize: 16,
                      fontFamily: 'Open Sans',
                      marginTop: '8px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url("/img/banner/banner_ex_0${(index % 3) + 1}.jpg")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      aspectRatio: 1.6,
                      marginRight: 'auto',
                    }}
                  ></Box>
                  <h2>Tiêu đề của bài viết - Chào mừng bạn đến với KY ANH NGUYEN Blogger & Photographer</h2>
                </Box>
              )
            })}
        </Box>
      ) : (
        <Box className={classes.container}>
          <Typography className={classes.pageTitle}>{title}</Typography>
          <Grid container>
            <Grid item xs={12} className={classes.firstBlogContainer}>
              <Box className={classes.firstBlogContent}>
                <h2 className="text-2-line">Tiêu đề bài viết</h2>
                <span>16 giờ trước</span>
              </Box>
            </Grid>
            <Grid item xs={6} className={classes.secondBlogContainer}>
              <Box
                sx={{
                  backgroundImage: 'url("/img/banner/banner_ex_02.jpg")',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  width: 'calc(100% - 12px)',
                  aspectRatio: 1.6,
                  marginRight: 'auto',
                }}
              ></Box>
              <Box
                className={classes.secondBlogContent}
                sx={{
                  marginRight: 'auto',
                }}
              >
                <h2 className="text-3-line">Tiêu đề bài viết - Đây là một tiêu đề bài viết dài kéo dài tới tận 3 dòng để test sự đa dạng tiêu đề</h2>
                <span>16 giờ trước</span>
                <p className="text-3-line">
                  Làng hoa Sa Đéc - “Thủ phủ” hoa, kiểng của miền Tây Nam Bộ, được khởi nguyên từ Làng hoa Tân Quy Đông với những nét đặc trưng riêng. Nơi đây có nhiều loài hoa
                  khoe sắc quanh năm, người nông dân cần mẫn, chuyên nghiệp, tài hoa. Họ là những nghệ nhân góp phần tạo nên giá trị cho Làng hoa Sa Đéc. TP Sa Đéc có khoảng 2.000
                  chủng loại hoa, kiểng. Các loại hoa phổ biến là cúc mâm xôi, lưu ly, hướng dương, dạ yến thảo, cúc đồng tiền, cát tường, dừa cạn, mẫu đơn, lan các loại... Cùng
                  với các loại hoa, nhiều nhà vườn ở Sa Đéc có thu nhập cao từ nghề trồng kiểng như: mai vàng, các loại kiểng lá, kiểng cổ bonsai... Hiện tại nông dân Làng hoa Sa
                  Đéc chăm chút cho những chậu hoa để vừa phát triển kinh tế gia đình, vừa góp phần mang sắc Xuân đến với mọi nhà trong năm mới 2024.
                </p>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'url("/img/banner/banner_ex_03.jpg")',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  width: 'calc(100% - 12px)',
                  marginLeft: 'auto',
                  aspectRatio: 1.6,
                }}
              ></Box>
              <Box
                className={classes.secondBlogContent}
                sx={{
                  marginLeft: 'auto',
                }}
              >
                <h2 className="text-2-line">Tiêu đề bài viết - Tuy nó có dài nhưng chỉ 2 dòng thôi</h2>
                <span>16 giờ trước</span>
                <p className="text-3-line">
                  Làng hoa Sa Đéc - “Thủ phủ” hoa, kiểng của miền Tây Nam Bộ, được khởi nguyên từ Làng hoa Tân Quy Đông với những nét đặc trưng riêng. Nơi đây có nhiều loài hoa
                  khoe sắc quanh năm, người nông dân cần mẫn, chuyên nghiệp, tài hoa. Họ là những nghệ nhân góp phần tạo nên giá trị cho Làng hoa Sa Đéc. TP Sa Đéc có khoảng 2.000
                  chủng loại hoa, kiểng. Các loại hoa phổ biến là cúc mâm xôi, lưu ly, hướng dương, dạ yến thảo, cúc đồng tiền, cát tường, dừa cạn, mẫu đơn, lan các loại... Cùng
                  với các loại hoa, nhiều nhà vườn ở Sa Đéc có thu nhập cao từ nghề trồng kiểng như: mai vàng, các loại kiểng lá, kiểng cổ bonsai... Hiện tại nông dân Làng hoa Sa
                  Đéc chăm chút cho những chậu hoa để vừa phát triển kinh tế gia đình, vừa góp phần mang sắc Xuân đến với mọi nhà trong năm mới 2024.
                </p>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              width: '100%',
            }}
          >
            {Array(15)
              .fill(0)
              .map((item, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    xs={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      cursor: 'pointer',
                      paddingTop: '24px',
                      borderBottom: '1px solid #9e9e9e',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundImage: `url("/img/banner/banner_ex_0${(index % 3) + 1}.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: 'calc(100% - 12px)',
                        margin: index % 3 == 1 ? 'auto' : undefined,
                        marginRight: index % 3 == 0 ? 'auto' : undefined,
                        marginLeft: index % 3 == 2 ? 'auto' : undefined,
                        aspectRatio: 1.6,
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: 'calc(100% - 12px)',
                        height: '200px',
                        margin: index % 3 == 1 ? 'auto' : undefined,
                        marginRight: index % 3 == 0 ? 'auto' : undefined,
                        marginLeft: index % 3 == 2 ? 'auto' : undefined,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',

                        '& h2': {
                          color: 'black',
                          fontWeight: 700,
                          fontSize: 22,
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
                      }}
                    >
                      <h2 className="text-2-line">Tiêu đề bài viết - Tuy nó có dài nhưng chỉ 2 dòng thôi</h2>
                      <span>16 giờ trước</span>
                      <p className="text-3-line">
                        Làng hoa Sa Đéc - “Thủ phủ” hoa, kiểng của miền Tây Nam Bộ, được khởi nguyên từ Làng hoa Tân Quy Đông với những nét đặc trưng riêng. Nơi đây có nhiều loài
                        hoa khoe sắc quanh năm, người nông dân cần mẫn, chuyên nghiệp, tài hoa. Họ là những nghệ nhân góp phần tạo nên giá trị cho Làng hoa Sa Đéc. TP Sa Đéc có
                        khoảng 2.000 chủng loại hoa, kiểng. Các loại hoa phổ biến là cúc mâm xôi, lưu ly, hướng dương, dạ yến thảo, cúc đồng tiền, cát tường, dừa cạn, mẫu đơn, lan
                        các loại... Cùng với các loại hoa, nhiều nhà vườn ở Sa Đéc có thu nhập cao từ nghề trồng kiểng như: mai vàng, các loại kiểng lá, kiểng cổ bonsai... Hiện tại
                        nông dân Làng hoa Sa Đéc chăm chút cho những chậu hoa để vừa phát triển kinh tế gia đình, vừa góp phần mang sắc Xuân đến với mọi nhà trong năm mới 2024.
                      </p>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
