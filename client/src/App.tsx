import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import LoginPage from './components/Login/LoginPage'
import ErrorPage from './components/Error/ErrorPage'
import Home from './components/Home/Home'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    materialu: true;
  }
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
          borderRadius:"100px"
        }
      }
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement:<ErrorPage />
  },
  {
    path:"/home",
    element:<Home/>
  }
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
