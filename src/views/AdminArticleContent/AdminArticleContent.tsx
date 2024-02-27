/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminArticleContent.style'
import { Box, Button, CircularProgress, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import articleApi, { ARTICLE_ITEM_TYPE } from '@/utils/api/article'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import { convertToEmbed, convertToEmbedPreview, formatDate } from '@/utils/helpers/common'
import { ARTICLE_CONTENT_ITEM_TYPE, UPDATE_ARTICLE_CONTENT_DTO } from '@/utils/api/articleContent'
import { articleContentApi } from '@/utils/api'
import parse from 'html-react-parser'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ARTICLE_CONTENT_TYPES, ARTICLE_CONTENT_WIDTHS } from '@/types/common'
import { ARTICLE_CONTENT_LIST, ARTICLE_CONTENT_WIDTH_LIST, QUILL_FORMAT, QUILL_MODULES } from '@/utils/constants/common.constant'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
export default function AdminArticleContent() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()

  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [articleId, setArticleId] = useState<string>('')
  const [article, setArticle] = useState<ARTICLE_ITEM_TYPE>()
  const [contentList, setContentList] = useState<ARTICLE_CONTENT_ITEM_TYPE[]>([])
  const [sortedContentList, setSortedContentList] = useState<ARTICLE_CONTENT_ITEM_TYPE[]>([])
  const [newPrevious, setNewPrevious] = useState<string>('')
  const [newType, setNewType] = useState<ARTICLE_CONTENT_TYPES>('text')
  const [newWidth, setNewWidth] = useState<ARTICLE_CONTENT_WIDTHS>('1200px')
  const [newContentContent, setNewContentContent] = useState<string>('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editPrevious, setEditPrevious] = useState<string>('')
  const [editType, setEditType] = useState<ARTICLE_CONTENT_TYPES>('text')
  const [editWidth, setEditWidth] = useState<ARTICLE_CONTENT_WIDTHS>('1200px')
  const [editContentContent, setEditContentContent] = useState<string>('')
  const [updateFile, setUpdateFile] = useState<File | null>(null)
  const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null)

  let handleNewEvent = () => {
    setIsShowNewPopup(true)
    setNewPrevious(sortedContentList.length > 0 ? sortedContentList[sortedContentList.length - 1].id : '')
    setNewType('text')
    setNewWidth('1200px')
    setNewContentContent('')
    setNewFile(null)
    setNewImagePreview(null)
  }

  let handleEditEvent = (index: number) => {
    if (editIndex != -1) {
      if (!confirm('Bạn đang chỉnh sửa 1 Nội dung khác và chưa lưu. Xác nhận thay đổi Nội dung cần chỉnh sửa?')) return
    }
    setEditIndex(index)
    setEditPrevious(sortedContentList[index].previous ?? '')
    setEditType(sortedContentList[index].type as ARTICLE_CONTENT_TYPES)
    setEditWidth(sortedContentList[index].width as ARTICLE_CONTENT_WIDTHS)
    setEditContentContent(sortedContentList[index].content)
    setUpdateFile(null)
    setUpdateImagePreview(sortedContentList[index].type === 'image' ? sortedContentList[index]?.content : null)
  }

  let handleUpdate = async (index: number) => {
    let updateArticleContentDto: UPDATE_ARTICLE_CONTENT_DTO = {
      params: {
        previous: editPrevious,
        type: editType,
        content: editContentContent,
        width: editWidth,
        articleId: articleId ?? sortedContentList[index].id,
      },
    }
    await UpdateContent(sortedContentList[index].id, updateArticleContentDto)
  }

  let handleDeleteEvent = async (index: number) => {
    if (confirm('Xác nhận xóa nội dung')) await DeleteContent(sortedContentList[index].id)
  }

  let DeleteContent = async (id: string) => {
    try {
      setIsLoading(true)
      let res = await articleContentApi.deleteById(id)
      if (res.data.status) {
        alert(`Delete successfully!`)
        await GetContentsByArticleId()
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

  let UpdateContent = async (id: string, updateArticleContentDto: UPDATE_ARTICLE_CONTENT_DTO) => {
    try {
      setIsLoading(true)
      let res = await articleContentApi.updateContent(id, updateArticleContentDto)
      if (res.data.status) {
        await GetContentsByArticleId()
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

  let handleNewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setNewFile(selectedFile)

      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setNewImagePreview(reader.result as string)
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
        setUpdateImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  let CreateArticleContent = async () => {
    try {
      setIsLoading(true)
      let res = await articleContentApi.createContent({
        params: {
          previous: newPrevious,
          type: newType,
          width: newWidth,
          content: newContentContent,
          articleId: articleId,
          image: newFile,
        },
      })
      if (res.data.status) {
        alert('Create new article content successfully!')
        await GetContentsByArticleId()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Create new article content failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let GetArticle = async (_aid?: string) => {
    let aid: string = _aid ? _aid : articleId
    try {
      let res = await articleApi.getById(aid)
      if (res.data.status) {
        setArticle(res.data.params)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let GetContentsByArticleId = async (_aid?: string) => {
    let aid: string = _aid ? _aid : articleId
    try {
      let res = await articleContentApi.getListByArticleId(aid)
      if (res.data.status) {
        setContentList(res.data.params)
        let sortedList = sortContentList(res.data.params)
        setSortedContentList(sortedList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let sortContentList = (cList: ARTICLE_CONTENT_ITEM_TYPE[]) => {
    let sortedList: ARTICLE_CONTENT_ITEM_TYPE[] = []
    if (cList.length === 0) return []
    let item = cList.find((c) => c.previous === null)
    if (!item) return []
    sortedList.push(item)
    cList = cList.filter((c) => c.previous !== null)
    while (cList.length > 0) {
      item = cList.find((c) => c.previous === sortedList[sortedList.length - 1].id)
      if (!item) return sortedList
      sortedList.push(item)
      cList = cList.filter((c) => c.id !== sortedList[sortedList.length - 1].id)
    }
    return sortedList
  }

  let FetchData = async (aid?: string) => {
    await GetArticle(aid)
    await GetContentsByArticleId(aid)
  }

  useEffect(() => {
    if (isMounted()) return
    let { slug } = router.query
    let aid: string = ''
    if (typeof slug === 'string') {
      aid = slug
    }
    setArticleId(aid)
    FetchData(aid)
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  useEffect(() => {
    console.log(newContentContent)
  }, [newContentContent])

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
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            fontFamily: 'Mulish',
          }}
        >
          <Button
            variant="text"
            onClick={router.back}
            startIcon={<ArrowBackOutlinedIcon sx={{ width: '16px', height: '16px' }} />}
            sx={{
              fontSize: '16',
              fontWeight: 700,
              width: 'fit-content',
              fontFamily: 'Mulish',
            }}
          >
            Back
          </Button>
          <Box
            sx={{
              width: '100%',
              maxWidth: '1140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              mt: '20px',
              mx: 'auto',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Mulish',
                color: '#1a1a1a',
                fontWeight: 800,
                fontSize: '36px',
                mx: 'auto',
              }}
            >
              {article?.title}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  width: 'fit-content',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <PhotoLibraryOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#999',
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    textAlign: 'justify',
                  }}
                >
                  {article?.category?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 'fit-content',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                <EventAvailableOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#999',
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    textAlign: 'justify',
                  }}
                >
                  {article?.publicTime ? formatDate(new Date(article.publicTime)) : ''}
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: 'Mulish',
                color: '#1a1a1a',
                fontWeight: 400,
                fontSize: '14px',
                width: '100%',
                textAlign: 'justify',
              }}
            >
              {article?.shortDescription}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mt: '20px',
            }}
          >
            {Array.isArray(sortedContentList) &&
              sortedContentList.map((aContent, index) =>
                editIndex !== index ? (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      border: '1px solid #999',
                      borderRadius: '8px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      backgroundColor: '#fff',
                      position: 'relative',

                      '&:hover': {
                        backgroundColor: '#7C310A10',
                        boxShadow: 2,
                      },
                    }}
                  >
                    {editIndex !== index && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleEditEvent(index)}
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
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box
                        display={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '2px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AspectRatioOutlinedIcon sx={{ color: '#BD538E', height: '14px' }} />
                        <Typography
                          sx={{
                            color: '#BD538E',
                            fontSize: '14px',
                            fontWeight: 700,
                            fontFamily: 'Mulish',
                          }}
                        >
                          {aContent.width}
                        </Typography>
                      </Box>
                      <Box
                        display={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '2px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FilePresentIcon sx={{ color: '#00A989', height: '14px' }} />
                        <Typography
                          sx={{
                            color: '#00A989',
                            fontSize: '14px',
                            fontWeight: 700,
                            fontFamily: 'Mulish',
                          }}
                        >
                          {aContent.type}
                        </Typography>
                      </Box>
                    </Box>
                    {aContent.type === 'text' ? (
                      <Typography
                        sx={{
                          color: '#1a1a1a',
                          fontSize: '14px',
                          fontWeight: 400,
                          mt: '8px',
                        }}
                      >
                        {parse(aContent.content)}
                      </Typography>
                    ) : aContent.type === 'image' ? (
                      <Box sx={{ width: '100%', '& img': { width: '100%' } }}>
                        <img src={aContent.content} alt="" />
                      </Box>
                    ) : aContent.type === 'youtube' ? (
                      <Box sx={{ width: '100%' }}>{parse(convertToEmbedPreview(aContent.content ?? '') ?? '')}</Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                ) : (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      borderRadius: '8px',
                      margin: '4px 0 0 auto',
                      padding: '12px 18px',
                      fontFamily: 'Mulish',
                      boxShadow: 2,
                      gap: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#0596A610',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6} sx={{ pr: '4px' }}>
                        <FormControl fullWidth>
                          <InputLabel
                            sx={{
                              color: '#0596A6',
                              backgroundColor: '#fff',
                            }}
                          >
                            Chọn loại nội dung
                          </InputLabel>
                          <Select
                            sx={{
                              backgroundColor: '#fff',
                              '& .MuiFormHelperText-root': {
                                backgroundColor: 'transparent',
                                color: 'red',
                              },
                            }}
                            labelId="type-label"
                            id="type-select"
                            defaultValue={editType}
                            onChange={(e: any) => setEditType(e.target.value)}
                          >
                            {ARTICLE_CONTENT_LIST.map((aItem, aInd) => (
                              <MenuItem
                                sx={{
                                  fontFamily: 'Mulish',
                                }}
                                key={aInd}
                                value={aItem}
                              >
                                {aItem}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sx={{ pl: '4px' }}>
                        <FormControl fullWidth>
                          <InputLabel
                            sx={{
                              color: '#0596A6',
                              backgroundColor: '#fff',
                            }}
                          >
                            Chọn kích thước
                          </InputLabel>
                          <Select
                            sx={{
                              backgroundColor: '#fff',
                              '& .MuiFormHelperText-root': {
                                backgroundColor: 'transparent',
                                color: 'red',
                              },
                            }}
                            labelId="width-label"
                            id="width-select"
                            defaultValue={editWidth}
                            onChange={(e: any) => setEditWidth(e.target.value)}
                          >
                            {ARTICLE_CONTENT_WIDTH_LIST.map((aItem, aInd) => (
                              <MenuItem
                                sx={{
                                  fontFamily: 'Mulish',
                                }}
                                key={aInd}
                                value={aItem}
                              >
                                {aItem}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {editType === 'text' && (
                      <Box sx={{ width: '100%', backgroundColor: '#fff', color: '#000' }}>
                        <ReactQuill
                          theme="snow"
                          modules={QUILL_MODULES}
                          formats={QUILL_FORMAT}
                          value={editContentContent}
                          onChange={(value: any) => setEditContentContent(value)}
                        />
                      </Box>
                    )}

                    {editType === 'image' && (
                      <>
                        <input type="file" accept="image/*" onChange={handleUpdateFileChange} style={{ display: 'none' }} id="upload-image" />
                        <label htmlFor="upload-image">
                          <Button variant="contained" component="span">
                            Chọn ảnh
                          </Button>
                        </label>
                        {updateImagePreview && <img src={updateImagePreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                        {updateFile && <Typography sx={{ color: '#1a1a1a' }}>{updateFile.name}</Typography>}
                      </>
                    )}

                    {editType === 'youtube' && (
                      <>
                        <TextField
                          id="new-youtube"
                          label="Nhập link youtube"
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
                          value={editContentContent}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditContentContent(e.target.value)}
                        />
                        {parse(convertToEmbedPreview(editContentContent ?? '') ?? '')}
                      </>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginLeft: 'auto' }}>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(index)}
                        startIcon={<CheckCircleIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#28BFDF  ', '&:hover': { backgroundColor: '#28BFDF ' } }}
                      >
                        OK
                      </Button>
                      <Button
                        onClick={() => setEditIndex(-1)}
                        variant="contained"
                        color="warning"
                        startIcon={<CancelIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                )
              )}
            <Button
              startIcon={<AddCircleOutlineIcon sx={{ color: '#fff' }} />}
              sx={{
                backgroundColor: '#7B071A',
                padding: '12px ',
                fontFamily: 'Mulish',
                fontWeight: 600,
                fontSize: '16px',
                color: '#fff',
                width: 'fit-content',
                mx: 'auto',
                mt: '12px',
                '&:hover': { backgroundColor: '#7C310A' },
              }}
              onClick={handleNewEvent}
            >
              Thêm nội dung
            </Button>
            {isShowNewPopup && (
              <Box
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  margin: '4px 0 0 auto',
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
                  Tạo nội dung mới
                </Typography>
                <Grid container>
                  <Grid item xs={6} sx={{ pr: '4px' }}>
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          color: '#0596A6',
                          backgroundColor: '#fff',
                        }}
                      >
                        Chọn loại nội dung
                      </InputLabel>
                      <Select
                        sx={{
                          backgroundColor: '#fff',
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',
                          },
                        }}
                        labelId="type-label"
                        id="type-select"
                        defaultValue="text"
                        onChange={(e: any) => setNewType(e.target.value)}
                      >
                        {ARTICLE_CONTENT_LIST.map((aItem, aInd) => (
                          <MenuItem
                            sx={{
                              fontFamily: 'Mulish',
                            }}
                            key={aInd}
                            value={aItem}
                          >
                            {aItem}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sx={{ pl: '4px' }}>
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          color: '#0596A6',
                          backgroundColor: '#fff',
                        }}
                      >
                        Chọn kích thước
                      </InputLabel>
                      <Select
                        sx={{
                          backgroundColor: '#fff',
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',
                          },
                        }}
                        labelId="width-label"
                        id="width-select"
                        defaultValue="1200px"
                        onChange={(e: any) => setNewWidth(e.target.value)}
                      >
                        {ARTICLE_CONTENT_WIDTH_LIST.map((aItem, aInd) => (
                          <MenuItem
                            sx={{
                              fontFamily: 'Mulish',
                            }}
                            key={aInd}
                            value={aItem}
                          >
                            {aItem}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {newType === 'text' && (
                  <Box sx={{ width: '100%', backgroundColor: '#fff', color: '#000' }}>
                    <ReactQuill theme="snow" modules={QUILL_MODULES} formats={QUILL_FORMAT} value={newContentContent} onChange={(value: any) => setNewContentContent(value)} />
                  </Box>
                )}

                {newType === 'image' && (
                  <>
                    <input type="file" accept="image/*" onChange={handleNewFileChange} style={{ display: 'none' }} id="upload-image" />
                    <label htmlFor="upload-image">
                      <Button variant="contained" component="span">
                        Chọn ảnh
                      </Button>
                    </label>
                    {newImagePreview && <img src={newImagePreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                    {newFile && <Typography sx={{ color: '#1a1a1a' }}>{newFile.name}</Typography>}
                  </>
                )}

                {newType === 'youtube' && (
                  <>
                    <TextField
                      id="new-youtube"
                      label="Nhập link youtube"
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
                      value={newContentContent}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContentContent(e.target.value)}
                    />
                    {parse(convertToEmbedPreview(newContentContent ?? '') ?? '')}
                  </>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginLeft: 'auto' }}>
                  <Button
                    variant="contained"
                    onClick={CreateArticleContent}
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
          </Box>
          <Box
            sx={{
              height: '48px',
              width: '48px',
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              borderRadius: '50%',
              border: '1px solid #1a1a1a',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              boxShadow: 2,
              cursor: 'pointer',
              zIndex: 89,
            }}
            onClick={() => setIsShowPreview(true)}
          >
            <VisibilityIcon sx={{ color: '#1a1a1a' }} />
          </Box>
          {isShowPreview && (
            <Box
              sx={{
                background: '#00000055',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                bottom: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                zIndex: 90,
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderTopRightRadius: '20px',
                  borderTopLeftRadius: '20px',
                  height: '99vh',
                  width: '100vw',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'center',
                  overflow: 'auto',
                }}
                className="slideInUp"
              >
                <Box
                  sx={{
                    margin: '8px 16px 8px auto',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsShowPreview(false)}
                >
                  <CloseIcon sx={{ color: '#000', height: '24px' }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Mulish',
                    color: '#1a1a1a',
                    fontWeight: 800,
                    fontSize: '36px',
                    mx: 'auto',
                    width: '100%',
                    maxWidth: '1200px',
                    textAlign: 'center',
                  }}
                >
                  {article?.title}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    flexWrap: 'wrap',
                    gap: '8px',
                    mt: '8px',
                    mb: '16px',
                  }}
                >
                  <Box
                    sx={{
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <PhotoLibraryOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                    <Typography
                      sx={{
                        fontFamily: 'Mulish',
                        color: '#999',
                        fontWeight: 400,
                        fontSize: '12px',
                        width: '100%',
                        textAlign: 'justify',
                      }}
                    >
                      {article?.category?.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 'fit-content',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <EventAvailableOutlinedIcon sx={{ color: '#1a1a1a', height: '14px' }} />
                    <Typography
                      sx={{
                        fontFamily: 'Mulish',
                        color: '#999',
                        fontWeight: 400,
                        fontSize: '12px',
                        width: '100%',
                        textAlign: 'justify',
                      }}
                    >
                      {article?.publicTime ? formatDate(new Date(article.publicTime)) : ''}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  {sortedContentList.map((contentItem, cIndex) => (
                    <Box
                      key={cIndex}
                      sx={{
                        width: '100%',
                        maxWidth: contentItem.width,
                        '& img': {
                          margin: '12px 0 0 0 !important',
                        },

                        '& p,span': {
                          margin: '0 0 6px 0 !important',
                        },
                      }}
                    >
                      {contentItem.type === 'text' ? (
                        <>{parse(contentItem.content)}</>
                      ) : contentItem.type === 'image' ? (
                        <>
                          <img style={{ width: '100%' }} src={contentItem.content} alt="" />
                        </>
                      ) : contentItem.type === 'youtube' ? (
                        <>{parse(convertToEmbed(contentItem.content ?? '', contentItem.width) ?? '')}</>
                      ) : (
                        <></>
                      )}
                    </Box>
                  ))}
                </Box>
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
              <CircularProgress sx={{ width: '80px', height: '80px', color: '#7B071A' }} />
            </Box>
          )}
        </Box>
      </main>
    </>
  )
}
