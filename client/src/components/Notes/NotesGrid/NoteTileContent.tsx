import Quill from "quill"
import { useState, useEffect } from "react"

interface properties{
  delta:any
}

export default function NoteTileContent({ delta }:properties){
  const [html, setHtml] = useState<string>("")
  const [length, setLength] = useState<number>(0)

  useEffect(() => {
    const tempCont = document.createElement('div');
    const quill =new Quill(tempCont)
    quill.setContents(delta)
    setLength(quill.getLength())
    setHtml(tempCont.getElementsByClassName('ql-editor')[0].innerHTML)
    return () => {
      tempCont.getElementsByClassName('ql-editor')[0].innerHTML = ""
    }
  }, [html, length])

  
  return <>
    <div className="note-tile" style={{
      overflow:"hidden",
      height:`${length/12}rem`,
      maxHeight:"670px",
      boxSizing:"border-box",
      minHeight:"100px"
    }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </>
}