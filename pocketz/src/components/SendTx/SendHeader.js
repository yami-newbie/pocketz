import { Typography, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export default function SendHeader() {
  let navigate = useNavigate();
  return (
    <div className="double-item">
      <Typography component="h6">Gửi</Typography>
      <Link
        sx={{ cursor: "context-menu" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Hủy
      </Link>
    </div>
  );
}
