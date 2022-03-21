import { AppBar, Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


function Header()
{
    return (
        <div>
            <Box sx ={{alignItems: 'center', position: 'relative', display: 'flex', flexFlow: "column nowarp", width: '100%', flex: "0 0 auto"}}>
                <img src = "favicon.ico" alt = "pocketz logo" 
                sx = {{ display: 'flex', flexFlow: "row nowarp", width: '100%'}}/>

            </Box>
        </div>
    )
}