import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import { useAppSelector } from './Redux/hooks'
import Layout from './components/Layout/Layout'
import NotesEditor from './components/Notes/NotesEditor/NotesEditor'

const theme = createTheme({
  palette: {
    primary: {
      main: "#5432D3"
    },
    secondary: {
      main: "#fb3782"
    }
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'sans-serif'
    ].join(",")
  }
})

interface tableProperties {
  [key: string]: ReactNode
}


const table:tableProperties = {
  notes:<NotesEditor />,
  todo:<div>Todo</div>,
  trash:<div>Trash</div>
}

function App() {
  const active = useAppSelector((state) => state.current.value)
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          {table[active]}
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
