import React from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
function AddTokenForm() {
  return (
    <div>
      <Typography
        sx={{
          paddingLeft: "10px",
        }}
      >
        Nhập Token
      </Typography>
      <div className="add-token-card">
        <Typography
          sx={{
            paddingBottom: "5px",
          }}
        >
          Token tùy chỉnh
        </Typography>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <TextField
            sx={{
              width: "90%",
              paddingBottom: "10px",
            }}
            variant="outlined"
            label="Địa chỉ hợp đồng token"
          />
          <TextField
            sx={{
              paddingBottom: "10px",
              width: "90%",
            }}
            variant="outlined"
            label="Ký hiệu token"
          />
          <TextField
            sx={{
              paddingBottom: "10px",
              width: "90%",
            }}
            variant="outlined"
            label="Số thập phân của token"
          />
        </Card>
      </div>

      <div className="button-add-token">
        <Button
          sx={{
            width: "90%",
            borderRadius: "18px",
          }}
          variant="contained"
        >
          Thêm token tùy chỉnh
        </Button>
      </div>
    </div>
  );
}

export default AddTokenForm;
