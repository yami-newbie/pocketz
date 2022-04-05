import { Avatar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";


function ListAccountItem({ Account, onClick: handleCloseUserMenu }) {
  
  return (
    <div className="avatar-icon-button" onClick={handleCloseUserMenu}>
      <div>
        {Account.selected ? <DoneIcon /> : <div style={{ width: 24 }}></div>}
      </div>
      <div>
        <Avatar
          sx={{ width: 24, height: 24, ml: 1 }}
          src={Account.avatarSrc}
          alt={Account.username}
        />
      </div>
      <div className="username">
        <div>{Account.username}</div>
        <div id="sub">sub title</div>
      </div>
    </div>
  );
}

export default ListAccountItem;