import React from 'react'
import {Web3ReactProvider} from '@web3-react/core'
import accountETH from '../../serviceData/accountETH'
 
export default function Web3ProviderApp ({children}) {
  return (
    <Web3ReactProvider
      getLibrary={accountETH.getLibrary}
    >
      {children}
    </Web3ReactProvider>
  )
}