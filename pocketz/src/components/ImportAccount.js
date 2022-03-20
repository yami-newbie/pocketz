import {
  toBuffer,
  isValidPrivate
} from "ethereumjs-util";
import { useEffect, useRef, useState } from "react";
import Wallet from "ethereumjs-wallet";
import { useListAccount } from "../serviceData/listAccount";
import {useNavigate} from 'react-router-dom'
import AccountDataService from '../serviceData/accountETH'

function ImportAccount() {
  const [file, setFile] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const inputFile = useRef(null);
  const listAcc = useListAccount();
  let navigate = useNavigate();

  const _onchange = (e) => {
    var _file = e.target.files[0];
    var reader = new FileReader();
    //var url = reader.readAsDataURL(_file);
    reader.readAsText(_file);
    reader.onloadend = (e) => {
      //setSrc(e.target.result);
      setFile(JSON.parse(e.target.result));
    };
  };
  const submit = () => {
    try {
      
      const prefixed = addHexPrefix(privateKey); // toBuffer(privateKey)
      const buffer = toBuffer(prefixed);
      const value = isValidPrivate(buffer);
      if(!value) return false;
      const wallet = Wallet.fromPrivateKey(buffer);
      console.log(wallet.getPublicKeyString());

      listAcc.importAccount({
        username: "",
        address: wallet.getAddressString(),
        privateKey: wallet.getPrivateKeyString(),
      });
      
      navigate("/");

    } catch (e) {
      console.log(e);
    }

    //a0ddbc4b9e9adb93c38d9b9ae24cf1edfa9b53a085e6e3b9bdc40b96cb1d7a4e
    //0x4cD83052334c8bAE503FE6C2584532D33ed7015a
  }
  const addHexPrefix = (str) => {
    if (typeof str !== "string" || str.match(/^-?0x/u)) {
      return str;
    }

    if (str.match(/^-?0X/u)) {
      return str.replace("0X", "0x");
    }

    if (str.startsWith("-")) {
      return str.replace("-", "-0x");
    }

    return `0x${str}`;
  };
  return (
    <div>
      <input
        type="file"
        ref={inputFile}
        onChange={(e) => {
          _onchange(e);
        }}
      />
      <form>
        <input
          placeholder="private key"
          onChange={(e) => {
            setPrivateKey(e.target.value);
          }}
        />
        <div>
          <button onClick={submit}>Import</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
      <br />
      {/* <pre>{file}</pre> */}
      {/* { file ? <img src={_src} alt='img' id = "imgShow"/> : null} */}
    </div>
  );
}

export default ImportAccount;
