import { Button, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function AccDetail(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <IconButton className = 'closebutton'>
                <CloseIcon/>
            </IconButton>
            {props.children}
        </div>
    </div>
  ) : ""
}

export default AccDetail