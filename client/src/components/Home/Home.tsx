import { ReactNode } from 'react'
import { useAppSelector } from '../../Redux/hooks'
import { ThemeProvider, createTheme } from "@mui/material"
import Layout from '../Layout/Layout'
import NotesEditor from '../Notes/NotesEditor/NotesEditor'
import Notes from '../Notes/Notes'


interface tableProperties {
  [key: string]: ReactNode
}


const table:tableProperties = {
  notes:<Notes />,
  todo:<div>Todo</div>,
  trash:<div>Trash</div>
}

const theme = createTheme({
  palette: {
    primary: {
      main:"#673ab7",
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
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          borderRadius:"100px",
          boxShadow:"none"
        }
      }
    }
  }
})


export default function Home(){
  const active = useAppSelector((state) => state.current.value)
  return <>
  <ThemeProvider theme={theme}>
    <Layout>
        {table[active]}
      </Layout>
  </ThemeProvider>
  </>
}