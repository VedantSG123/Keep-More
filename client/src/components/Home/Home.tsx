import { ReactNode } from 'react'
import { useAppSelector } from '../../Redux/hooks'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from "axios"
import { useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from "@mui/material"
import Layout from '../Layout/Layout'
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
          boxShadow:"none",
          textTransform:"none"
        }
      }
    }
  }
})

interface data{
  _id:string
  name:string 
  email:string 
  token:string 
}

interface UserData{
  data:data
}

const getUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem('userInfo')
  if (userDataString) {
    return JSON.parse(userDataString)
  }
  return null
}


export default function Home(){
  const [user, setUser] = useState({
    _id:"",
    name:"",
    email:""
  })
  const navigate = useNavigate()
  
  useEffect(() => {
    const userData = getUserDataFromLocalStorage()
    const verify = async() => {
      try{
        const response:AxiosResponse = await axios.get("http://localhost:5000/api/user/verify")
        setUser({
          _id:response.data._id,
          name:response.data.name,
          email:response.data.email
        })
      }catch(err){
        navigate("/login")
      }
    }
    if(userData){
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.data.token}`
      verify()
    }else{
      navigate("/login")
    }
  }, [])

  const active = useAppSelector((state) => state.current.value)
  return <>
  <ThemeProvider theme={theme}>
    <Layout user={user}>
        {table[active]}
    </Layout>
  </ThemeProvider>
  </>
}