import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note } from "../Utilities/types"

interface currentState {
  active: boolean
  note: Note
}

const initialState = {
  value: {
    active: false,
    note: {
      _id: "",
      title: "",
      content: {},
      color: "",
      isGroupNote: false,
      collaborators: [""],
      author: "",
    },
  },
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorState: (state, action: PayloadAction<currentState>) => {
      state.value = action.payload
    },
  },
})

export const { setEditorState } = editorSlice.actions
export default editorSlice.reducer
