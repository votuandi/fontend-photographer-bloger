/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './AdminCategory.style'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { categoryApi } from '@/utils/api'
import { CATEGORY_ITEM_TYPE, UPDATE_CATEGORY_DTO } from '@/utils/api/category'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function AdminCategory() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const [categoryList, setCategoryList] = useState<CATEGORY_ITEM_TYPE[]>([])
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editActive, setEditActive] = useState<boolean>(true)
  const [editContent, setEditContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [newActive, setNewActive] = useState<boolean>(true)
  const [newName, setNewName] = useState<string>('')

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

  let CreateNewCategory = async () => {
    try {
      setIsLoading(true)
      let res = await categoryApi.createCategory({
        params: {
          name: newName,
          active: newActive,
        },
      })
      if (res.data.status) {
        await GetCategoryList()
        setIsLoading(false)
      } else {
        alert(`Create new category failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let UpdateCategory = async (id: string, updateCategoryDto: UPDATE_CATEGORY_DTO) => {
    try {
      setIsLoading(true)
      let res = await categoryApi.updateCategory(id, updateCategoryDto)
      if (res.data.status) {
        await GetCategoryList()
        setEditIndex(-1)
        setIsLoading(false)
      } else {
        alert(`Update failed!\n${res.data.message}`)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let handleNewEvent = () => {
    setNewActive(true)
    setNewName('')
    setIsShowNewPopup(true)
  }

  let handleEditEvent = (index: number, isActive: boolean) => {
    if (editIndex != -1) {
      if (!confirm('Bạn đang chỉnh sửa 1 Danh mục khác và chưa lưu. Xác nhận thay đổi Danh mục cần chỉnh sửa?')) return
    }
    setEditIndex(index)
    setEditContent(categoryList[index].name)
    setEditActive(categoryList[index].active)
  }

  let handleUpdate = async (index: number) => {
    let updateCategoryDto: UPDATE_CATEGORY_DTO = {
      params: {
        name: editContent,
        active: editActive,
      },
    }
    await UpdateCategory(categoryList[index].id, updateCategoryDto)
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
            width: '100%',
            height: '100vh',
            padding: '24px',
            overflow: 'auto',
            backgroundColor: '#f4f0ed',
            gap: '36px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'space-between',
              alignItems: 'baseline',
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
            <Button
              startIcon={<AddCircleOutlineIcon sx={{ color: '#fff' }} />}
              sx={{
                backgroundColor: '#DBB070',
                padding: '12px ',
                fontFamily: 'Mulish',
                fontWeight: 600,
                fontSize: '16px',
                color: '#fff',
                '&:hover': { backgroundColor: '#B7905C' },
              }}
              onClick={handleNewEvent}
            >
              Thêm mới
            </Button>
          </Box>
          {isShowNewPopup && (
            <Box
              sx={{
                width: '100%',
                maxWidth: '640px',
                // border: '1px solid #0596A660',
                borderRadius: '8px',
                margin: '-24px 0 0 auto',
                padding: '12px 18px',
                fontFamily: 'Mulish',
                boxShadow: 2,
                gap: '16px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#0596A610',
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0596A6',
                }}
              >
                Tạo danh mục mới
              </Typography>
              <TextField
                id="new-name"
                label="Tên danh mục"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',

                  '& fieldset': {
                    borderColor: '#0596A6',
                    // backgroundColor: '#fff',
                  },

                  '& .MuiFormLabel-root': {
                    color: '#0596A6',
                  },
                }}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#0596A6',
                }}
              >
                <FormLabel>Kích hoạt</FormLabel>
                <Switch checked={newActive} onClick={() => setNewActive((x) => !x)}></Switch>
              </FormControl>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginLeft: 'auto' }}>
                <Button
                  variant="contained"
                  onClick={CreateNewCategory}
                  startIcon={<CheckCircleIcon sx={{ width: '16px', height: '16px' }} />}
                  sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#28BFDF  ', '&:hover': { backgroundColor: '#28BFDF ' } }}
                >
                  OK
                </Button>
                <Button
                  onClick={() => setIsShowNewPopup(false)}
                  variant="contained"
                  color="warning"
                  startIcon={<CancelIcon sx={{ width: '16px', height: '16px' }} />}
                  sx={{ fontSize: '16', fontWeight: 600 }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
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
                xs={6}
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
                xs={2}
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
                Kích hoạt
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
                  xs={6}
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
                  {editIndex === index ? <TextField fullWidth value={editContent} onChange={(e) => setEditContent(e.target.value)}></TextField> : <span>{item.name}</span>}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid #DBB070',
                    borderTop: 'none',
                    padding: '12px 24px',
                  }}
                >
                  {editIndex === index ? (
                    <Switch checked={editActive} onClick={() => setEditActive((x) => !x)}></Switch>
                  ) : (
                    <Switch disabled checked={item.active} onChange={() => setEditActive((x) => !x)} />
                  )}
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
                  {editIndex === index ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(index)}
                        startIcon={<CheckCircleIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#28BFDF  ', '&:hover': { backgroundColor: '#28BFDF ' } }}
                      >
                        OK
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setEditIndex(-1)}
                        color="warning"
                        startIcon={<CancelIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleEditEvent(index, item.active)}
                        startIcon={<BorderColorIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#93B775', '&:hover': { backgroundColor: '#7F9C20  ' } }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<DeleteOutlineIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#fa4653', '&:hover': { backgroundColor: '#c53b42  ' } }}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#00000080',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 91,
              }}
            >
              <CircularProgress sx={{ width: '80px', height: '80px', color: '#DBB070' }} />
            </Box>
          )}
        </Box>
      </main>
    </>
  )
}
