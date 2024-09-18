import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Button, Grid, Grid2, Stack, Typography} from "@mui/material";
const NASAKEY = "DLpRBjeS1RyKLlH3yEi7fzvsUXA7royVNOXxdgaA"
function App() {
  const [count, setCount] = useState(0)
    const [pictures, setPictures] = useState(["racoon.jpg", "racoon.jpg", "racoon.jpg", "racoon.jpg"])
    const [captions,setCaptions] = useState(["A racoon (duh)","A racoon (duh)","A racoon (duh)","A racoon (duh)"])

    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASAKEY}&count=4`)
            if (!data.ok){
                console.log(await data.json())
            }
            const json = await data.json()
            const tempImg = []
            const tempCaption = []
            json.forEach((elt:any)=> {
                tempImg.push(elt['url'])
                tempCaption.push(elt['explanation'])
            })
            setPictures(tempImg)
            setCaptions(tempCaption)
        }
        fetchData()

    }, [])
  return (<Stack sx={{display:"flex", justifyContent:"center", alignItems:"center" }} spacing={2}>
          <Grid2 sx={{display:"flex", justifyContent:"center", alignItems:"center" }} container>
              {pictures.map((elt, i)=> {
                  return <Grid2 sx={{border:"1px solid grey", borderRadius:4, display:"flex", justifyContent:"center", alignItems:"center"}}>
                      <Stack spacing={2} sx={{display:"flex", justifyContent:"center", alignItems:"center" }} >

                          <img src={elt} alt={captions[i]} height={'82%'} width={'40%'}/>
                          <Typography> {captions[i]}</Typography>
                      </Stack>
                      </Grid2>

              })}
  </Grid2>
          <Button onClick={()=> setCount(count + 1)} variant={"contained"}> {count}</Button>
      </Stack>
  )

}


export default App
