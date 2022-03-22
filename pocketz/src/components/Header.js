import { AppBar, Container, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


function Header()
{
    return (
        <div>
            <Box className='header'>
                <div>
                  <img src = "favicon.ico" alt = "pocketz logo" />
                </div>
                <div className='absolute-right'>
                  <Avatar
                  >H</Avatar>
                </div>
            </Box>
        </div>
    )
}