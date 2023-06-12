import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface currentState {
  value: string
}

const initialState: currentState = {
  value: "notes",
}

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setCurrent } = currentSlice.actions
export default currentSlice.reducer
