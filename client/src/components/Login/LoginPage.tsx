import * as React from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from "@mui/material/styles"
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import TabPanel from '../UI/TabPanel'
import Typography from '@mui/material/Typography/Typography';
import useMediaQuery from '@mui/material/useMediaQuery'
import json2mq from 'json2mq' 
import Login from './Login'
import Signup from './Signup'

const theme = createTheme({
  components:{
    MuiTab:{
      styleOverrides:{
        root:{
          backgroundColor:"rgba(97, 58, 137, 0.1)",
          borderRadius:"32px",
          textTransform:"none",
          '&.Mui-selected': {
           backgroundColor:"#9384D1",
           color:"#fff"
          },
          padding:"1rem 2rem",
          width:"48%"
        },
      }
    },
    MuiTabs:{
      styleOverrides:{
        indicator:{
          display:"none"
        },
        flexContainer:{
          justifyContent:"space-between"
        }
      }
    }
  }
})



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function LoginPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const matches = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  )


  return (
    <>
      <Box sx={{
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        boxSizing:"border-box",
        padding:`${matches ? "60px" : "60px 16px"}`
      }}>
        <ThemeProvider theme={theme}>
          <Box sx={{ 
            maxWidth:"600px",
            width:"100%",
            bgcolor:"#efccff",
            boxSizing:"border-box",
            padding:`${matches ? "2rem" : "2rem 16px"}`,
            borderRadius:"24px",
            transform:"translateY(-15%)"
          }}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              width:"100%",
              justifyContent:"center",
              margin:"1rem 0 1.5rem",
              color:"#9384D1"
            }}>
              <LightbulbIcon sx={{ fontSize: 35 }} />
              <Typography variant='h4'>
                Keep More
              </Typography>
          </Box>
            <Box>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Login />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Signup />
            </TabPanel>
          </Box>
        </ThemeProvider>
        
      </Box>
    </>
  )
}
