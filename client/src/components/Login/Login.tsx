import { Box, FormControl, InputAdornment, IconButton, InputBase, Button, Snackbar } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import type { } from '@mui/lab/themeAugmentation'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, Fragment } from "react"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import CloseIcon from '@mui/icons-material/Close'


const theme = createTheme({
  components:{
    MuiFilledInput:{
      styleOverrides:{
        root:{
          borderRadius:"32px",
          padding:"0 1rem"
        },
      },
      defaultProps:{
        disableUnderline:true
      }
    },
    MuiInputBase:{
      styleOverrides:{
        root:{
          borderRadius:"32px",
          padding:"0.5rem 1rem",
          backgroundColor:"rgba(0, 0, 0, 0.1)",

        },
      },
      
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          "&.Mui-focused":{
            height:"0",
            display:"none"
          }  
        },
      },
    },
    MuiButton:{
      styleOverrides:{
        root:{
          backgroundColor:"#9384D1",
          boxShadow:"none",
          width:"100%",
          textTransform:"none",
          borderRadius:"32px",
          padding:"0.5rem 0",
          
          ":hover":{
            backgroundColor:"#666699"
          }
        },
        
      }
    },
    MuiLoadingButton:{
      styleOverrides:{
        root:{
          backgroundColor:"#9384D1",
          boxShadow:"none",
          width:"100%",
          textTransform:"none",
          borderRadius:"32px",
          padding:"0.5rem 0",
          
          ":hover":{
            backgroundColor:"#666699"
          }
        },
      }
    }
  }
})

export default function Login(){
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.currentTarget.value)
  }
  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = () => {
    setLoading(true)
    if( email === "" || password === ""){
      setMessage("Please enter all Fields")
      setOpen(true)
      setLoading(false)
      return
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return <>
  <ThemeProvider theme={theme}>
    
  <Box>
    <FormControl
       sx={{ 
        mt: 1, 
        width: '100%',
      }} 
       variant="filled"
      >
        
        <InputBase
          id="login-email"
          type="email"
          endAdornment={
            <InputAdornment position="end">
              <EmailOutlinedIcon sx={{color:"#9384D1"}} />
            </InputAdornment>
          }
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>
      <FormControl
       sx={{ 
        mt: 1, 
        width: '100%',
      }} 
       variant="filled"
      >
        
        <InputBase
          id="filled-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff sx={{color:"#9384D1"}}/> : <Visibility sx={{color:"#9384D1"}} />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormControl>
      <FormControl
        sx={{ 
          width: '100%',
          mt: 3
        }} 
         variant="filled"
      >
        <LoadingButton onClick={handleSubmit} loading={loading} variant="contained">
          Login
        </LoadingButton>
      </FormControl>
      <FormControl
        sx={{ 
          mt: 1, 
          width: '100%',
          
        }} 
         variant="filled"
      >
        <Button variant="contained">
          Get guest Credentials
        </Button>
      </FormControl>
    </Box>
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  </ThemeProvider>
    
  </>
}