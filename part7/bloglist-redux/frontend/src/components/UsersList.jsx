import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Link as NavLink,
  Typography
} from "@mui/material";

const UsersList = () => {
  const users = useSelector((state) => state.users);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h4">Users</Typography></TableCell>
            <TableCell align="right"><Typography variant="h6">Blogs created</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <NavLink
                  component={Link}
                  to={`/users/${user.id}`}
                  underline="none"
                  color="dodgerblue"
                >
                  {user.name}
                </NavLink>
              </TableCell>
              <TableCell align="right">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
