import { Box, IconButton } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import NotesGrid from "./NotesGrid/NotesGrid"
import json2mq from "json2mq"
import useMediaQuery from "@mui/material/useMediaQuery"

//Redux
import { useAppSelector, useAppDispatch } from "../../Redux/hooks"
import { setEditorState } from "../../Redux/editorSlice"


import axios from "axios"
import { emptyNote } from "../../Utilities/types"
//Components
import NotesEditor from "./NotesEditor/NotesEditor"

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

export default function Notes() {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 768,
    })
  )

  const position = matches
    ? {
        top: "110px",
        left: "240px",
      }
    : {
        bottom: "50px",
        right: "10px",
      }
  const editorState = useAppSelector((state) => state.editorConent.value)
  const dispatch = useAppDispatch()

  const createNote = async () => {
    const userData = getUserDataFromLocalStorage()
    if (!userData) return
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.data.token}`
    try {
      const newNote = await axios.post(
        "http://localhost:5000/api/notes/createNote",
        {
          title: "",
          content: { ops: [{ insert: "\n" }] },
        }
      )
      dispatch(
        setEditorState({
          active: true,
          note: {
            _id: newNote.data._id,
            title: newNote.data.title,
            content: newNote.data.content,
            color: newNote.data.color,
            author: newNote.data.author,
            collaborators: newNote.data.collaborators,
            isGroupNote: newNote.data.isGroupNote,
          },
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleReturn = () => {
    dispatch(setEditorState({ active: false, note: emptyNote }))
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 3.5rem)",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            padding: "2rem 2rem 2rem 4rem",
            position: "relative",
          }}
        >
          {editorState.active ? (
            <IconButton
              size="large"
              sx={{
                ...position,
                position: "fixed",
                zIndex: "100",
              }}
              color="secondary"
              onClick={handleReturn}
            >
              <ArrowCircleLeftIcon
                sx={{ fontSize: matches ? "4rem" : "5rem" }}
              />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              sx={{
                ...position,
                position: "fixed",
                zIndex: "100",
              }}
              color="secondary"
              onClick={createNote}
            >
              <AddCircleIcon sx={{ fontSize: matches ? "4rem" : "5rem" }} />
            </IconButton>
          )}
          {editorState.active ? (
            <NotesEditor note={editorState.note} />
          ) : (
            <NotesGrid />
          )}
        </Box>
      </Box>
    </>
  )
}
