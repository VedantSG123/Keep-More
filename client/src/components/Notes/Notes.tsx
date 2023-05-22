import { Box, Button } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'



export default function Notes(){
  return <>
    <Box sx={{
      display:"flex",
      justifyContent:"center"
    }}>
      <Box sx={{
        maxWidth:"1200px",
        width:"100%",
        padding:"2rem 0.5rem"
      }}>
        <Button size="large" color="secondary" variant="contained" endIcon={<AddCircleIcon/>}>
          Create A Note
        </Button>
      </Box>
    </Box>
  </>
}