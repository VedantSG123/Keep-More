import { Box } from "@mui/material"
import Quill from "quill"
import { useEffect, useRef, useState } from "react"
import "quill/dist/quill.snow.css"

export default function NotesEditor(){

  const quillRef = useRef<HTMLDivElement>(null!)
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['image']
  ]
  const [quill, setQuill] = useState<Quill>() 

  

  //instantiate quill 
  useEffect(() => {
    if(!quillRef.current) return
    const editor = document.createElement('div')
    quillRef.current.append(editor)
    const q = new Quill(editor, {
      theme:"snow",
      modules:{
        toolbar:toolbarOptions
      },
      placeholder:"Write Something..."
    })
    setQuill(q)
    
    return () => {
      if(quillRef.current){
        while(quillRef.current.firstChild){
          quillRef.current.removeChild(quillRef.current.firstChild)
        }
      }
    }
  },[])



  //set the first line the heading of the document
  useEffect(() => {
    if(quill == null) return
    const createHeading = () => {
      quill.formatLine(1,2, {
        "header":true
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
        width:"100%",
        display:"flex",
        justifyContent:"center",
        overflow:"scroll",
        height:"calc(100vh - 3.5rem)",
        boxSizing:"border-box"
      }}
    >
      <div ref={quillRef} id="quill-editor"></div>
    </Box>
  </>
}