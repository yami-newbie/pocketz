import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { CardContent, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import { useListAccount } from "../../serviceData/listAccount";
import { useNavigate } from "react-router";
import Header from "../AppHeader";

function CreateAccountForm(props) {
  const {onClose, open} = props;
  const [username, setUsername] = useState("");
  const listAcc = useListAccount();
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      setUsername("");
    };
  }, []);

  const handleClose = () => {
    onClose();
  }

  const createAccount = async () => {
    try {
      listAcc.createAccount(username);
      onClose();
    } catch (e) {
      console.log(e);
    }
    if (username !== "") setUsername("");
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ style: { borderRadius: "1rem" } }}
    >
      <DialogContent>
        <div>
          <Typography variant="body1" gutterBottom>
            Tên tài khoản
          </Typography>
        </div>
        <div className="centered-item-10px-topbot">
          <OutlinedInput
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Tên tài khoản"
            sx={{ width: "270px" }}
          />
        </div>

        <Stack
          sx={{ justifyContent: "space-around", mt: "30px" }}
          direction="row"
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ width: "40%", borderRadius: "100px" }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ width: "40%", borderRadius: "100px" }}
            onClick={createAccount}
          >
            Tạo
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
    // </div>
    // </div>
  );
}

export default CreateAccountForm;
