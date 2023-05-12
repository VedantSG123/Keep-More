import {
  Box,
  Button
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import DescriptionIcon from '@mui/icons-material/Description'
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppSelector, useAppDispatch } from "../../Redux/hooks"
import { setCurrent } from "../../Redux/currentSlice"
import { MouseEvent } from "react"

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
          color: "#666699",
          fontSize: "1rem",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: "0 24px 24px 0",
          ":hover":{
            backgroundColor:"rgba(97, 58, 137, 0.26)",
            boxShadow:"none"
          }
        }
      },
      variants:[
        {
          props:{variant:"contained"},
          style:{
            backgroundColor:"rgba(97, 58, 137, 0.17)",
            boxShadow:"none",
          }
        }
      ]
    }
  }
})



export default function Sidebar() {
  const active = useAppSelector((state) => state.current.value)
  const dispatch = useAppDispatch()

  const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
    dispatch(setCurrent(e.currentTarget.id))
  }

  return <>
    <ThemeProvider theme={theme}>
      <Box sx={{
        padding: "0 0.5rem 0 0"
      }}>
        <Box>
          
          <Button variant={active === "notes" ? "contained" : "text"}  id="notes" onClick={handleClick}>
            <DescriptionIcon />
            Notes
          </Button>
          
        </Box>
        <Box>
          
          <Button variant={active === "todo" ? "contained" : "text"} id="todo" onClick={handleClick}>
            <TaskIcon />
            To Do
          </Button>
          
        </Box>
        <Box>
          
          <Button variant={active === "trash" ? "contained" : "text"}  id="trash" onClick={handleClick}>
            <DeleteIcon />
            Trash
          </Button>
          
        </Box>
      </Box>
    </ThemeProvider>
  </>
}