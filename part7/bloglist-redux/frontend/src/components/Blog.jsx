import { Link } from "react-router-dom";
import { TableRow, TableCell, Link as NavLink, Typography } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <TableRow className="blog">
      <TableCell className="hidden">
        <NavLink component={Link} to={`/blogs/${blog.id}`} underline="none" color="dodgerblue">
          {blog.title}
        </NavLink>
      </TableCell>
      <TableCell>
        <Typography variant="p">By </Typography>
        <NavLink component={Link} to={`/users/${blog.user.id}`} underline="none" color="dodgerblue">
          {blog.author}
        </NavLink>
      </TableCell>
    </TableRow>
  );
};

export default Blog;
