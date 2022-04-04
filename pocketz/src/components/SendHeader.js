import { Box, Typography, Link } from '@mui/system'
import React from 'react'

export default function SendHeader() {
  return (
    <Box className='header'>
        <div sx ={{width: '100%', maxWidth: '360px', height: '100%', maxHeight: '50px'}}>
            <Typography component="h6" className='address-account'>
                Test
            </Typography>
            <Link href="#" className='absolute-right'>cancel</Link>
        </div>
    </Box>
    
  )
}
