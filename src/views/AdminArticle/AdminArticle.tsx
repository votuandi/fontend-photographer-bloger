/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminArticle.style'
import { Box, Button, CircularProgress, FormControl, FormLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import categoryApi, { CATEGORY_ITEM_TYPE } from '@/utils/api/category'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import { articleApi } from '@/utils/api'

export default function AdminArticle() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newShortDescription, setNewShortDescription] = useState<string>('')
  const [newCreateBy, setNewCreateBy] = useState<string>('Admin')
  const [newPublicTime, setNewPublicTime] = useState<Date>()
  const [newHashtag, setNewHashtag] = useState<string>('')
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null)
  const [newActive, setNewActive] = useState<boolean>(true)
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null)
  const [categoryList, setCategoryList] = useState<CATEGORY_ITEM_TYPE[]>([])
  const [newInvalid, setNewInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  let handleNewEvent = () => {
    setNewActive(true)
    setNewTitle('')
    setNewShortDescription('')
    setNewPublicTime(new Date())
    setNewHashtag('')
    setNewCategoryId(null)
    setNewFile(null)
    setNewThumbnailPreview('')
    setNewInvalid(false)
    setIsShowNewPopup(true)
  }

  let handleNewPublicDateTimePickerChange = (value: Dayjs | null) => {
    if (value) {
      setNewPublicTime(value.toDate())
    }
  }

  let handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setNewFile(selectedFile)

      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setNewThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

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

  let CreateArticle = async () => {
    try {
      if (newValidate()) {
        setNewInvalid(true)
        return
      }
      setIsLoading(true)
      let res = await articleApi.createArticle({
        params: {
          title: newTitle,
          shortDescription: newShortDescription,
          createBy: newCreateBy,
          publicTime: (newPublicTime ?? new Date()).toString(),
          hashtag: newHashtag,
          categoryId: newCategoryId ?? '',
          thumbnail: newFile!,
          active: newActive ? '1' : '0',
        },
      })
      if (res.data.status) {
        alert('Create new article successfully!')
        // await GetCategoryList()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Create new article failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let newValidate = () => {
    let invalid = false
    if (newTitle.length === 0 || newShortDescription.length === 0 || newHashtag.includes(' ') || newCategoryId?.length === 0 || !newCategoryId || !newFile) invalid = true
    if (!newFile) {
      alert('Vui lòng chọn ảnh đại diện')
    }
    return invalid
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
              Quản Lý Bài viết
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
                // maxWidth: '640px',
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
                Tạo bài viết mới
              </Typography>
              <TextField
                id="new-title"
                label="Tên bài viết"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: '12px',
                  color: '#0596A6',

                  '& fieldset': {
                    borderColor: '#0596A6',
                    backgroundColor: '#fff',
                  },

                  '& .MuiFormLabel-root': {
                    color: '#0596A6',
                  },

                  '& .MuiFormHelperText-root': {
                    backgroundColor: 'transparent',
                    color: 'red',
                  },
                  '& input': {
                    zIndex: 1,
                  },
                }}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                helperText={newInvalid && newTitle.length === 0 && 'Vui lòng nhập tên bài viết'}
              />
              <TextField
                id="new-short-description"
                label="Trích dẫn"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{
                  borderRadius: '12px',
                  color: '#0596A6',

                  '& fieldset': {
                    borderColor: '#0596A6',
                    backgroundColor: '#fff',
                  },

                  '& .MuiFormLabel-root': {
                    color: '#0596A6',
                  },

                  '& .MuiFormHelperText-root': {
                    backgroundColor: 'transparent',
                    color: 'red',
                  },
                  '& textarea': {
                    zIndex: 1,
                  },
                }}
                helperText={newInvalid && newShortDescription.length === 0 && 'Vui lòng nhập trích dẫn'}
                value={newShortDescription}
                onChange={(e) => setNewShortDescription(e.target.value)}
              />
              <TextField
                id="new-hashtag"
                label="Hashtag (cách nhau bởi dấu phẩy)"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',

                  '& fieldset': {
                    borderColor: '#0596A6',
                  },

                  '& .MuiFormLabel-root': {
                    color: '#0596A6',
                  },
                }}
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: '#0596A6',
                    backgroundColor: '#fff',
                  }}
                  id="category-label"
                >
                  Chọn danh mục
                </InputLabel>
                <Select
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiFormHelperText-root': {
                      backgroundColor: 'transparent',
                      color: 'red',
                    },
                  }}
                  labelId="category-label"
                  id="category-select"
                  defaultValue=""
                  onChange={(e) => setNewCategoryId(e.target.value)}
                >
                  {categoryList.map((category) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'Mulish',
                      }}
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {newInvalid && (newCategoryId?.length === 0 || !newCategoryId) && (
                  <span style={{ color: 'red', fontFamily: 'Mulish', fontSize: '16px', margin: '3px 14px 0' }}>Vui lòng chọn danh mục</span>
                )}
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    onChange={handleNewPublicDateTimePickerChange}
                    sx={{
                      color: '#0596A6',

                      '& fieldset': {
                        backgroundColor: '#fff',
                      },

                      '& .MuiInputAdornment-root': {
                        zIndex: 1,
                      },

                      '& input': {
                        zIndex: 1,
                      },
                    }}
                    label="Chọn thời gian đăng bài"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <input type="file" accept="image/*" onChange={handleNewFileChange} style={{ display: 'none' }} id="upload-image" />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Chọn ảnh đại diện
                </Button>
              </label>
              {newThumbnailPreview && <img src={newThumbnailPreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
              {newFile && <Typography sx={{ color: '#1a1a1a' }}>{newFile.name}</Typography>}
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
                  onClick={CreateArticle}
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
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00000080',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
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
