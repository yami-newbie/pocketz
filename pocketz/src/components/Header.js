import { AppBar, Container, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


function Header()
{
    return (
        <div>
            <Box sx ={{alignItems: 'center', display: 'flex', width: '700px', border: "3px solid #73AD21", justifyContent: 'space-between'}}>
                <div>
                  <img src = "favicon.ico" alt = "pocketz logo" />
                </div>
                <div sx ={{position: 'absolute',  border: "3px solid #f53636", right: '0px'}}>
                  <Avatar
                  >H</Avatar>
                </div>
            </Box>
        </div>
    )
}