// slices/valSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShowState {
  isShowLoading: boolean
}

const initialState: ShowState = {
  isShowLoading: false,
}

const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {
    setIsShowLoading: (state, action: PayloadAction<boolean>) => {
      state.isShowLoading = action.payload
    },
  },
})

export const { setIsShowLoading } = showSlice.actions
export default showSlice.reducer
