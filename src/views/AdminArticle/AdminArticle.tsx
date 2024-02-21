/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './AdminArticle.style'
import { Box, Button, CircularProgress, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
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
import { ARTICLE_ITEM_TYPE, UPDATE_ARTICLE_DTO } from '@/utils/api/article'
import { formatDate, gotoPage } from '@/utils/helpers/common'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'

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
  const [articleList, setArticleList] = useState<ARTICLE_ITEM_TYPE[]>([])
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editShortDescription, setEditShortDescription] = useState<string>('')
  const [editCreateBy, setEditCreateBy] = useState<string>('Admin')
  const [editPublicTime, setEditPublicTime] = useState<Date>()
  const [editHashtag, setEditHashtag] = useState<string>('')
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null)
  const [editActive, setEditActive] = useState<boolean>(true)
  const [updateFile, setUpdateFile] = useState<File | null>(null)
  const [updateThumbnailPreview, setUpdateThumbnailPreview] = useState<string | null>(null)

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

  let handleUpdatePublicDateTimePickerChange = (value: Dayjs | null) => {
    if (value) {
      setEditPublicTime(value.toDate())
    }
  }

  let handleEditEvent = (index: number, isActive: boolean) => {
    if (editIndex != -1) {
      if (!confirm('Bạn đang chỉnh sửa 1 Bài viết khác và chưa lưu. Xác nhận thay đổi Bài viết cần chỉnh sửa?')) return
    }
    setEditIndex(index)
    setEditTitle(articleList[index].title)
    setEditShortDescription(articleList[index].shortDescription)
    setEditActive(articleList[index].active)
    setEditPublicTime(new Date(articleList[index].publicTime))
    setEditHashtag(articleList[index].hashtag)
    setEditCategoryId(articleList[index].category.id)
    setUpdateFile(null)
    setUpdateThumbnailPreview(articleList[index]?.thumbnail)
  }

  let handleDeleteEvent = async (index: number) => {
    if (confirm('Xác nhận xóa nội dung')) await DeleteArticle(articleList[index].id)
  }

  let DeleteArticle = async (id: string) => {
    try {
      setIsLoading(true)
      let res = await articleApi.deleteById(id)
      if (res.data.status) {
        alert(`Delete successfully!`)
        await GetArticleList()
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

  let handleUpdate = async (index: number) => {
    if (editTitle.length === 0 || editShortDescription.length === 0) {
      alert('Tiêu đề và trích dẫn không được để trống!')
      return
    }
    let updateArticleDto: UPDATE_ARTICLE_DTO = {
      params: {
        title: editTitle,
        shortDescription: editShortDescription,
        publicTime: (editPublicTime ?? new Date()).toString(),
        hashtag: editHashtag,
        categoryId: editCategoryId!,
        active: editActive ? '1' : '0',
        thumbnail: updateFile ? updateFile : undefined,
      },
    }
    await UpdateArticle(articleList[index].id, updateArticleDto)
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

  let handleUpdateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setUpdateFile(selectedFile)

      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setUpdateThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  let handleEditContent = (aid: string) => {
    gotoPage(`/admin/article/${aid}`)
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

  let GetArticleList = async () => {
    try {
      let res = await articleApi.getList()
      if (res.data.status) {
        setArticleList(res.data.params)
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
        await GetArticleList()
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

  let UpdateArticle = async (id: string, updateArticleDto: UPDATE_ARTICLE_DTO) => {
    try {
      setIsLoading(true)
      let res = await articleApi.updateArticle(id, updateArticleDto)
      if (res.data.status) {
        await GetArticleList()
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

  let newValidate = () => {
    let invalid = false
    if (newTitle.length === 0 || newShortDescription.length === 0 || newHashtag.includes(' ') || newCategoryId?.length === 0 || !newCategoryId || !newFile) invalid = true
    if (!newFile) {
      alert('Vui lòng chọn ảnh đại diện')
    }
    return invalid
  }

  let FetchData = async () => {
    await GetArticleList()
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewShortDescription(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHashtag(e.target.value)}
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
                  onChange={(e: any) => setNewCategoryId(e.target.value)}
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
          <Box
            sx={{
              width: '100%',
              maxWidth: '1200px',
              mx: 'auto',
              gap: '12px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {articleList.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  border: '1px solid #DBB070',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  backgroundColor: index === editIndex ? '#DBB07010' : '#fff',

                  '&:hover': {
                    boxShadow: 3,
                    backgroundColor: '#DBB07020',
                  },
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      '& img': {
                        width: '100%',
                        height: 'auto',
                        maxHeight: '300px',
                        borderRadius: '8px',
                        display: 'flex',
                        padding: '8px 4px',
                      },
                    }}
                  >
                    {editIndex === index ? (
                      <>
                        <input type="file" accept="image/*" onChange={handleUpdateFileChange} style={{ display: 'none' }} id="upload-image" />
                        <label htmlFor="upload-image">
                          <Button variant="contained" component="span">
                            Chọn ảnh đại diện
                          </Button>
                        </label>
                        {updateThumbnailPreview && <img src={updateThumbnailPreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                        {updateFile && <Typography sx={{ color: '#1a1a1a' }}>{updateFile.name}</Typography>}
                      </>
                    ) : (
                      <img src={item.thumbnail} alt="" />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: editIndex === index ? '10px' : '4px',
                      padding: editIndex === index ? '8px 12px' : '4px 20px',
                    }}
                  >
                    {editIndex === index ? (
                      <TextField
                        id="new-title"
                        label="Tên bài viết"
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: '12px',
                          color: '#0596A6',
                          fontFamily: 'Mulish',

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
                        value={editTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
                        // helperText={newInvalid && newTitle.length === 0 && 'Vui lòng nhập tên bài viết'}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: 'Mulish',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#1a1a1a',
                        }}
                        className="text-2-line"
                      >
                        {item.title}
                      </Typography>
                    )}
                    {editIndex === index ? (
                      <TextField
                        id="new-short-description"
                        label="Trích dẫn"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                          borderRadius: '12px',
                          fontFamily: 'Mulish',
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
                        // helperText={newInvalid && newShortDescription.length === 0 && 'Vui lòng nhập trích dẫn'}
                        value={editShortDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditShortDescription(e.target.value)}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: 'Mulish',
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#1a1a1a',
                        }}
                        className="text-3-line"
                      >
                        {item.shortDescription}
                      </Typography>
                    )}
                    {editIndex === index && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                          <DateTimePicker
                            onChange={handleUpdatePublicDateTimePickerChange}
                            sx={{
                              color: '#0596A6',
                              width: '100%',

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
                            defaultValue={dayjs(editPublicTime)}
                            label="Chọn thời gian đăng bài"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: editIndex === index ? '16px' : '12px',
                      padding: '8px 12px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
                      {editIndex === index ? (
                        <TextField
                          id="new-hashtag"
                          label="Hashtag (cách nhau bởi dấu phẩy)"
                          variant="outlined"
                          fullWidth
                          sx={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            fontFamily: 'Mulish',

                            '& fieldset': {
                              borderColor: '#0596A6',
                            },

                            '& .MuiFormLabel-root': {
                              color: '#0596A6',
                            },
                          }}
                          value={editHashtag}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditHashtag(e.target.value)}
                        />
                      ) : (
                        <>
                          {/* <Typography sx={{ fontFamily: 'Mulish', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Hashtag:</Typography> */}
                          <LocalOfferOutlinedIcon sx={{ color: '#0596A6', height: '20px' }} />
                          {item.hashtag.split(',').map((htag, htIndex) => (
                            <Typography key={htIndex} sx={{ fontFamily: 'Mulish', fontSize: '16px', fontWeight: 700, color: '#1D2FAD' }}>
                              #{htag}
                            </Typography>
                          ))}
                        </>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
                      {editIndex === index ? (
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
                            defaultValue={editCategoryId}
                            onChange={(e: any) => setEditCategoryId(e.target.value)}
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
                      ) : (
                        <>
                          {/* <Typography sx={{ fontFamily: 'Mulish', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Danh mục:</Typography> */}
                          <PhotoLibraryOutlinedIcon sx={{ color: '#0596A6', height: '20px' }} />
                          <Typography sx={{ fontFamily: 'Mulish', fontSize: '16px', fontWeight: 700, color: '#936F48' }}>{item?.category?.name}</Typography>
                        </>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
                      {editIndex === index ? (
                        <></>
                      ) : (
                        <>
                          {/* <Typography sx={{ fontFamily: 'Mulish', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>Thời gian đăng bài:</Typography> */}
                          <EventAvailableOutlinedIcon sx={{ color: '#0596A6', height: '20px' }} />
                          <Typography sx={{ fontFamily: 'Mulish', fontSize: '16px', fontWeight: 700, color: '#936F48' }}>{formatDate(new Date(item?.publicTime ?? ''))}</Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControl
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'Mulish',
                        fontWeight: 700,
                        color: '#1a1a1a',
                      }}
                    >
                      <FormLabel>Kích hoạt: </FormLabel>
                      {editIndex === index ? (
                        <Switch checked={editActive} onClick={() => setEditActive((x) => !x)}></Switch>
                      ) : (
                        <Switch disabled checked={item.active} onChange={() => setEditActive((x) => !x)} />
                      )}
                    </FormControl>
                    <Button
                      variant="contained"
                      onClick={() => handleEditContent(item.id)}
                      startIcon={<EditNoteIcon sx={{ width: '16px', height: '16px' }} />}
                      disabled={editIndex === index}
                      sx={{
                        fontSize: '16',
                        fontWeight: 600,
                        fontFamily: 'Mulish',
                        backgroundColor: editIndex === index ? '#999' : '#DBB070',
                        '&:hover': { backgroundColor: editIndex === index ? '#999' : '#AF7337' },
                      }}
                    >
                      Soạn thảo
                    </Button>
                    <Box
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
                        gap: '8px',
                        fontFamily: 'Mulish',
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
                            onClick={() => handleDeleteEvent(index)}
                            startIcon={<DeleteOutlineIcon sx={{ width: '16px', height: '16px' }} />}
                            sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#fa4653', '&:hover': { backgroundColor: '#c53b42  ' } }}
                          >
                            Xóa
                          </Button>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
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
