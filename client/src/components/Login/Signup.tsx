import { Box, FormControl, InputAdornment, IconButton, InputBase, Button } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonIcon from '@mui/icons-material/Person'


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
    }
  }
})

export default function Signup(){
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <PersonIcon sx={{color:"#9384D1"}} />
          </InputAdornment>
        }
        placeholder="Name"
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
        id="login-email"
        type="email"
        endAdornment={
          <InputAdornment position="end">
            <EmailOutlinedIcon sx={{color:"#9384D1"}} />
          </InputAdornment>
        }
        placeholder="Email"
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
        placeholder="Confirm Password"
      />
    </FormControl>
    <FormControl
      sx={{ 
        width: '100%',
        mt: 3
      }} 
        variant="filled"
    >
      <Button variant="contained">
        Sign Up
      </Button>
    </FormControl>
    
  </Box>
  </ThemeProvider>
  </>
}