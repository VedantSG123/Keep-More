import {
  AppBar,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton
} from '@mui/material/'
import MenuIcon from '@mui/icons-material/Menu'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import json2mq from 'json2mq' 
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactNode, useState, useEffect } from 'react'
import { stringAvatar } from '../../Utilities/profileImage'
import Sidebar from '../Sidebar/Sidebar'



interface properties {
  children: ReactNode
  user: {
    _id:string
    name:string,
    email:string
  }
}

export default function Layout({ children, user }: properties) {

  const matches = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  )

  const [menu, setMenu] = useState(false)
  const MenuClick = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    setMenu(matches ? true : false)
  }, [matches])


  return <>
    <AppBar position="relative" sx={{
      bgcolor: "transparent",
      padding: "4px 4px 0px",
      boxShadow: "none"
    }}>
      <Box sx={{
        padding: "0.5rem 0",
        bgcolor: "secondary.main",
        borderRadius: "8px"
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          paddingRight:"1rem"
        }}>
          <Box sx={{
            display:"flex",
            alignItems:"center"
          }}>
            <Button variant='text' onClick={MenuClick}>
              <MenuIcon fontSize='medium' sx={{
                color: "#fff"
              }} />
            </Button>

            <Box sx={{
              display: "flex",
              alignItems: "center"
            }}>
              <LightbulbIcon fontSize='medium' />
              <Typography variant='h6'>
                Keep More
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton>
            <Avatar {...stringAvatar(user.name)} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </AppBar>

    <Box sx={{
      padding: "4px",
    }}>
      <Grid container spacing={3}>
        <Grid item sx={{
          width: `${menu ? "250px" : "0px"}`,
          height: "calc(100vh - 3.5rem)",
          transition: "all 0.3s ease-in-out",
          overflow: "hidden",
          position: `${matches ? "relative" : "absolute"}`,
          zIndex:999
        }}>
          <Box sx={{
            bgcolor: "#efccff",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            borderRadius: "8px",
            padding: "1rem 0 0 0"
          }}>
            <Sidebar/>
          </Box>
        </Grid>
        <Grid item xs>
          <Box sx={{
            boxSizing: "border-box",
            padding: "1rem 0 0 0",
            width:"100%",
          }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  </>
}