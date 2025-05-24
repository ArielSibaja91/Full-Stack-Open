import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Link as NavLink,
} from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const SingleUser = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((user) => user.id === String(id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {user.name}
      </Typography>
      <Typography variant="p">Added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id} disablePadding>
            <NavLink
              component={Link}
              to={`/blogs/${blog.id}`}
              underline="none"
              color="dodgerblue"
            >
              <ListItemIcon>
                <DoneOutlinedIcon />
              </ListItemIcon>
              {blog.title}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SingleUser;
