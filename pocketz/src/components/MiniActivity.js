import React from 'react'
import { Typography } from '@mui/material'
import { useListAccount } from '../serviceData/listAccount';
import { fromEtherWallet } from 'ethereumjs-wallet/dist/thirdparty';

function MiniActivity() {
    const listAcc = useListAccount();
    const acc = listAcc.getSelectedAccount();
    const from = "0x0168E6caf2D7F16325B4cAD20f5b26890C694715",
    to = "0xA2f567F6cCEEEFb9af083533b727D63C56BB967C",
    hash = "0xa987c4a4249a62d3ecf14fbdec75b76ce07d1762fe3ff63e0d6ded79f0fb017c",
    timeStamp = "",
    value = "0"
    const getAddressStr = (address) => {
        return address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);
      };
  return (
      (from == acc.address)?
    (<div className='mini-activity'>
        <div>
            <Typography variant="h6" gutterBottom component="div">
                Send
            </Typography>
            <div className='two-item'>
                <Typography variant="body2" gutterBottom component="div">
                    Date
                </Typography>
                <Typography variant="body2" gutterBottom component="div">
                     - To {getAddressStr(to)}
                </Typography>
            </div>
        </div>
        <div>
            <Typography variant="subtitle1" gutterBottom component="div">
                {value}
            </Typography>
        </div>
    </div>) : (
        <div className='mini-activity'>
            <div>
                <Typography variant="h6" gutterBottom component="div">
                    Receive
                </Typography>
                <div className='two-item'>
                    <Typography variant="body2" gutterBottom component="div">
                        Date
                    </Typography>
                    <Typography variant="body2" gutterBottom component="div">
                        - From {getAddressStr(from)}
                    </Typography>
                </div>
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom component="div">
                    {value}
                </Typography>
            </div>
        </div>
    )
  )
}

export default MiniActivity