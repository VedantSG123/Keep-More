import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, useEffect, useRef } from "react"
import { Masonry } from "@mui/lab"

//Redux
import { useAppDispatch } from "../../../Redux/hooks"
import { setEditorState } from "../../../Redux/editorSlice"

//other components
import NotesEditor from "../NotesEditor/NotesEditor"
import axios from "axios"
import { Note } from "../../../Utilities/types"

interface data {
  _id: string
  name: string
  email: string
  token: string
}

interface UserData {
  data: data
}

const getUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem("userInfo")
  if (userDataString) {
    return JSON.parse(userDataString)
  }
  return null
}

export default function NotesGrid() {


  const dispatch = useAppDispatch()

  const [notes, setNotes] = useState<Note[]>([])
  const ParentRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    const NotesRequest = async () => {
      try {
        const getNotes = await axios.get(
          "http://localhost:5000/api/notes/getNotes"
        )
        setNotes(getNotes.data)
      } catch (err) {
        ParentRef.current.innerHTML = "Failed to get Notes"
      }
    }
    if (userData) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.data.token}`
      NotesRequest()
    } else {
      ParentRef.current.innerHTML = "Please Login again"
    }
  }, [])

  const handleRenderedNote = (note: Note) => {
    dispatch(setEditorState({ active: true, note: note }))
  }

  return (
    <>
      <div ref={ParentRef}>
        <Box
          sx={{
            padding: "1rem 0",
          }}
        >
          <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={2}>
            {notes.map((note, index) => {
              return (
                <NotesEditor note={note} key={index} />
              )
            })}
          </Masonry>
        </Box>
      </div>
    </>
  )
}
