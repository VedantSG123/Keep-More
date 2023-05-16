import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import LoginPage from './components/Login/LoginPage'



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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
])




function App() {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
