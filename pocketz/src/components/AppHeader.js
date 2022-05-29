import {
  Avatar,
  Button,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import AppMenu from "./Menu/AppMenu";
import React, { useEffect, useState } from "react";
import { useWeb3Service } from "../serviceData/accountETH";
import { useListAccount } from "../serviceData/listAccount";

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [provider, setProvider] = useState("");
  const web3Service = useWeb3Service();
  const auth = useListAccount();

  useEffect(() => {
    const loadProvider = () => {
      setProvider(web3Service.getSelectedProvider());
    }
    loadProvider();
  }, [web3Service])

  const handleChange = (event) => {
    const _provider = event.target.value;
    setProvider(_provider);
    web3Service.switchProvider(_provider.rpc);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <div>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Avatar className="icon-header">
          <img src="favicon.ico" alt="pocketz logo" />
        </Avatar>
        <Box sx={{ width: "80%" }}>
          <FormControl fullWidth>
            <Select
              sx={{
                borderRadius: "32px",
                height: "44px",
                marginLeft: "20px",
                marginRight: "20px",
                textAlign: "center",
                bgcolor: "white",
              }}
              value={provider}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {web3Service.providers.map((_provider) => {
                return (
                  <MenuItem key={_provider?.key} value={_provider}>
                    {_provider?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <div className="avatar-header">
          <Avatar
            onClick={handleOpenUserMenu}
            src={auth.getSelectedAccount().avatarSrc}
          />
          <AppMenu state={anchorElUser} onClose={handleCloseUserMenu} />
        </div>
      </Box>
    </div>
  );
}

export default Header;
