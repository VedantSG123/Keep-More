import { ReactNode } from 'react'
import { useAppSelector } from '../../Redux/hooks'
import Layout from '../Layout/Layout'
import NotesEditor from '../Notes/NotesEditor/NotesEditor'


interface tableProperties {
  [key: string]: ReactNode
}


const table:tableProperties = {
  notes:<NotesEditor />,
  todo:<div>Todo</div>,
  trash:<div>Trash</div>
}


export default function Home(){
  const active = useAppSelector((state) => state.current.value)
  return <>
    <Layout>
      {table[active]}
    </Layout>
  </>
}