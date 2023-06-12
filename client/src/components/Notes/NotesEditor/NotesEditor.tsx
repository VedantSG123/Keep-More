import { Box, IconButton } from "@mui/material"
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import "./styles.css"
import Quill from "quill"
import { useEffect, useRef, useState } from "react"
import "quill/dist/quill.snow.css"
import { Note } from "../../../Utilities/types"



interface properties {
  note: Note
}

export default function NotesEditor({ note }: properties) {

  const quillRef = useRef<HTMLDivElement>(null!)
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['image']
  ]
  const [quill, setQuill] = useState<Quill>()
  const [length, setLength] = useState<number>(0)

  //instantiate quill 
  useEffect(() => {
    if (!quillRef.current) return
    const editor = document.createElement('div')
    quillRef.current.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Write Something..."
    })

    const toolbar = q.getModule("toolbar")
    toolbar.container.style.display = "none"

    editor.style.border = "none"
    quillRef.current.classList.add("editor-tile-state")
    q.disable()
    if (note.content) q.setContents(note.content as any)
    setLength(q.getLength())

    setQuill(q)

    return () => {
      if (quillRef.current) {
        while (quillRef.current.firstChild) {
          quillRef.current.removeChild(quillRef.current.firstChild)
        }
      }
    }
  }, [])



  //set the first line the heading of the document
  useEffect(() => {
    if (quill == null) return
    const createHeading = () => {
      quill.formatLine(1, 2, {
        "header": true
      }, "api")
    }
    quill.on("text-change", createHeading)

    return () => {
      quill.off("text-change", createHeading)
    }
  }, [quill])

  return <>
    <Box
      sx={{
        boxSizing: "border-box",
        backgroundColor: note.color,
        borderRadius: "16px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 0.5rem 0"
        }}
      >
        <Box
          sx={{
            display: "flex"
          }}
        >
          <IconButton>
            <PushPinIcon />
          </IconButton>
          <IconButton>
            <ColorLensIcon />
          </IconButton>
        </Box>

        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{
        padding: "0.5rem",
        borderRadius: "16px",
        cursor: "pointer"
      }}>
        <div ref={quillRef}
          id="quill-editor"
          style={{
            backgroundColor: note.color,
            width: "100%",
            height: `${length / 12}rem`,
            maxHeight: "670px",
            minHeight: "100px",
            overflow: "hidden",
          }}
        >
        </div>
      </Box>
    </Box>
  </>
}
