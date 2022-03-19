import { Avatar } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { sizeHeight } from "@mui/system";
const listAvatar = [
  "./images/91266124_p0.jpg",
  "./images/91848990_p0.jpg",
  "./images/92079201_p0.jpg",
  "./images/92147597_p0.jpg",
  "./images/92412225_p0.jpg",
  "./images/92900006_p0.jpg",
];
const listUser = [
  "random1",
  "random2",
  "random3",
  "random4",
  "random5",
  "random6",
  "random7",
  "random8",
];

function ListAccountItem({Account}) {
    const getAvatar = () => {
        const randomAva = Math.floor(Math.random() * listAvatar.length);
        return listAvatar[randomAva];
    }
    const getUsername = () => {
      return listUser[Math.floor(Math.random() * listAvatar.length)];
    };
    return (
      <div className="avatar-icon-button">
        <div>
          {Account.selected ? <DoneIcon /> : <div style={{ width: 24 }}></div>}
        </div>
        <div>
          <Avatar
            sx={{ width: 24, height: 24, ml: 1 }}
            src={getAvatar()}
            alt={getUsername()}
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