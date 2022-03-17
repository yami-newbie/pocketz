import { Avatar, Grid, IconButton } from "@mui/material";

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
        console.log("Avatar:", randomAva);
        return listAvatar[randomAva];
    }
    const getUsername = () => {
      return listUser[Math.floor(Math.random() * listAvatar.length)];
    };
    return (
      <div className="avatar-icon-button">
        <div>
          <Avatar src={getAvatar()} alt={getUsername()} />
        </div>
        <div className="username">
          <div>{getUsername()}</div>
          <div id="sub">sub title</div>
        </div>
      </div>
    );
}

export default ListAccountItem;